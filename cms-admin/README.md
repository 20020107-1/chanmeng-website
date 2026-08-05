# 婵梦科技企业官网后台管理系统（CMS Admin）

面向企业官网运营团队的内容管理后台，覆盖 **仪表盘 / 内容管理 / 媒体库 / 表单与留言 / 用户与权限（RBAC）/ 系统设置** 六大模块。

## 技术栈

| 领域 | 选型 |
|---|---|
| 前端框架 | React 18 + TypeScript + Vite |
| UI | Tailwind CSS + shadcn/ui（Radix UI）+ Lucide 图标 |
| 路由 | React Router v6（含路由守卫：未登录 → /login，无权限 → /403） |
| 状态管理 | Zustand（认证 / 主题，persist 持久化） |
| 数据请求 | TanStack Query + Axios |
| 数据层 | Mock API（Axios adapter 拦截，RESTful + 统一响应 `{ code, data, message }`，localStorage 持久化） |

> 对接真实后端时：删除 `src/services/http.ts` 中的 `adapter: mockAdapter`，把 `baseURL` 指向后端即可，前端零改动。

## 快速开始

```bash
# 安装依赖（Node.js 20+）
npm install

# 启动开发服务器（默认 http://localhost:3100）
npm run dev

# 生产构建 → dist/
npm run build

# 本地预览生产构建
npm run preview
```

## 演示账号

| 账号 | 密码 | 角色 | 权限说明 |
|---|---|---|---|
| `admin` | `Admin@2024` | 超级管理员 | 全部模块全部操作 |
| `editor` | `Editor@2024` | 内容编辑 | 文章 / 栏目 / 单页 / 媒体 / Banner / 友链 |
| `auditor` | `Audit@2024` | 审核员 | 仅查看 + 文章审核 + 留言处理 |

> 用 `auditor` 登录可体验「无权限模块菜单隐藏 + 直接访问 URL 跳转 403」。

## 功能清单

- **仪表盘**：PV/UV/文章数/留言数卡片、近 7 天访问趋势图（Recharts）、待办（草稿文章 + 新留言）、快捷入口
- **文章管理**：搜索 / 状态与栏目筛选 / 分页 / 批量删除 / 置顶；编辑器含轻量富文本、封面上传、发布状态（草稿/发布/定时）、SEO TDK
- **栏目管理**：树形结构、同级拖拽排序、自定义 URL（slug）、关联模板
- **单页管理**：关于我们 / 联系我们 / 隐私政策等内容维护
- **轮播图**：按位置分组、上下线开关、同位置内排序、跳转链接
- **友情链接**：名称 / URL / Logo / 排序
- **媒体库**：文件夹分类、拖拽上传（进度显示）、预览、复制 URL、删除
- **留言管理**：状态标记（已处理/未处理）、按状态与来源筛选、导出 Excel（CSV）、删除
- **自定义表单**：可视化字段配置（文本/手机/多行/下拉/日期、必填、排序）
- **RBAC**：管理员管理（新增/启停/重置密码）、角色权限矩阵（模块 × 查看/新增/编辑/删除/审核）、操作日志（操作人/IP/内容/时间）
- **系统设置**：站点信息（名称/Logo/ICP/版权/客服）、全站 SEO（后缀/关键词/描述/Sitemap）、安全策略（失败锁定/密码强度）、数据备份（一键导出 JSON / 恢复出厂数据）
- **通用能力**：深浅色主题切换、面包屑、通知中心（未处理留言）、Toast 反馈、加载骨架屏、空状态、表格排序与列宽拖拽、表单即时校验

## 目录结构

```
src/
├── components/          # 公共组件
│   ├── layout/          # AdminLayout / Sidebar / Header
│   ├── ui/              # shadcn/ui 基础组件
│   ├── auth-guard.tsx   # 路由守卫（登录 / 权限）
│   ├── data-table.tsx   # 通用表格（选择/排序/列宽调整/分页条）
│   ├── rich-text-editor.tsx  # 轻量富文本编辑器
│   ├── upload-zone.tsx  # 拖拽上传（进度显示）
│   └── common.tsx       # PageHeader / EmptyState / ConfirmDialog / 状态徽标
├── pages/               # 页面（按模块分文件夹）
│   ├── login/           # 登录（验证码 + 记住我）
│   ├── dashboard/       # 仪表盘
│   ├── articles/        # 文章列表 + 新增/编辑
│   ├── categories/      # 栏目（树形 + 拖拽排序）
│   ├── single-pages/    # 单页管理
│   ├── banners/         # 轮播图
│   ├── links/           # 友情链接
│   ├── media/           # 媒体库
│   ├── messages/        # 留言列表 + 自定义表单
│   ├── users/           # 管理员
│   ├── roles/           # 角色权限矩阵
│   ├── logs/            # 操作日志
│   ├── settings/        # 系统设置（基础/SEO/安全/备份）
│   └── errors/          # 403 / 404
├── hooks/               # usePermission / useDebounce
├── stores/              # Zustand：auth（认证）/ theme（主题）
├── services/            # http（Axios 实例）+ index（按模块的 API 封装）
├── types/               # TypeScript 类型定义
├── utils/               # 格式化 / CSV 导出 / 下载 / 剪贴板
├── constants/           # 导航菜单 / 权限模块定义 / 常量
└── mock/                # Mock 数据层
    ├── db.ts            # 种子数据 + localStorage 持久化
    └── server.ts        # RESTful 路由 + 统一响应格式
```

## 接口约定（RESTful）

- 统一响应格式：`{ code: 0, data: T, message: "success" }`，`code` 非 0 为业务错误
- 列表分页参数：`page` / `pageSize` / `keyword` + 各模块筛选参数
- 主要资源：`/auth/login`、`/dashboard/stats`、`/articles`、`/categories`、`/pages`、`/banners`、`/links`、`/media/files`、`/messages`、`/forms`、`/users`、`/roles`、`/logs`、`/settings`、`/backup`
- 完整路由实现在 `src/mock/server.ts`，与真实后端一一对应

## 说明

- 演示环境数据保存在浏览器 localStorage，刷新不丢失；「系统设置 → 数据备份」可导出 JSON 或恢复出厂数据
- 大于 300KB 的上传图片使用占位图（picsum.photos），避免撑爆 localStorage
- 「导出 Excel」为带 BOM 的 CSV，Excel 可直接打开且中文不乱码
