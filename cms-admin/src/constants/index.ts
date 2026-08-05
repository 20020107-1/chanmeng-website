/**
 * 全局常量配置：导航菜单、权限模块定义、角色预设
 */
import type { ModuleKey, ActionKey } from '@/types'
import type { ComponentType } from 'react'
import {
  LayoutDashboard, FileText, FolderOpen, MessageSquare, Users, Settings,
} from 'lucide-react'

/** localStorage 键名前缀 */
export const STORAGE_PREFIX = 'chanmeng-cms:'

/** 权限动作中文名 */
export const ACTION_LABELS: Record<ActionKey, string> = {
  view: '查看',
  create: '新增',
  edit: '编辑',
  delete: '删除',
  audit: '审核',
}

export const ALL_ACTIONS: ActionKey[] = ['view', 'create', 'edit', 'delete', 'audit']

/** 权限模块定义（用于角色权限矩阵） */
export const MODULE_DEFS: { key: ModuleKey; label: string; actions: ActionKey[] }[] = [
  { key: 'dashboard', label: '仪表盘', actions: ['view'] },
  { key: 'articles', label: '文章管理', actions: ALL_ACTIONS },
  { key: 'categories', label: '栏目管理', actions: ['view', 'create', 'edit', 'delete'] },
  { key: 'pages', label: '单页管理', actions: ['view', 'edit'] },
  { key: 'banners', label: '轮播图管理', actions: ['view', 'create', 'edit', 'delete'] },
  { key: 'links', label: '友情链接', actions: ['view', 'create', 'edit', 'delete'] },
  { key: 'media', label: '媒体库', actions: ['view', 'create', 'delete'] },
  { key: 'messages', label: '留言管理', actions: ['view', 'edit', 'delete', 'audit'] },
  { key: 'forms', label: '自定义表单', actions: ['view', 'create', 'edit', 'delete'] },
  { key: 'users', label: '管理员', actions: ['view', 'create', 'edit', 'delete'] },
  { key: 'roles', label: '角色权限', actions: ['view', 'create', 'edit', 'delete'] },
  { key: 'logs', label: '操作日志', actions: ['view'] },
  { key: 'settings', label: '系统设置', actions: ['view', 'edit'] },
]

/** 左侧导航菜单（module 对应权限模块，无 module 表示登录即可见） */
export interface NavItem {
  label: string
  path: string
  icon: ComponentType<{ className?: string }>
  module?: ModuleKey
  children?: { label: string; path: string; module: ModuleKey }[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: '仪表盘', path: '/', icon: LayoutDashboard, module: 'dashboard' },
  {
    label: '内容管理', path: '/content', icon: FileText,
    children: [
      { label: '文章管理', path: '/articles', module: 'articles' },
      { label: '栏目管理', path: '/categories', module: 'categories' },
      { label: '单页管理', path: '/pages', module: 'pages' },
      { label: '轮播图', path: '/banners', module: 'banners' },
      { label: '友情链接', path: '/links', module: 'links' },
    ],
  },
  { label: '媒体库', path: '/media', icon: FolderOpen, module: 'media' },
  {
    label: '表单与留言', path: '/feedback', icon: MessageSquare,
    children: [
      { label: '留言列表', path: '/messages', module: 'messages' },
      { label: '自定义表单', path: '/forms', module: 'forms' },
    ],
  },
  {
    label: '用户与权限', path: '/rbac', icon: Users,
    children: [
      { label: '管理员', path: '/users', module: 'users' },
      { label: '角色管理', path: '/roles', module: 'roles' },
      { label: '操作日志', path: '/logs', module: 'logs' },
    ],
  },
  { label: '系统设置', path: '/settings', icon: Settings, module: 'settings' },
]

/** Banner 位置选项 */
export const BANNER_POSITIONS = ['首页顶部', '首页中部', '新闻列表页', '服务页']

/** 单页模板选项 */
export const PAGE_TEMPLATES = ['默认模板', '全宽模板', '图文模板']

/** 模拟登录验证码有效期提示 */
export const CAPTCHA_LENGTH = 4
