'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { CASE_STUDIES } from '@/data/cases'
import { NEWS_ARTICLES } from '@/data/news'
import { SERVICE_DETAILS } from '@/data/services'

const PREVIEWS = {
  '/services': {
    eyebrow: '核心服务',
    headline: '六步增长闭环，从商业诊断走向持续增长',
    allLabel: '查看全部服务',
    items: SERVICE_DETAILS.map((service) => ({
      title: service.title,
      description: service.modules.map((item) => item.title).join(' · '),
      href: `/services/${service.slug}`,
    })),
  },
  '/cases': {
    eyebrow: '客户案例',
    headline: '通过真实项目，了解服务如何落地',
    allLabel: '查看全部案例',
    items: CASE_STUDIES.slice(0, 4).map((item) => ({
      title: item.title,
      description: item.subtitle,
      href: `/cases/${item.slug}`,
    })),
  },
  '/news': {
    eyebrow: '新闻动态',
    headline: '公司进展、增长观察与行业洞察',
    allLabel: '查看全部新闻',
    items: NEWS_ARTICLES.slice(0, 4).map((article) => ({
      title: article.title,
      description: article.summary,
      href: `/news/${article.slug}`,
    })),
  },
} as const

export default function NavPreview({ item, active = false }: { item: { name: string; href: string }; active?: boolean }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const preview = PREVIEWS[item.href as keyof typeof PREVIEWS]

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  if (!preview) {
    return <Link href={item.href} className={`transition-colors ${active ? 'font-medium text-[#2d2926]' : 'text-[#5d554d] hover:text-[#2d2926]'}`}>{item.name}</Link>
  }

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const hideWithGrace = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 130)
  }

  return (
    <div
      className="flex h-12 items-center"
      onMouseEnter={show}
      onMouseLeave={hideWithGrace}
      onFocus={show}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <Link href={item.href} className={`claude-nav-link relative flex h-full items-center gap-1.5 transition-colors ${active ? 'font-medium text-[#2d2926]' : 'text-[#5d554d] hover:text-[#2d2926]'}`}>
        <span className={`claude-nav-label relative flex h-full items-center ${active ? 'is-active' : ''}`}>{item.name}</span>
        <svg className={`h-3 w-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4.75 3 3 3-3" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.99 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[calc(100%-4px)] z-50 w-[min(1040px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-[22px] border border-[#6f5b43]/[0.11] bg-[#fcfbf7]/95 p-2.5 shadow-[0_24px_70px_rgba(54,42,29,.15),0_2px_8px_rgba(54,42,29,.05)] backdrop-blur-2xl"
          >
            <div className="grid grid-cols-[190px_1fr] gap-2.5">
              <div className="flex min-h-[224px] flex-col rounded-[15px] bg-[#f2eee5] p-5">
                <p className="text-[11px] font-medium tracking-[.12em] text-[#9b2f22]">{preview.eyebrow}</p>
                <p className="mt-3 text-[16px] font-medium leading-[1.55] tracking-[-.01em] text-[#211d18]">{preview.headline}</p>
                <Link href={item.href} className="group/all mt-auto inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-[#8e2f25]">
                  <span className="border-b border-transparent transition-colors group-hover/all:border-[#8e2f25]">{preview.allLabel}</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover/all:translate-x-0.5">›</span>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {preview.items.map((entry, index) => (
                  <motion.div key={entry.href} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.025 * index }}>
                    <Link href={entry.href} className="group/card flex min-h-[109px] flex-col rounded-[14px] px-4 py-3.5 transition-all duration-200 hover:bg-white hover:shadow-[0_8px_24px_rgba(60,44,28,.07)] focus:bg-white focus:outline-none">
                      <span className="text-[10px] font-medium tabular-nums tracking-[.12em] text-[#b18a55]">0{index + 1}</span>
                      <span className="mt-2 block line-clamp-2 text-[14px] font-medium leading-[1.45] tracking-[-.01em] text-[#211d18] transition-colors group-hover/card:text-[#8e2f25]">{entry.title}</span>
                      <span className="mt-auto block line-clamp-1 pt-1.5 text-[11px] leading-5 text-[#8a8178]">{entry.description}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
