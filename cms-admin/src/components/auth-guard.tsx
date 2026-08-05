/**
 * 路由守卫：
 * - RequireAuth：未登录跳转登录页，并记住来源地址
 * - RequirePermission：无模块查看权限时跳转 403
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/stores/auth'
import type { ModuleKey } from '@/types'

export function RequireAuth() {
  const token = useAuthStore((s) => s.token)
  const location = useLocation()
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  return <Outlet />
}

export function RequirePermission({ module, children }: { module: ModuleKey; children: ReactNode }) {
  const can = useAuthStore((s) => s.can)
  if (!can(module, 'view')) {
    return <Navigate to="/403" replace />
  }
  return <>{children}</>
}
