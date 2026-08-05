/**
 * 主题状态：浅色 / 深色切换，写入 <html> 的 class
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_PREFIX } from '@/constants'

type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

interface ThemeState {
  theme: Theme
  toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggle: () => {
        const next: Theme = get().theme === 'light' ? 'dark' : 'light'
        applyTheme(next)
        set({ theme: next })
      },
    }),
    {
      name: STORAGE_PREFIX + 'theme',
      onRehydrateStorage: () => (state) => {
        // 刷新后恢复主题
        if (state) applyTheme(state.theme)
      },
    },
  ),
)
