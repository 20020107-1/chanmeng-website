/**
 * 后台整体布局：左侧导航 + 顶部 Header + 内容区
 */
import { Outlet } from 'react-router-dom'
import { AppSidebar } from './app-sidebar'
import { AppHeader } from './app-header'

export function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      {/* PC 端固定侧边栏；移动端由 Header 的抽屉提供 */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
