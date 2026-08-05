/**
 * 路由配置：登录页 / 后台（守卫 + Layout + 各模块页面）/ 403 / 404
 */
import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/admin-layout'
import { RequireAuth, RequirePermission } from '@/components/auth-guard'
import LoginPage from '@/pages/login'
import DashboardPage from '@/pages/dashboard'
import ArticleListPage from '@/pages/articles'
import ArticleEditPage from '@/pages/articles/edit'
import CategoryPage from '@/pages/categories'
import SinglePagesPage from '@/pages/single-pages'
import BannerPage from '@/pages/banners'
import LinksPage from '@/pages/links'
import MediaPage from '@/pages/media'
import MessagesPage from '@/pages/messages'
import FormsPage from '@/pages/messages/forms'
import UsersPage from '@/pages/users'
import RolesPage from '@/pages/roles'
import LogsPage from '@/pages/logs'
import SettingsPage from '@/pages/settings'
import ForbiddenPage from '@/pages/errors/forbidden'
import NotFoundPage from '@/pages/errors/not-found'
import type { ModuleKey } from '@/types'
import type { ReactNode } from 'react'

/** 包装权限守卫 */
function P({ module, children }: { module: ModuleKey; children: ReactNode }) {
  return <RequirePermission module={module}>{children}</RequirePermission>
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/403" element={<ForbiddenPage />} />

      {/* 需要登录的后台区域 */}
      <Route element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route index element={<P module="dashboard"><DashboardPage /></P>} />
          <Route path="articles" element={<P module="articles"><ArticleListPage /></P>} />
          <Route path="articles/new" element={<P module="articles"><ArticleEditPage /></P>} />
          <Route path="articles/:id/edit" element={<P module="articles"><ArticleEditPage /></P>} />
          <Route path="categories" element={<P module="categories"><CategoryPage /></P>} />
          <Route path="pages" element={<P module="pages"><SinglePagesPage /></P>} />
          <Route path="banners" element={<P module="banners"><BannerPage /></P>} />
          <Route path="links" element={<P module="links"><LinksPage /></P>} />
          <Route path="media" element={<P module="media"><MediaPage /></P>} />
          <Route path="messages" element={<P module="messages"><MessagesPage /></P>} />
          <Route path="forms" element={<P module="forms"><FormsPage /></P>} />
          <Route path="users" element={<P module="users"><UsersPage /></P>} />
          <Route path="roles" element={<P module="roles"><RolesPage /></P>} />
          <Route path="logs" element={<P module="logs"><LogsPage /></P>} />
          <Route path="settings" element={<P module="settings"><SettingsPage /></P>} />
        </Route>
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
