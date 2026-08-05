/**
 * 顶部 Header：移动端菜单、面包屑、通知中心、主题切换、用户菜单
 */
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bell, LogOut, Menu, Moon, Sun, UserRound } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { messageApi } from '@/services'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { NAV_ITEMS } from '@/constants'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { AppSidebar } from './app-sidebar'

/** 由路径推导面包屑 */
function useBreadcrumb() {
  const { pathname } = useLocation()
  const crumbs: { label: string; path?: string }[] = [{ label: '首页', path: '/' }]
  if (pathname === '/') return [{ label: '仪表盘' }]
  for (const item of NAV_ITEMS) {
    if (item.children) {
      const child = item.children.find((c) => pathname.startsWith(c.path))
      if (child) {
        crumbs.push({ label: item.label })
        crumbs.push({ label: child.label })
        return crumbs
      }
    } else if (pathname.startsWith(item.path) && item.path !== '/') {
      crumbs.push({ label: item.label })
      return crumbs
    }
  }
  if (pathname.startsWith('/articles/')) crumbs.push({ label: '内容管理' }, { label: '文章编辑' })
  return crumbs
}

export function AppHeader() {
  const crumbs = useBreadcrumb()
  const navigate = useNavigate()
  const { user, role, logout } = useAuthStore()
  const { theme, toggle } = useThemeStore()

  // 未处理留言数量作为通知
  const { data } = useQuery({
    queryKey: ['messages', 'unprocessed-count'],
    queryFn: () => messageApi.list({ page: 1, pageSize: 5, status: 'unprocessed' }),
    refetchInterval: 30000,
  })
  const unread = data?.total ?? 0

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-card px-4 md:px-6">
      {/* 移动端侧边栏 */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-60 p-0">
          <AppSidebar />
        </SheetContent>
      </Sheet>

      {/* 面包屑 */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span>/</span>}
            {c.path ? (
              <Link to={c.path} className="hover:text-foreground">{c.label}</Link>
            ) : (
              <span className={i === crumbs.length - 1 ? 'font-medium text-foreground' : ''}>{c.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-1">
        {/* 主题切换 */}
        <Button variant="ghost" size="icon" onClick={toggle} title="切换主题">
          {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
        </Button>

        {/* 通知 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4.5 w-4.5" />
              {unread > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] text-destructive-foreground">
                  {unread}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>通知</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {unread === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">暂无新通知</p>
            ) : (
              data?.list.map((m) => (
                <DropdownMenuItem key={m.id} onClick={() => navigate('/messages')} className="flex-col items-start gap-0.5">
                  <span className="text-sm font-medium">新留言：{m.name}</span>
                  <span className="line-clamp-1 text-xs text-muted-foreground">{m.content}</span>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 用户菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <UserRound className="h-4 w-4 text-primary" />
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-sm font-medium">{user?.name}</span>
                <Badge variant="secondary" className="mt-0.5 text-[10px]">{role?.name}</Badge>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <p className="text-sm">{user?.name}</p>
              <p className="text-xs font-normal text-muted-foreground">@{user?.username}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> 退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
