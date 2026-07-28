'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { CASE_STUDIES } from '@/data/cases'
import { NEWS_ARTICLES } from '@/data/news'

const STATIC_RESULTS = [
  { title: '关于我们', description: '了解婵梦科技的使命、愿景与团队', category: '公司', href: '/about' },
  { title: '核心服务', description: '查看AI驱动的全链路增长服务体系', category: '服务', href: '/services' },
  { title: '商业增长全案', description: '连接获客、转化与持续复盘', category: '服务', href: '/services#commercial-growth' },
  { title: 'AI获客工具', description: '让AI进入获客与客户触达流程', category: '服务', href: '/services#ai-tools' },
  { title: 'AI搜索获客', description: 'GEO、AEO与LLMO优化', category: '服务', href: '/services/ai-search-acquisition' },
  { title: 'AI内容营销', description: '短视频、直播、个人IP与品牌内容', category: '服务', href: '/services/ai-content-marketing' },
  { title: '全域流量运营', description: '自然流量、付费投放与私域沉淀', category: '服务', href: '/services/omnichannel-traffic-operations' },
  { title: '商业转化与增长', description: '商业设计、成交承接与持续复购', category: '服务', href: '/services/commercial-conversion-growth' },
  { title: '行业方案', description: '按企业增长问题匹配实施方案', category: '业务', href: '/solutions' },
  { title: '客户案例', description: '查看结构化项目案例与交付路径', category: '案例', href: '/cases' },
  { title: '新闻动态', description: '公司新闻、增长观察与行业文章', category: '内容', href: '/news' },
  { title: '合作伙伴', description: '了解合作方向、合作方式与伙伴标准', category: '合作', href: '/partners' },
  { title: '渠道合作', description: '了解内部与外部合伙合作方式', category: '合作', href: '/partner' },
  { title: '联系销售', description: '提交需求并联系企业增长顾问', category: '联系', href: '/contact' },
]

const SEARCH_RESULTS = [
  ...STATIC_RESULTS,
  ...NEWS_ARTICLES.map((article) => ({
    title: article.title,
    description: article.summary,
    category: article.category,
    href: `/news/${article.slug}`,
  })),
  ...CASE_STUDIES.map((item) => ({
    title: item.title,
    description: item.subtitle,
    category: item.category,
    href: `/cases/${item.slug}`,
  })),
]

export default function SiteSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open, onClose])

  const results = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('zh-CN')
    if (!keyword) return SEARCH_RESULTS.slice(0, 6)
    return SEARCH_RESULTS.filter((item) =>
      `${item.title} ${item.description} ${item.category}`.toLocaleLowerCase('zh-CN').includes(keyword)
    ).slice(0, 8)
  }, [query])

  return (
    <>
      <button
        type="button"
        aria-label="关闭站内搜索"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={`fixed inset-0 top-[49px] z-40 bg-black/15 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <section
        aria-label="站内搜索"
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full z-50 origin-top border-t border-black/[0.04] bg-white/98 shadow-[0_24px_60px_rgba(0,0,0,.12)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${open ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-2 opacity-0'}`}
      >
        <div className="mx-auto max-w-4xl px-5 py-7 md:py-9">
          <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
            <svg className="h-6 w-6 flex-none text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="11" cy="11" r="7" strokeWidth="1.7" />
              <path d="m16.2 16.2 4 4" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              tabIndex={open ? 0 : -1}
              placeholder="搜索婵梦科技官网"
              className="min-w-0 flex-1 bg-transparent text-2xl font-medium tracking-[-0.035em] text-[#1d1d1f] outline-none placeholder:text-gray-400 md:text-3xl"
            />
            {query ? <button type="button" onClick={() => setQuery('')} className="rounded-full px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100">清除</button> : null}
          </div>
          <p className="mb-3 mt-6 text-[11px] font-medium tracking-[0.14em] text-gray-400">{query ? '搜索结果' : '快速访问'}</p>
          <div className="grid gap-1 md:grid-cols-2 md:gap-x-8">
            {results.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={onClose}
                className="group rounded-xl px-3 py-3 transition-colors hover:bg-[#f5f5f7] focus:bg-[#f5f5f7] focus:outline-none"
              >
                <span className="block text-[15px] font-semibold text-[#1d1d1f] group-hover:text-blue-600">{item.title}</span>
                <span className="mt-1 block truncate text-xs text-gray-500">{item.category} · {item.description}</span>
              </Link>
            ))}
          </div>
          {results.length === 0 ? <p className="py-8 text-center text-sm text-gray-500">没有找到相关内容，请尝试其他关键词。</p> : null}
        </div>
      </section>
    </>
  )
}
