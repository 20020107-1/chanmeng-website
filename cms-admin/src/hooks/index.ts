/**
 * 自定义 Hooks
 */
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/auth'
import type { ModuleKey, ActionKey } from '@/types'

/** 权限判断 Hook */
export function usePermission() {
  const can = useAuthStore((s) => s.can)
  return {
    can,
    canView: (m: ModuleKey) => can(m, 'view'),
    canCreate: (m: ModuleKey) => can(m, 'create'),
    canEdit: (m: ModuleKey) => can(m, 'edit'),
    canDelete: (m: ModuleKey) => can(m, 'delete'),
    canAudit: (m: ModuleKey) => can(m, 'audit'),
  }
}

/** 防抖值 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export type { ModuleKey, ActionKey }
