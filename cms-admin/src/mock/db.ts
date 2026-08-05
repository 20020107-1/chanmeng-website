/**
 * Mock 数据库：种子数据 + localStorage 持久化
 * 演示环境下所有数据保存在浏览器本地，刷新不丢失；
 * 调用 resetDb() 可恢复出厂数据。
 */
import { STORAGE_PREFIX } from '@/constants'
import type {
  Article, Banner, Category, CustomForm, FriendLink, MediaFile, MediaFolder,
  Message, OpLog, Role, SinglePage, AdminUser, SystemSettings,
} from '@/types'

export interface DbShape {
  articles: Article[]
  categories: Category[]
  singlePages: SinglePage[]
  banners: Banner[]
  friendLinks: FriendLink[]
  mediaFolders: MediaFolder[]
  mediaFiles: MediaFile[]
  messages: Message[]
  customForms: CustomForm[]
  adminUsers: AdminUser[]
  roles: Role[]
  opLogs: OpLog[]
  settings: SystemSettings
  /** 登录账号密码（演示用，明文存储） */
  credentials: { username: string; password: string; userId: number }[]
  seq: number
}

const DB_KEY = STORAGE_PREFIX + 'db'

const now = () => new Date().toISOString()
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString()

/** 出厂种子数据 */
function seed(): DbShape {
  return {
    seq: 1000,
    categories: [
      { id: 1, name: '新闻动态', slug: 'news', parentId: null, order: 1, template: '默认模板' },
      { id: 2, name: '公司新闻', slug: 'news/company', parentId: 1, order: 1, template: '默认模板' },
      { id: 3, name: '行业观察', slug: 'news/industry', parentId: 1, order: 2, template: '图文模板' },
      { id: 4, name: '客户案例', slug: 'cases', parentId: null, order: 2, template: '图文模板' },
      { id: 5, name: '服务介绍', slug: 'services', parentId: null, order: 3, template: '全宽模板' },
    ],
    articles: [
      {
        id: 1, title: 'GEO是什么及其如何为企业带来流量', categoryId: 3,
        summary: '生成式引擎优化（GEO）正在取代传统搜索成为新的流量入口，本文系统讲解其原理与落地方法。',
        content: '<h2>导读</h2><p>搜索正在从「链接」走向「答案」……</p><p>本文将系统介绍 GEO 的概念、原理与企业落地路径。</p>',
        cover: '/images/news-geo-explained-hero.png', status: 'published', isTop: true,
        publishAt: daysAgo(2), seoTitle: 'GEO是什么？生成式引擎优化完整指南', seoKeywords: 'GEO,生成式引擎优化,AI搜索',
        seoDescription: '系统讲解 GEO 的概念、原理与企业落地路径。', views: 1286, author: '编辑部',
        createdAt: daysAgo(3), updatedAt: daysAgo(2),
      },
      {
        id: 2, title: '婵梦科技发布企业增长系统蓝图 V1.0', categoryId: 2,
        summary: '公司战略定位与增长系统蓝图正式发布，明确三大核心业务线。',
        content: '<p>婵梦科技今日发布企业战略定位与增长系统蓝图 V1.0……</p>',
        cover: '', status: 'published', isTop: false,
        publishAt: daysAgo(5), seoTitle: '', seoKeywords: '婵梦科技,增长系统',
        seoDescription: '', views: 856, author: '品牌部',
        createdAt: daysAgo(6), updatedAt: daysAgo(5),
      },
      {
        id: 3, title: 'AI 搜索时代，企业官网还需要做 SEO 吗？', categoryId: 3,
        summary: 'SEO 与 GEO 并非替代关系，而是互补。本文分析两者的协同策略。',
        content: '<p>很多企业问：AI 搜索来了，SEO 还要不要做……</p>',
        cover: '', status: 'draft', isTop: false,
        publishAt: null, seoTitle: '', seoKeywords: 'SEO,GEO,AI搜索',
        seoDescription: '', views: 0, author: '编辑部',
        createdAt: daysAgo(1), updatedAt: daysAgo(1),
      },
      {
        id: 4, title: '2026 内容营销趋势报告（节选）', categoryId: 3,
        summary: '内容营销进入「答案资产」时代，结构化内容成为核心竞争力。',
        content: '<p>2026 年内容营销的五个关键趋势……</p>',
        cover: '', status: 'scheduled', isTop: false,
        publishAt: new Date(Date.now() + 3 * 86400000).toISOString(), seoTitle: '', seoKeywords: '内容营销,趋势',
        seoDescription: '', views: 0, author: '编辑部',
        createdAt: now(), updatedAt: now(),
      },
      {
        id: 5, title: '某制造业客户 GEO 获客案例复盘', categoryId: 4,
        summary: '三个月内 AI 搜索引用率提升 240%，询盘量翻倍的完整复盘。',
        content: '<p>客户背景：华东某精密制造企业……</p>',
        cover: '', status: 'published', isTop: true,
        publishAt: daysAgo(10), seoTitle: '', seoKeywords: 'GEO案例,获客',
        seoDescription: '', views: 2103, author: '客户成功部',
        createdAt: daysAgo(12), updatedAt: daysAgo(10),
      },
    ],
    singlePages: [
      { id: 1, name: '关于我们', slug: 'about', content: '<h2>关于婵梦科技</h2><p>杭州婵梦传媒科技有限公司专注于 AI 驱动的企业增长服务……</p>', updatedAt: daysAgo(20) },
      { id: 2, name: '联系我们', slug: 'contact', content: '<h2>联系我们</h2><p>预约诊断请留言，我们会在两到三个工作日内回复……</p>', updatedAt: daysAgo(15) },
      { id: 3, name: '隐私政策', slug: 'privacy', content: '<h2>隐私政策</h2><p>我们重视您的个人信息保护……</p>', updatedAt: daysAgo(30) },
    ],
    banners: [
      { id: 1, title: 'AI驱动企业增长', image: 'https://picsum.photos/seed/banner1/1200/400', link: '/services', position: '首页顶部', order: 1, enabled: true },
      { id: 2, title: 'GEO 获客方案', image: 'https://picsum.photos/seed/banner2/1200/400', link: '/services/geo', position: '首页顶部', order: 2, enabled: true },
      { id: 3, title: '预约免费诊断', image: 'https://picsum.photos/seed/banner3/1200/400', link: '/contact', position: '首页中部', order: 1, enabled: false },
    ],
    friendLinks: [
      { id: 1, name: '月之暗面', url: 'https://www.moonshot.cn', logo: '', order: 1 },
      { id: 2, name: '站长之家', url: 'https://www.chinaz.com', logo: '', order: 2 },
    ],
    mediaFolders: [
      { id: 1, name: '新闻配图' },
      { id: 2, name: 'Banner 素材' },
      { id: 3, name: '案例截图' },
    ],
    mediaFiles: [
      { id: 1, name: 'geo-hero.png', url: 'https://picsum.photos/seed/geo1/800/500', folderId: 1, size: 245000, mime: 'image/png', createdAt: daysAgo(3) },
      { id: 2, name: 'banner-growth.jpg', url: 'https://picsum.photos/seed/banner1/800/500', folderId: 2, size: 188000, mime: 'image/jpeg', createdAt: daysAgo(8) },
      { id: 3, name: 'case-chart.png', url: 'https://picsum.photos/seed/case1/800/500', folderId: 3, size: 156000, mime: 'image/png', createdAt: daysAgo(12) },
    ],
    messages: [
      { id: 1, name: '王总', phone: '138****6621', content: '想了解一下 GEO 服务，如何收费？', formId: 1, status: 'unprocessed', createdAt: daysAgo(0) },
      { id: 2, name: '李女士', phone: '159****3308', content: '预约网站诊断，麻烦了。', formId: null, status: 'unprocessed', createdAt: daysAgo(1) },
      { id: 3, name: '张经理', phone: '186****9172', content: '短视频获客方案可以发一份资料吗？', formId: 1, status: 'processed', createdAt: daysAgo(3) },
      { id: 4, name: '陈先生', phone: '137****5540', content: '想报名线下分享会。', formId: 2, status: 'processed', createdAt: daysAgo(6) },
    ],
    customForms: [
      {
        id: 1, name: '询价单', description: '官网「预约诊断」入口的询价表单',
        fields: [
          { key: 'name', label: '姓名', type: 'text', required: true },
          { key: 'phone', label: '联系电话', type: 'phone', required: true },
          { key: 'company', label: '公司名称', type: 'text', required: false },
          { key: 'budget', label: '预算区间', type: 'select', required: false, options: ['1万以下', '1-5万', '5-10万', '10万以上'] },
          { key: 'note', label: '需求描述', type: 'textarea', required: false },
        ],
      },
      {
        id: 2, name: '活动报名表', description: '线下沙龙 / 分享会报名',
        fields: [
          { key: 'name', label: '姓名', type: 'text', required: true },
          { key: 'phone', label: '手机号', type: 'phone', required: true },
          { key: 'date', label: '参加场次', type: 'date', required: true },
        ],
      },
    ],
    roles: [
      {
        id: 1, name: '超级管理员', description: '拥有全部权限', builtin: true,
        permissions: 'ALL' as unknown as Role['permissions'],
      },
      {
        id: 2, name: '内容编辑', description: '负责文章、栏目、媒体与单页的日常维护',
        permissions: {
          dashboard: ['view'],
          articles: ['view', 'create', 'edit', 'delete'],
          categories: ['view', 'create', 'edit'],
          pages: ['view', 'edit'],
          media: ['view', 'create', 'delete'],
          banners: ['view', 'create', 'edit'],
          links: ['view', 'create', 'edit'],
        },
      },
      {
        id: 3, name: '审核员', description: '负责内容发布审核与留言处理',
        permissions: {
          dashboard: ['view'],
          articles: ['view', 'audit'],
          messages: ['view', 'audit', 'edit'],
          logs: ['view'],
        },
      },
    ],
    adminUsers: [
      { id: 1, username: 'admin', name: '系统管理员', roleId: 1, status: 'active', lastLoginAt: daysAgo(0), createdAt: daysAgo(90) },
      { id: 2, username: 'editor', name: '小婵（编辑）', roleId: 2, status: 'active', lastLoginAt: daysAgo(1), createdAt: daysAgo(60) },
      { id: 3, username: 'auditor', name: '梦梦（审核）', roleId: 3, status: 'active', lastLoginAt: daysAgo(2), createdAt: daysAgo(45) },
    ],
    credentials: [
      { username: 'admin', password: 'Admin@2024', userId: 1 },
      { username: 'editor', password: 'Editor@2024', userId: 2 },
      { username: 'auditor', password: 'Audit@2024', userId: 3 },
    ],
    opLogs: [
      { id: 1, username: 'admin', action: '登录后台', ip: '112.17.240.36', createdAt: daysAgo(0) },
      { id: 2, username: 'editor', action: '发布文章《GEO是什么及其如何为企业带来流量》', ip: '112.17.240.51', createdAt: daysAgo(2) },
      { id: 3, username: 'auditor', action: '审核通过文章 ID=5', ip: '112.17.241.10', createdAt: daysAgo(10) },
      { id: 4, username: 'admin', action: '修改系统设置：站点名称', ip: '112.17.240.36', createdAt: daysAgo(20) },
    ],
    settings: {
      site: {
        siteName: '婵梦科技企业官网',
        logo: '',
        icp: '浙ICP备2024XXXXXX号-1',
        copyright: '© 2026 杭州婵梦传媒科技有限公司',
        contactPhone: '0571-8888-6666',
        contactEmail: 'hello@chanmeng.tech',
      },
      seo: {
        titleSuffix: ' - 婵梦科技',
        keywords: 'GEO,AI搜索,企业增长,内容营销',
        description: '婵梦科技：以 AI 搜索与内容营销建立获客入口，用商业设计和转化体系推动成交与持续增长。',
        sitemapEnabled: true,
      },
      security: {
        maxLoginFails: 5,
        passwordMinLength: 8,
        passwordRequireMixed: true,
      },
    },
  }
}

let cache: DbShape | null = null

/** 读取数据库（优先 localStorage，其次种子数据） */
export function getDb(): DbShape {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (raw) {
      cache = JSON.parse(raw) as DbShape
      return cache
    }
  } catch {
    // 本地数据损坏时重建
  }
  cache = seed()
  saveDb()
  return cache
}

/** 持久化数据库 */
export function saveDb() {
  if (!cache) return
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(cache))
  } catch {
    // 超出 localStorage 容量时静默失败（演示环境可接受）
  }
}

/** 重置为出厂数据 */
export function resetDb() {
  cache = seed()
  saveDb()
}

/** 生成自增 ID */
export function nextId(): number {
  const db = getDb()
  db.seq += 1
  return db.seq
}

/** 记录操作日志 */
export function addLog(username: string, action: string) {
  const db = getDb()
  db.opLogs.unshift({
    id: nextId(),
    username,
    action,
    ip: `112.17.24${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 255)}`,
    createdAt: now(),
  })
  // 日志最多保留 500 条
  if (db.opLogs.length > 500) db.opLogs.length = 500
  saveDb()
}
