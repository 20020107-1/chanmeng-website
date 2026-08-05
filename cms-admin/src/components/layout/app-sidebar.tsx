/**
 * 左侧固定导航：按权限过滤菜单，支持分组折叠（默认展开）
 */
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { NAV_ITEMS } from '@/constants'
import { useAuthStore } from '@/stores/auth'
import { cn } from '@/lib/utils'

export function AppSidebar() {
  const can = useAuthStore((s) => s.can)
  const location = useLocation()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  // 权限过滤：无 view 权限的菜单不显示
  const items = NAV_ITEMS.map((item) => {
    if (!item.children) return item
    const children = item.children.filter((c) => can(c.module, 'view'))
    return { ...item, children }
  }).filter((item) => (item.children ? item.children.length > 0 : item.module ? can(item.module, 'view') : true))

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          婵
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">婵梦科技 CMS</p>
          <p className="text-xs text-muted-foreground">企业官网管理后台</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => {
          const Icon = item.icon
          // 分组菜单
          if (item.children) {
            const isOpen = !collapsed[item.path]
            const groupActive = item.children.some((c) => location.pathname.startsWith(c.path))
            return (
              <div key={item.path}>
                <button
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted',
                    groupActive ? 'font-medium text-primary' : 'text-muted-foreground',
                  )}
                  onClick={() => setCollapsed((s) => ({ ...s, [item.path]: !s[item.path] }))}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
                </button>
                {isOpen && (
                  <div className="mt-1 space-y-0.5 pl-9">
                    {item.children.map((c) => (
                      <NavLink
                        key={c.path}
                        to={c.path}
                        className={({ isActive }) =>
                          cn(
                            'block rounded-md px-3 py-1.5 text-sm transition-colors',
                            isActive
                              ? 'bg-primary/10 font-medium text-primary'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                          )
                        }
                      >
                        {c.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          }
          // 单页菜单
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
      <div className="border-t p-4 text-xs text-muted-foreground">
        V1.0 · 演示环境
      </div>
    </aside>
  )
}
