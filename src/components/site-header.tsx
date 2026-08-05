'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import BrandMark from '@/components/brand-mark'
import BrandName from '@/components/brand-name'
import NavigationDrawer from '@/components/navigation-drawer'
import SiteSearch from '@/components/site-search'
import NavPreview from '@/components/nav-preview'
import { PRIMARY_NAV } from '@/data/navigation'

export default function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showNavigation() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
    setSearchOpen(false)
  }

  function hideNavigationWithGrace() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 420)
  }

  return (
    <nav
      className="apple-nav claude-nav sticky top-0 z-50"
      aria-label="主导航"
      onMouseEnter={() => {
        if (closeTimer.current) clearTimeout(closeTimer.current)
      }}
      onMouseLeave={hideNavigationWithGrace}
    >
      <div className="mx-auto flex items-center px-5 md:px-8">
        <Link href="/" className="claude-brand flex shrink-0 items-center" aria-label="返回首页">
          <BrandMark />
          <span className="mx-3 h-6 w-px bg-[#b58a4a]/45" aria-hidden="true" />
          <BrandName />
        </Link>
        <div className="apple-nav-links hidden lg:flex items-center">
          {PRIMARY_NAV.map((item) => <NavPreview key={item.href} item={item} active={active === item.href} />)}
        </div>
        <div className="apple-nav-actions ml-auto flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => { setSearchOpen(!searchOpen); setOpen(false) }}
            className={`grid h-9 w-9 place-items-center rounded-lg transition-all hover:bg-[#2d2926]/[0.06] ${searchOpen ? 'bg-[#2d2926]/[0.07] text-[#9b2f22]' : 'text-[#2d2926]'}`}
            aria-label={searchOpen ? '关闭站内搜索' : '打开站内搜索'}
            aria-expanded={searchOpen}
          >
            <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" strokeWidth="1.7" />
              <path d="m16 16 4.2 4.2" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
          <Link href="/contact" className="claude-sales flex h-9 items-center rounded-lg border border-[#2d2926]/15 px-4 text-[13px] text-[#2d2926] transition-colors hover:bg-white/70">预约诊断</Link>
          <div
            className="-m-1 p-1"
            onPointerEnter={showNavigation}
            onPointerLeave={hideNavigationWithGrace}
          >
            <button
              type="button"
              onFocus={showNavigation}
              onClick={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current)
                setOpen((current) => !current)
                setSearchOpen(false)
              }}
              className="claude-menu flex h-10 min-w-[112px] items-center justify-center gap-2.5 rounded-lg bg-[#181816] px-5 text-[13px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-black active:scale-[0.98]"
              aria-label={open ? '关闭全部导航' : '打开全部导航'}
              aria-expanded={open}
            >
              全部导航
              <svg className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>
      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NavigationDrawer
        open={open}
        onClose={() => setOpen(false)}
        onPointerEnter={() => {
          if (closeTimer.current) clearTimeout(closeTimer.current)
        }}
        onPointerLeave={hideNavigationWithGrace}
      />
    </nav>
  )
}
