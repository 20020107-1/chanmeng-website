'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { CASE_STUDIES } from '@/data/cases'
import { NEWS_ARTICLES } from '@/data/news'
import { SERVICE_DETAILS } from '@/data/services'

const STATIC_RESULTS = [
  { title: '关于我们', description: '了解婵梦科技的使命、愿景与团队', category: '公司', href: '/about' },
  { title: '核心服务', description: '查看AI驱动的全链路增长服务体系', category: '服务', href: '/services' },
  { title: '行业方案', description: '按企业增长问题匹配实施方案', category: '业务', href: '/solutions' },
  { title: '客户案例', description: '查看结构化项目案例与交付路径', category: '案例', href: '/cases' },
  { title: '新闻动态', description: '公司新闻、增长观察与行业文章', category: '内容', href: '/news' },
  { title: '合作伙伴', description: '了解合作方向、合作方式与伙伴标准', category: '合作', href: '/partners' },
  { title: '渠道合作', description: '了解内部与外部合伙合作方式', category: '合作', href: '/partner' },
  { title: '预约诊断', description: '提交需求并联系企业增长顾问', category: '联系', href: '/contact' },
]

const SEARCH_RESULTS = [
  ...STATIC_RESULTS,
  ...SERVICE_DETAILS.map((service) => ({
    title: service.title,
    description: service.modules.map((item) => item.title).join('、'),
    category: '核心服务',
    href: `/services/${service.slug}`,
  })),
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
        className={`fixed inset-0 top-[49px] z-40 bg-[#211d18]/15 backdrop-blur-[3px] transition-opacity duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <section
        aria-label="站内搜索"
        aria-hidden={!open}
        className={`pointer-events-none absolute inset-x-0 top-full z-50 origin-top px-3 pt-2 transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}
      >
        <div className="pointer-events-auto mx-auto max-w-[980px] overflow-hidden rounded-[24px] border border-[#6f5b43]/[0.12] bg-[#fcfbf7]/95 px-5 py-6 shadow-[0_28px_80px_rgba(54,42,29,.16),0_2px_8px_rgba(54,42,29,.05)] backdrop-blur-2xl md:px-8 md:py-8">
          <div className="flex items-center gap-4 border-b border-[#d9cebb] pb-5">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#f2eee5] text-[#795a2e]">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="11" cy="11" r="7" strokeWidth="1.7" />
              <path d="m16.2 16.2 4 4" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            </span>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              tabIndex={open ? 0 : -1}
              placeholder="搜索婵梦科技官网"
              className="min-w-0 flex-1 bg-transparent text-xl font-medium tracking-[-0.035em] text-[#211d18] outline-none placeholder:text-[#a39a8f] md:text-[28px]"
            />
            {query ? <button type="button" onClick={() => setQuery('')} className="rounded-full border border-[#d9cebb] px-3.5 py-1.5 text-xs font-medium text-[#795a2e] transition-colors hover:bg-[#f2eee5]">清除</button> : null}
          </div>
          <div className="mb-4 mt-6 flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#9b2f22]">{query ? '搜索结果' : '快速访问'}</p>
            <span className="text-[11px] text-[#9a9188]">{results.length} 项内容</span>
          </div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-x-3">
            {results.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={onClose}
                className="group rounded-[15px] border border-transparent px-4 py-3.5 transition-all duration-200 hover:border-[#d9cebb] hover:bg-white hover:shadow-[0_8px_24px_rgba(60,44,28,.06)] focus:border-[#d9cebb] focus:bg-white focus:outline-none"
              >
                <span className="flex items-center gap-2">
                  <i className="h-1.5 w-1.5 rounded-full bg-[#b58a4a] transition-colors group-hover:bg-[#9b2f22]" aria-hidden="true" />
                  <span className="text-[15px] font-semibold text-[#211d18] transition-colors group-hover:text-[#9b2f22]">{item.title}</span>
                </span>
                <span className="mt-1.5 block truncate pl-3.5 text-xs text-[#8a8178]">{item.category} · {item.description}</span>
              </Link>
            ))}
          </div>
          {results.length === 0 ? <p className="py-10 text-center text-sm text-[#8a8178]">没有找到相关内容，请尝试其他关键词。</p> : null}
        </div>
      </section>
    </>
  )
}
