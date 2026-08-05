/**
 * Mock API 服务：作为 Axios adapter 拦截所有请求
 * - RESTful 路由 + 统一响应格式 { code, data, message }
 * - 模拟 150~400ms 网络延迟，便于演示加载态
 * - 数据读写走 mock/db.ts（localStorage 持久化）
 */
import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getDb, saveDb, nextId, addLog } from './db'
import type { Article, Message } from '@/types'

const ok = <T>(data: T, message = 'success') => ({ code: 0, data, message })
const fail = (message: string, code = 400) => ({ code, data: null, message })

const now = () => new Date().toISOString()

/** 简单分页 */
function paginate<T>(list: T[], page = 1, pageSize = 10) {
  const start = (page - 1) * pageSize
  return { list: list.slice(start, start + pageSize), total: list.length, page, pageSize }
}

/** 解析请求体（axios 会将对象序列化为 JSON 字符串） */
function body<T = Record<string, unknown>>(config: InternalAxiosRequestConfig): T {
  if (!config.data) return {} as T
  if (typeof config.data === 'string') {
    try { return JSON.parse(config.data) as T } catch { return {} as T }
  }
  return config.data as T
}

type Handler = (ctx: {
  params: Record<string, string>
  query: Record<string, string>
  body: Record<string, unknown>
  config: InternalAxiosRequestConfig
}) => unknown

interface Route { method: string; pattern: RegExp; keys: string[]; handler: Handler }

/** 把 '/articles/:id' 形式的路径编译为正则 */
function compile(path: string) {
  const keys: string[] = []
  const pattern = new RegExp(
    '^' + path.replace(/:[^/]+/g, (m) => { keys.push(m.slice(1)); return '([^/]+)' }) + '$',
  )
  return { pattern, keys }
}

const routes: Route[] = []
const route = (method: string, path: string, handler: Handler) => {
  const { pattern, keys } = compile(path)
  routes.push({ method, pattern, keys, handler })
}

// ─── 认证 ──────────────────────────────────────────────────
route('post', '/auth/login', ({ body }) => {
  const db = getDb()
  const { username, password } = body as { username?: string; password?: string }
  const cred = db.credentials.find((c) => c.username === username)
  if (!cred || cred.password !== password) return fail('账号或密码错误', 401)
  const user = db.adminUsers.find((u) => u.id === cred.userId)
  if (!user) return fail('账号不存在', 401)
  if (user.status === 'disabled') return fail('账号已被禁用，请联系管理员', 403)
  user.lastLoginAt = now()
  addLog(user.username, '登录后台')
  saveDb()
  const role = db.roles.find((r) => r.id === user.roleId)
  return ok({ token: 'mock-token-' + user.id + '-' + Date.now(), user, role })
})

// ─── 仪表盘 ────────────────────────────────────────────────
route('get', '/dashboard/stats', () => {
  const db = getDb()
  const pvTrend = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000)
    const seed = d.getDate() * 7 + i * 13
    return {
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      pv: 800 + (seed * 37) % 600,
      uv: 400 + (seed * 23) % 320,
    }
  })
  return ok({
    todayPV: pvTrend[6].pv,
    todayUV: pvTrend[6].uv,
    articleCount: db.articles.length,
    messageCount: db.messages.filter((m) => m.status === 'unprocessed').length,
    pvTrend,
  })
})

// ─── 文章 ──────────────────────────────────────────────────
route('get', '/articles', ({ query }) => {
  const db = getDb()
  let list = [...db.articles]
  if (query.keyword) list = list.filter((a) => a.title.includes(query.keyword!))
  if (query.status) list = list.filter((a) => a.status === query.status)
  if (query.categoryId) list = list.filter((a) => String(a.categoryId) === query.categoryId)
  // 置顶优先，其次按更新时间倒序
  list.sort((a, b) => Number(b.isTop) - Number(a.isTop) || b.updatedAt.localeCompare(a.updatedAt))
  return ok(paginate(list, Number(query.page) || 1, Number(query.pageSize) || 10))
})

route('get', '/articles/:id', ({ params }) => {
  const item = getDb().articles.find((a) => a.id === Number(params.id))
  return item ? ok(item) : fail('文章不存在', 404)
})

route('post', '/articles', ({ body, config }) => {
  const db = getDb()
  const data = body as unknown as Article
  const item: Article = {
    ...data,
    id: nextId(),
    views: 0,
    author: (config.headers['X-User-Name'] as string) || '管理员',
    createdAt: now(),
    updatedAt: now(),
  }
  db.articles.unshift(item)
  addLog(item.author, `新建文章《${item.title}》`)
  saveDb()
  return ok(item, '创建成功')
})

route('put', '/articles/:id', ({ params, body }) => {
  const db = getDb()
  const item = db.articles.find((a) => a.id === Number(params.id))
  if (!item) return fail('文章不存在', 404)
  Object.assign(item, body, { updatedAt: now() })
  addLog('当前用户', `编辑文章《${item.title}》`)
  saveDb()
  return ok(item, '保存成功')
})

route('delete', '/articles/:id', ({ params }) => {
  const db = getDb()
  const idx = db.articles.findIndex((a) => a.id === Number(params.id))
  if (idx < 0) return fail('文章不存在', 404)
  const [removed] = db.articles.splice(idx, 1)
  addLog('当前用户', `删除文章《${removed.title}》`)
  saveDb()
  return ok(null, '删除成功')
})

route('post', '/articles/batch-delete', ({ body }) => {
  const db = getDb()
  const ids = (body.ids as number[]) || []
  db.articles = db.articles.filter((a) => !ids.includes(a.id))
  addLog('当前用户', `批量删除 ${ids.length} 篇文章`)
  saveDb()
  return ok(null, `已删除 ${ids.length} 篇`)
})

route('patch', '/articles/:id/top', ({ params }) => {
  const db = getDb()
  const item = db.articles.find((a) => a.id === Number(params.id))
  if (!item) return fail('文章不存在', 404)
  item.isTop = !item.isTop
  saveDb()
  return ok(item, item.isTop ? '已置顶' : '已取消置顶')
})

// ─── 栏目 ──────────────────────────────────────────────────
route('get', '/categories', () => ok(getDb().categories))

route('post', '/categories', ({ body }) => {
  const db = getDb()
  const item = { ...(body as object), id: nextId() } as never
  db.categories.push(item)
  addLog('当前用户', `新建栏目「${(body as { name?: string }).name}」`)
  saveDb()
  return ok(item, '创建成功')
})

route('put', '/categories/:id', ({ params, body }) => {
  const db = getDb()
  const item = db.categories.find((c) => c.id === Number(params.id))
  if (!item) return fail('栏目不存在', 404)
  Object.assign(item, body)
  saveDb()
  return ok(item, '保存成功')
})

route('delete', '/categories/:id', ({ params }) => {
  const db = getDb()
  const id = Number(params.id)
  if (db.categories.some((c) => c.parentId === id)) return fail('请先删除或移动子栏目')
  if (db.articles.some((a) => a.categoryId === id)) return fail('该栏目下还有文章，无法删除')
  db.categories = db.categories.filter((c) => c.id !== id)
  addLog('当前用户', `删除栏目 ID=${id}`)
  saveDb()
  return ok(null, '删除成功')
})

route('post', '/categories/reorder', ({ body }) => {
  const db = getDb()
  const orders = (body.orders as { id: number; order: number; parentId: number | null }[]) || []
  orders.forEach(({ id, order, parentId }) => {
    const item = db.categories.find((c) => c.id === id)
    if (item) { item.order = order; if (parentId !== undefined) item.parentId = parentId }
  })
  saveDb()
  return ok(null, '排序已保存')
})

// ─── 单页 ──────────────────────────────────────────────────
route('get', '/pages', () => ok(getDb().singlePages))

route('put', '/pages/:id', ({ params, body }) => {
  const db = getDb()
  const item = db.singlePages.find((p) => p.id === Number(params.id))
  if (!item) return fail('页面不存在', 404)
  Object.assign(item, body, { updatedAt: now() })
  addLog('当前用户', `更新单页「${item.name}」`)
  saveDb()
  return ok(item, '保存成功')
})

// ─── 轮播图 ────────────────────────────────────────────────
route('get', '/banners', () => {
  const list = [...getDb().banners].sort((a, b) => a.position.localeCompare(b.position) || a.order - b.order)
  return ok(list)
})

route('post', '/banners', ({ body }) => {
  const db = getDb()
  const item = { ...(body as object), id: nextId() } as never
  db.banners.push(item)
  saveDb()
  return ok(item, '创建成功')
})

route('put', '/banners/:id', ({ params, body }) => {
  const db = getDb()
  const item = db.banners.find((b) => b.id === Number(params.id))
  if (!item) return fail('Banner 不存在', 404)
  Object.assign(item, body)
  saveDb()
  return ok(item, '保存成功')
})

route('patch', '/banners/:id/toggle', ({ params }) => {
  const db = getDb()
  const item = db.banners.find((b) => b.id === Number(params.id))
  if (!item) return fail('Banner 不存在', 404)
  item.enabled = !item.enabled
  saveDb()
  return ok(item, item.enabled ? '已上线' : '已下线')
})

route('delete', '/banners/:id', ({ params }) => {
  const db = getDb()
  db.banners = db.banners.filter((b) => b.id !== Number(params.id))
  saveDb()
  return ok(null, '删除成功')
})

// ─── 友情链接 ──────────────────────────────────────────────
route('get', '/links', () => ok([...getDb().friendLinks].sort((a, b) => a.order - b.order)))
route('post', '/links', ({ body }) => {
  const db = getDb()
  const item = { ...(body as object), id: nextId() } as never
  db.friendLinks.push(item)
  saveDb()
  return ok(item, '创建成功')
})
route('put', '/links/:id', ({ params, body }) => {
  const db = getDb()
  const item = db.friendLinks.find((l) => l.id === Number(params.id))
  if (!item) return fail('链接不存在', 404)
  Object.assign(item, body)
  saveDb()
  return ok(item, '保存成功')
})
route('delete', '/links/:id', ({ params }) => {
  const db = getDb()
  db.friendLinks = db.friendLinks.filter((l) => l.id !== Number(params.id))
  saveDb()
  return ok(null, '删除成功')
})

// ─── 媒体库 ────────────────────────────────────────────────
route('get', '/media/folders', () => ok(getDb().mediaFolders))
route('post', '/media/folders', ({ body }) => {
  const db = getDb()
  const item = { id: nextId(), name: (body.name as string) || '未命名文件夹' }
  db.mediaFolders.push(item)
  saveDb()
  return ok(item, '创建成功')
})
route('delete', '/media/folders/:id', ({ params }) => {
  const db = getDb()
  const id = Number(params.id)
  db.mediaFolders = db.mediaFolders.filter((f) => f.id !== id)
  db.mediaFiles.forEach((f) => { if (f.folderId === id) f.folderId = null })
  saveDb()
  return ok(null, '文件夹已删除，文件已移至未分类')
})

route('get', '/media/files', ({ query }) => {
  const db = getDb()
  let list = [...db.mediaFiles]
  if (query.folderId === 'null') list = list.filter((f) => f.folderId === null)
  else if (query.folderId) list = list.filter((f) => String(f.folderId) === query.folderId)
  if (query.keyword) list = list.filter((f) => f.name.includes(query.keyword!))
  list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return ok(list)
})

route('post', '/media/files', ({ body }) => {
  const db = getDb()
  const files = (body.files as { name: string; url: string; size: number; mime: string; folderId: number | null }[]) || []
  const created = files.map((f) => ({ ...f, id: nextId(), createdAt: now() }))
  db.mediaFiles.push(...created)
  saveDb()
  return ok(created, `已上传 ${created.length} 个文件`)
})

route('delete', '/media/files/:id', ({ params }) => {
  const db = getDb()
  db.mediaFiles = db.mediaFiles.filter((f) => f.id !== Number(params.id))
  saveDb()
  return ok(null, '删除成功')
})

// ─── 留言 ──────────────────────────────────────────────────
route('get', '/messages', ({ query }) => {
  const db = getDb()
  let list = [...db.messages]
  if (query.keyword) list = list.filter((m) => m.name.includes(query.keyword!) || m.content.includes(query.keyword!))
  if (query.status) list = list.filter((m) => m.status === query.status)
  if (query.formId) list = list.filter((m) => String(m.formId) === query.formId)
  list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return ok(paginate(list, Number(query.page) || 1, Number(query.pageSize) || 10))
})

route('patch', '/messages/:id/status', ({ params, body }) => {
  const db = getDb()
  const item = db.messages.find((m) => m.id === Number(params.id))
  if (!item) return fail('留言不存在', 404)
  item.status = (body.status as Message['status']) || 'processed'
  saveDb()
  return ok(item, item.status === 'processed' ? '已标记为已处理' : '已标记为未处理')
})

route('delete', '/messages/:id', ({ params }) => {
  const db = getDb()
  db.messages = db.messages.filter((m) => m.id !== Number(params.id))
  saveDb()
  return ok(null, '删除成功')
})

// ─── 自定义表单 ────────────────────────────────────────────
route('get', '/forms', () => ok(getDb().customForms))
route('post', '/forms', ({ body }) => {
  const db = getDb()
  const item = { ...(body as object), id: nextId() } as never
  db.customForms.push(item)
  saveDb()
  return ok(item, '创建成功')
})
route('put', '/forms/:id', ({ params, body }) => {
  const db = getDb()
  const item = db.customForms.find((f) => f.id === Number(params.id))
  if (!item) return fail('表单不存在', 404)
  Object.assign(item, body)
  saveDb()
  return ok(item, '保存成功')
})
route('delete', '/forms/:id', ({ params }) => {
  const db = getDb()
  db.customForms = db.customForms.filter((f) => f.id !== Number(params.id))
  saveDb()
  return ok(null, '删除成功')
})

// ─── 用户与角色 ────────────────────────────────────────────
route('get', '/users', () => ok(getDb().adminUsers))
route('post', '/users', ({ body }) => {
  const db = getDb()
  const { username, password, name, roleId } = body as { username: string; password: string; name: string; roleId: number }
  if (db.credentials.some((c) => c.username === username)) return fail('账号已存在')
  const item = { id: nextId(), username, name, roleId, status: 'active' as const, lastLoginAt: null, createdAt: now() }
  db.adminUsers.push(item)
  db.credentials.push({ username, password, userId: item.id })
  addLog('当前用户', `新建管理员「${name}」`)
  saveDb()
  return ok(item, '创建成功')
})
route('put', '/users/:id', ({ params, body }) => {
  const db = getDb()
  const item = db.adminUsers.find((u) => u.id === Number(params.id))
  if (!item) return fail('用户不存在', 404)
  const { password, ...rest } = body as { password?: string } & Partial<typeof item>
  Object.assign(item, rest)
  if (password) {
    const cred = db.credentials.find((c) => c.userId === item.id)
    if (cred) cred.password = password
  }
  saveDb()
  return ok(item, '保存成功')
})
route('patch', '/users/:id/status', ({ params }) => {
  const db = getDb()
  const item = db.adminUsers.find((u) => u.id === Number(params.id))
  if (!item) return fail('用户不存在', 404)
  item.status = item.status === 'active' ? 'disabled' : 'active'
  saveDb()
  return ok(item, item.status === 'active' ? '已启用' : '已禁用')
})
route('delete', '/users/:id', ({ params }) => {
  const db = getDb()
  const id = Number(params.id)
  if (id === 1) return fail('内置超级管理员不能删除')
  db.adminUsers = db.adminUsers.filter((u) => u.id !== id)
  db.credentials = db.credentials.filter((c) => c.userId !== id)
  saveDb()
  return ok(null, '删除成功')
})

route('get', '/roles', () => ok(getDb().roles))
route('post', '/roles', ({ body }) => {
  const db = getDb()
  const item = { ...(body as object), id: nextId() } as never
  db.roles.push(item)
  addLog('当前用户', `新建角色「${(body as { name?: string }).name}」`)
  saveDb()
  return ok(item, '创建成功')
})
route('put', '/roles/:id', ({ params, body }) => {
  const db = getDb()
  const item = db.roles.find((r) => r.id === Number(params.id))
  if (!item) return fail('角色不存在', 404)
  if (item.builtin) return fail('内置角色不可修改')
  Object.assign(item, body)
  saveDb()
  return ok(item, '保存成功')
})
route('delete', '/roles/:id', ({ params }) => {
  const db = getDb()
  const id = Number(params.id)
  const role = db.roles.find((r) => r.id === id)
  if (role?.builtin) return fail('内置角色不可删除')
  if (db.adminUsers.some((u) => u.roleId === id)) return fail('仍有管理员使用该角色，无法删除')
  db.roles = db.roles.filter((r) => r.id !== id)
  saveDb()
  return ok(null, '删除成功')
})

// ─── 日志 ──────────────────────────────────────────────────
route('get', '/logs', ({ query }) => {
  const db = getDb()
  let list = [...db.opLogs]
  if (query.keyword) list = list.filter((l) => l.action.includes(query.keyword!) || l.username.includes(query.keyword!))
  return ok(paginate(list, Number(query.page) || 1, Number(query.pageSize) || 15))
})

// ─── 系统设置 ──────────────────────────────────────────────
route('get', '/settings', () => ok(getDb().settings))
route('put', '/settings', ({ body }) => {
  const db = getDb()
  Object.assign(db.settings, body)
  addLog('当前用户', '修改系统设置')
  saveDb()
  return ok(db.settings, '设置已保存')
})

// ─── 数据备份 ──────────────────────────────────────────────
route('get', '/backup', () => ok(getDb(), '导出成功'))
route('post', '/backup/reset', () => {
  localStorage.removeItem('chanmeng-cms:db')
  location.reload()
  return ok(null, '已重置')
})

/** Mock Axios Adapter 入口 */
export const mockAdapter: AxiosAdapter = async (config) => {
  const url = (config.url || '').replace(config.baseURL || '', '')
  const method = (config.method || 'get').toLowerCase()

  // 模拟网络延迟
  await new Promise((r) => setTimeout(r, 150 + Math.random() * 250))

  for (const r of routes) {
    if (r.method !== method) continue
    const m = url.match(r.pattern)
    if (!m) continue
    const params: Record<string, string> = {}
    r.keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]) })
    const query = (config.params || {}) as Record<string, string>
    const payload = r.handler({ params, query, body: body(config), config })
    const resp = payload as { code: number; data: unknown; message: string }

    const response: AxiosResponse = {
      data: resp,
      status: resp.code === 0 ? 200 : resp.code,
      statusText: resp.message,
      headers: {},
      config,
    }
    // code 非 0 时按业务错误处理（交给响应拦截器统一提示）
    return response
  }

  return {
    data: fail(`接口不存在：${method.toUpperCase()} ${url}`, 404),
    status: 404,
    statusText: 'Not Found',
    headers: {},
    config,
  }
}
