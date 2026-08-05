/**
 * 认证状态：token / 当前用户 / 角色权限
 * persist 到 localStorage，支持「记住我」（不勾选则仅存 sessionStorage 语义——
 * 演示环境统一存 localStorage，登出即清除）
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AdminUser, Role, ModuleKey, ActionKey } from '@/types'
import { STORAGE_PREFIX } from '@/constants'

interface AuthState {
  token: string | null
  user: AdminUser | null
  role: Role | null
  login: (payload: { token: string; user: AdminUser; role: Role }) => void
  logout: () => void
  /** 判断是否拥有某模块某动作的权限 */
  can: (module: ModuleKey, action: ActionKey) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      role: null,
      login: ({ token, user, role }) => set({ token, user, role }),
      logout: () => set({ token: null, user: null, role: null }),
      can: (module, action) => {
        const { role } = get()
        if (!role) return false
        // 超级管理员（内置角色 ID=1）拥有全部权限
        if (role.id === 1) return true
        return role.permissions[module]?.includes(action) ?? false
      },
    }),
    { name: STORAGE_PREFIX + 'auth' },
  ),
)
