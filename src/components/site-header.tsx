'use client'

import { useState } from 'react'
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
  return (
    <nav className="apple-nav sticky top-0 z-50" aria-label="主导航">
      <div className="mx-auto px-4 md:px-6 flex items-center">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="返回首页"><BrandMark /><BrandName /></Link>
        <div className="apple-nav-links hidden lg:flex items-center">
          {PRIMARY_NAV.map((item) => <NavPreview key={item.href} item={item} active={active === item.href} />)}
        </div>
        <div className="apple-nav-actions ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setSearchOpen(!searchOpen); setOpen(false) }}
            className={`grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-black/5 ${searchOpen ? 'bg-black/5 text-blue-600' : 'text-gray-800'}`}
            aria-label={searchOpen ? '关闭站内搜索' : '打开站内搜索'}
            aria-expanded={searchOpen}
          >
            <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" strokeWidth="1.7" />
              <path d="m16 16 4.2 4.2" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" onClick={() => { setOpen(!open); setSearchOpen(false) }} className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-black/5" aria-label={open ? '关闭全部导航' : '打开全部导航'} aria-expanded={open}>
            <span className="relative block h-3.5 w-4" aria-hidden="true"><i className={`absolute left-0 top-[2px] block h-px w-4 bg-gray-800 transition-all duration-200 ${open ? 'translate-y-[5px] rotate-45' : ''}`} /><i className={`absolute left-0 top-[7px] block h-px w-4 bg-gray-800 transition-opacity duration-150 ${open ? 'opacity-0' : 'opacity-100'}`} /><i className={`absolute bottom-[1px] left-0 block h-px w-4 bg-gray-800 transition-all duration-200 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} /></span>
          </button>
        </div>
      </div>
      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NavigationDrawer open={open} onClose={() => setOpen(false)} />
    </nav>
  )
}
