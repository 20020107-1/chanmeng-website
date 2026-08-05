/**
 * API 服务层：按模块组织所有接口调用
 */
import { api as http } from './http'
import type {
  AdminUser, Article, Banner, Category, CustomForm, DashboardStats, FriendLink,
  MediaFile, MediaFolder, Message, OpLog, PageResult, Role, SinglePage, SystemSettings,
} from '@/types'

// ─── 认证 ──────────────────────────────────────────────────
export const authApi = {
  login: (data: { username: string; password: string }) =>
    http.post<{ token: string; user: AdminUser; role: Role }>('/auth/login', data),
}

// ─── 仪表盘 ────────────────────────────────────────────────
export const dashboardApi = {
  stats: () => http.get<DashboardStats>('/dashboard/stats'),
}

// ─── 文章 ──────────────────────────────────────────────────
export interface ArticleQuery {
  page?: number
  pageSize?: number
  keyword?: string
  status?: string
  categoryId?: string
}

export const articleApi = {
  list: (params: ArticleQuery) => http.get<PageResult<Article>>('/articles', { params }),
  detail: (id: number) => http.get<Article>(`/articles/${id}`),
  create: (data: Partial<Article>) => http.post<Article>('/articles', data),
  update: (id: number, data: Partial<Article>) => http.put<Article>(`/articles/${id}`, data),
  remove: (id: number) => http.delete<null>(`/articles/${id}`),
  batchRemove: (ids: number[]) => http.post<null>('/articles/batch-delete', { ids }),
  toggleTop: (id: number) => http.patch<Article>(`/articles/${id}/top`),
}

// ─── 栏目 ──────────────────────────────────────────────────
export const categoryApi = {
  list: () => http.get<Category[]>('/categories'),
  create: (data: Partial<Category>) => http.post<Category>('/categories', data),
  update: (id: number, data: Partial<Category>) => http.put<Category>(`/categories/${id}`, data),
  remove: (id: number) => http.delete<null>(`/categories/${id}`),
  reorder: (orders: { id: number; order: number; parentId: number | null }[]) =>
    http.post<null>('/categories/reorder', { orders }),
}

// ─── 单页 ──────────────────────────────────────────────────
export const pageApi = {
  list: () => http.get<SinglePage[]>('/pages'),
  update: (id: number, data: Partial<SinglePage>) => http.put<SinglePage>(`/pages/${id}`, data),
}

// ─── 轮播图 ────────────────────────────────────────────────
export const bannerApi = {
  list: () => http.get<Banner[]>('/banners'),
  create: (data: Partial<Banner>) => http.post<Banner>('/banners', data),
  update: (id: number, data: Partial<Banner>) => http.put<Banner>(`/banners/${id}`, data),
  toggle: (id: number) => http.patch<Banner>(`/banners/${id}/toggle`),
  remove: (id: number) => http.delete<null>(`/banners/${id}`),
}

// ─── 友情链接 ──────────────────────────────────────────────
export const linkApi = {
  list: () => http.get<FriendLink[]>('/links'),
  create: (data: Partial<FriendLink>) => http.post<FriendLink>('/links', data),
  update: (id: number, data: Partial<FriendLink>) => http.put<FriendLink>(`/links/${id}`, data),
  remove: (id: number) => http.delete<null>(`/links/${id}`),
}

// ─── 媒体库 ────────────────────────────────────────────────
export const mediaApi = {
  folders: () => http.get<MediaFolder[]>('/media/folders'),
  createFolder: (name: string) => http.post<MediaFolder>('/media/folders', { name }),
  removeFolder: (id: number) => http.delete<null>(`/media/folders/${id}`),
  files: (params: { folderId?: string; keyword?: string }) =>
    http.get<MediaFile[]>('/media/files', { params }),
  upload: (files: { name: string; url: string; size: number; mime: string; folderId: number | null }[]) =>
    http.post<MediaFile[]>('/media/files', { files }),
  removeFile: (id: number) => http.delete<null>(`/media/files/${id}`),
}

// ─── 留言与表单 ────────────────────────────────────────────
export const messageApi = {
  list: (params: { page?: number; pageSize?: number; keyword?: string; status?: string; formId?: string }) =>
    http.get<PageResult<Message>>('/messages', { params }),
  setStatus: (id: number, status: Message['status']) =>
    http.patch<Message>(`/messages/${id}/status`, { status }),
  remove: (id: number) => http.delete<null>(`/messages/${id}`),
}

export const formApi = {
  list: () => http.get<CustomForm[]>('/forms'),
  create: (data: Partial<CustomForm>) => http.post<CustomForm>('/forms', data),
  update: (id: number, data: Partial<CustomForm>) => http.put<CustomForm>(`/forms/${id}`, data),
  remove: (id: number) => http.delete<null>(`/forms/${id}`),
}

// ─── 用户与角色 ────────────────────────────────────────────
export const userApi = {
  list: () => http.get<AdminUser[]>('/users'),
  create: (data: { username: string; password: string; name: string; roleId: number }) =>
    http.post<AdminUser>('/users', data),
  update: (id: number, data: Partial<AdminUser> & { password?: string }) =>
    http.put<AdminUser>(`/users/${id}`, data),
  toggleStatus: (id: number) => http.patch<AdminUser>(`/users/${id}/status`),
  remove: (id: number) => http.delete<null>(`/users/${id}`),
}

export const roleApi = {
  list: () => http.get<Role[]>('/roles'),
  create: (data: Partial<Role>) => http.post<Role>('/roles', data),
  update: (id: number, data: Partial<Role>) => http.put<Role>(`/roles/${id}`, data),
  remove: (id: number) => http.delete<null>(`/roles/${id}`),
}

// ─── 日志 / 设置 / 备份 ────────────────────────────────────
export const logApi = {
  list: (params: { page?: number; pageSize?: number; keyword?: string }) =>
    http.get<PageResult<OpLog>>('/logs', { params }),
}

export const settingApi = {
  get: () => http.get<SystemSettings>('/settings'),
  save: (data: Partial<SystemSettings>) => http.put<SystemSettings>('/settings', data),
}

export const backupApi = {
  exportAll: () => http.get<unknown>('/backup'),
}
