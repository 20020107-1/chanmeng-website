/**
 * 全局 TypeScript 类型定义
 * 覆盖：文章、栏目、单页、Banner、友链、媒体、留言、表单、用户、角色、日志、设置
 */

/** 标准 API 响应格式 */
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

/** 分页响应 */
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/** 分页查询参数 */
export interface PageQuery {
  page?: number
  pageSize?: number
  keyword?: string
  [key: string]: unknown
}

// ─── 权限模块与动作 ─────────────────────────────────────────
export type ModuleKey =
  | 'dashboard' | 'articles' | 'categories' | 'pages' | 'banners' | 'links'
  | 'media' | 'messages' | 'forms' | 'users' | 'roles' | 'logs' | 'settings'

export type ActionKey = 'view' | 'create' | 'edit' | 'delete' | 'audit'

/** 角色权限：模块 -> 动作列表 */
export type PermissionMap = Partial<Record<ModuleKey, ActionKey[]>>

// ─── 用户与角色 ─────────────────────────────────────────────
export interface AdminUser {
  id: number
  username: string
  name: string
  roleId: number
  status: 'active' | 'disabled'
  lastLoginAt: string | null
  createdAt: string
}

export interface Role {
  id: number
  name: string
  description: string
  builtin?: boolean
  permissions: PermissionMap
}

export interface OpLog {
  id: number
  username: string
  action: string
  ip: string
  createdAt: string
}

// ─── 内容管理 ───────────────────────────────────────────────
export type ArticleStatus = 'draft' | 'published' | 'scheduled'

export interface Article {
  id: number
  title: string
  categoryId: number | null
  summary: string
  content: string
  cover: string
  status: ArticleStatus
  isTop: boolean
  publishAt: string | null
  seoTitle: string
  seoKeywords: string
  seoDescription: string
  views: number
  author: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: number
  name: string
  slug: string
  parentId: number | null
  order: number
  template: string
}

export interface SinglePage {
  id: number
  name: string
  slug: string
  content: string
  updatedAt: string
}

export interface Banner {
  id: number
  title: string
  image: string
  link: string
  position: string
  order: number
  enabled: boolean
}

export interface FriendLink {
  id: number
  name: string
  url: string
  logo: string
  order: number
}

// ─── 媒体库 ─────────────────────────────────────────────────
export interface MediaFolder {
  id: number
  name: string
}

export interface MediaFile {
  id: number
  name: string
  url: string
  folderId: number | null
  size: number
  mime: string
  createdAt: string
}

// ─── 留言与表单 ─────────────────────────────────────────────
export interface Message {
  id: number
  name: string
  phone: string
  content: string
  formId: number | null
  status: 'unprocessed' | 'processed'
  createdAt: string
}

export interface FormField {
  key: string
  label: string
  type: 'text' | 'phone' | 'textarea' | 'select' | 'date'
  required: boolean
  options?: string[]
}

export interface CustomForm {
  id: number
  name: string
  description: string
  fields: FormField[]
}

// ─── 系统设置 ───────────────────────────────────────────────
export interface SiteSettings {
  siteName: string
  logo: string
  icp: string
  copyright: string
  contactPhone: string
  contactEmail: string
}

export interface SeoSettings {
  titleSuffix: string
  keywords: string
  description: string
  sitemapEnabled: boolean
}

export interface SecuritySettings {
  maxLoginFails: number
  passwordMinLength: number
  passwordRequireMixed: boolean
}

export interface SystemSettings {
  site: SiteSettings
  seo: SeoSettings
  security: SecuritySettings
}

// ─── 仪表盘 ─────────────────────────────────────────────────
export interface DashboardStats {
  todayPV: number
  todayUV: number
  articleCount: number
  messageCount: number
  pvTrend: { date: string; pv: number; uv: number }[]
}
