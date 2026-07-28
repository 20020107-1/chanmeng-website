'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { CASE_STUDIES } from '@/data/cases'
import { NEWS_ARTICLES } from '@/data/news'

const PREVIEWS = {
  '/services': {
    eyebrow: '核心服务',
    headline: '从业务问题出发，连接增长所需能力',
    allLabel: '查看全部服务',
    items: [
      { title: 'AI搜索获客', description: 'GEO、AEO与LLMO优化', href: '/services/ai-search-acquisition' },
      { title: 'AI内容营销', description: '内容生产、短视频与IP建设', href: '/services/ai-content-marketing' },
      { title: '全域流量运营', description: '连接公域、付费流量与私域沉淀', href: '/services/omnichannel-traffic-operations' },
      { title: '商业转化与增长', description: '从商业设计到成交、承接与复购', href: '/services/commercial-conversion-growth' },
    ],
  },
  '/cases': {
    eyebrow: '客户案例',
    headline: '通过真实项目，了解服务如何落地',
    allLabel: '查看全部案例',
    items: CASE_STUDIES.slice(0, 5).map((item) => ({
      title: item.title,
      description: item.subtitle,
      href: `/cases/${item.slug}`,
    })),
  },
  '/news': {
    eyebrow: '新闻动态',
    headline: '公司进展、增长观察与行业洞察',
    allLabel: '查看全部新闻',
    items: NEWS_ARTICLES.slice(0, 5).map((article) => ({
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
    return <Link href={item.href} className={`transition-colors ${active ? 'font-medium text-black' : 'text-gray-600 hover:text-black'}`}>{item.name}</Link>
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
      <Link href={item.href} className={`flex h-full items-center transition-colors ${active ? 'font-medium text-black' : 'text-gray-600 hover:text-black'}`}>{item.name}</Link>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-50 border-t border-black/[0.04] bg-white/95 shadow-[0_24px_55px_rgba(0,0,0,.10)] backdrop-blur-2xl"
          >
            <div className="mx-auto max-w-7xl px-8 py-10">
              <div className="mb-7 flex items-end justify-between border-b border-gray-200/80 pb-6">
                <div>
                  <p className="text-[13px] font-medium tracking-[0.12em] text-gray-400">{preview.eyebrow}</p>
                  <p className="mt-2.5 text-[28px] font-semibold leading-tight tracking-[-0.04em] text-[#1d1d1f]">{preview.headline}</p>
                </div>
                <Link href={item.href} className="text-blue-600 hover:underline"><span className="text-[15px]">{preview.allLabel}</span></Link>
              </div>
              <div className={`grid gap-4 ${preview.items.length >= 5 ? 'grid-cols-5' : preview.items.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {preview.items.map((entry, index) => (
                  <motion.div key={entry.href} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, delay: 0.025 * index }}>
                    <Link href={entry.href} className="group/card block min-h-[112px] rounded-2xl px-5 py-5 transition-colors duration-200 hover:bg-[#f5f5f7] focus:bg-[#f5f5f7] focus:outline-none">
                      <span className="block text-[18px] font-semibold leading-snug tracking-[-0.025em] text-[#1d1d1f] group-hover/card:text-blue-600">{entry.title}</span>
                      <span className="mt-2.5 block text-[14px] leading-6 text-gray-500">{entry.description}</span>
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
