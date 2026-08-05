'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type Consent = 'necessary' | 'all'

const STORAGE_KEY = 'chanmeng-cookie-consent'

export default function CookieConsent() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [analytics, setAnalytics] = useState(true)

  useEffect(() => {
    setVisible(!window.localStorage.getItem(STORAGE_KEY))
  }, [])

  const save = (choice: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, choice)
    document.cookie = `cm_cookie_consent=${choice}; Max-Age=15552000; Path=/; SameSite=Lax`
    window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: { analytics: choice === 'all' } }))
    setVisible(false)
  }

  if (!visible || pathname.startsWith('/admin')) return null

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-6xl overflow-hidden rounded-[22px] border border-white/10 bg-[#101722]/[0.97] text-white shadow-[0_24px_80px_rgba(0,0,0,.28)] backdrop-blur-2xl md:inset-x-6 md:bottom-6"
    >
      <div className="px-5 py-5 md:px-7 md:py-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-blue-400">COOKIE PREFERENCES</p>
            <h2 id="cookie-title" className="mt-2 text-xl font-semibold tracking-[-0.025em] md:text-2xl">您的 Cookie 偏好</h2>
          </div>
          <button type="button" onClick={() => save('necessary')} aria-label="关闭并仅使用必要 Cookie" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-xl text-white/70 transition-colors hover:bg-white/15 hover:text-white">×</button>
        </div>

        <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="max-w-3xl text-sm leading-6 text-slate-300 md:text-[15px]">
              我们使用必要 Cookie 保证网站正常运行，并在您同意后使用分析 Cookie 改善浏览体验。您可以接受全部，也可以仅保留必要 Cookie。
              <Link href="/privacy" className="ml-1 text-blue-400 hover:text-blue-300 hover:underline">查看隐私政策</Link>
            </p>

            {settingsOpen ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div><p className="font-medium">必要 Cookie</p><p className="mt-1 text-xs leading-5 text-slate-400">用于保存偏好及维持网站基本功能</p></div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">始终启用</span>
                  </div>
                </div>
                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4">
                  <div><p className="font-medium">分析 Cookie</p><p className="mt-1 text-xs leading-5 text-slate-400">帮助了解页面使用情况并优化体验</p></div>
                  <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="h-5 w-5 accent-blue-500" />
                </label>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2.5 lg:justify-end">
            <button type="button" onClick={() => setSettingsOpen((value) => !value)} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
              {settingsOpen ? '收起设置' : '偏好设置'}
            </button>
            <button type="button" onClick={() => save(settingsOpen && analytics ? 'all' : 'necessary')} className="rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#101722] transition-colors hover:bg-slate-100">
              {settingsOpen ? '保存偏好' : '仅必要'}
            </button>
            <button type="button" onClick={() => save('all')} className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500">
              接受全部
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
