'use client'

import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import Link from 'next/link'
import { NEWS_ARTICLES } from '@/data/news'

const CATEGORIES = ['全部', ...Array.from(new Set(NEWS_ARTICLES.map((article) => article.category)))]

function formatDate(date: string) {
  const [year, month, day] = date.split('.').map(Number)
  return `${year}年${month}月${day}日`
}

export default function NewsContent() {
  const [category, setCategory] = useState('全部')
  const [searchText, setSearchText] = useState('')
  const [query, setQuery] = useState('')

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQuery(searchText.trim())
  }

  const articles = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('zh-CN')
    return NEWS_ARTICLES.filter((article) => {
      const inCategory = category === '全部' || article.category === category
      const inSearch = !keyword || `${article.title} ${article.summary} ${article.lead}`.toLocaleLowerCase('zh-CN').includes(keyword)
      return inCategory && inSearch
    })
  }, [category, query])

  const featured = articles[0]
  const rest = articles.slice(1)
  const hot = NEWS_ARTICLES.slice(0, 4)

  return (
    <main className="bg-[#f5f5f7] pb-24 text-[#1d1d1f]">
      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:py-14">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.12em] text-[#E2492F]">CHANMENG NEWS</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">新闻与观点</h1>
              <p className="mt-4 text-base leading-7 text-gray-500 md:text-lg">聚合公司动态、AI搜索、内容营销与商业增长方法。</p>
            </div>
            <form onSubmit={submitSearch} role="search" className="flex w-full max-w-2xl items-center rounded-full border-2 border-[#E2492F] bg-white p-1.5 shadow-[0_8px_30px_rgba(226,73,47,.10)]">
              <svg className="ml-4 h-5 w-5 flex-none text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" strokeWidth="1.7" />
                <path d="m16 16 4.2 4.2" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <input value={searchText} onChange={(event) => setSearchText(event.target.value)} aria-label="搜索新闻" placeholder="搜索新闻、GEO、内容营销" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[15px] outline-none placeholder:text-gray-400" />
              <button type="submit" className="rounded-full bg-[#E2492F] px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#c93a26] active:scale-[0.97] focus:outline-none">搜索</button>
            </form>
          </div>
        </div>
      </section>

      <div className="sticky top-12 z-30 border-b border-black/[0.05] bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3">
          {CATEGORIES.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${category === item ? 'bg-[#121212] font-medium text-white' : 'text-gray-600 hover:bg-[#f2efe9] hover:text-[#E2492F]'}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      {true ? (
        <section id="news-results" className="mx-auto max-w-7xl px-5 pt-10">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-[#E2492F]">{query ? `关键词：${query}` : category === '全部' ? '全部内容' : `分类：${category}`}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{query ? '新闻搜索结果' : '新闻'}</h2>
            </div>
            {query ? <button type="button" onClick={() => { setSearchText(''); setQuery('') }} className="self-start rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm ring-1 ring-black/[0.06] hover:text-[#E2492F]">清除搜索</button> : <span className="text-sm text-gray-400">共 {articles.length} 篇内容</span>}
          </div>
          <div className="overflow-hidden rounded-[24px] bg-white px-5 shadow-sm ring-1 ring-black/[0.05] md:px-8">
            <div className="hidden grid-cols-[210px_210px_minmax(0,1fr)] border-b border-gray-200 py-5 text-sm font-medium text-gray-500 md:grid">
              <span>日期</span><span>类别</span><span>标题</span>
            </div>
            {articles.length ? articles.map((article) => (
              <Link key={article.slug} href={`/news/${article.slug}`} className="group grid gap-2 border-b border-gray-200 py-5 last:border-0 md:grid-cols-[210px_210px_minmax(0,1fr)] md:items-center">
                <span className="text-sm text-gray-500 md:text-base">{formatDate(article.date)}</span>
                <span className="text-sm text-gray-500 md:text-base">{article.category}</span>
                <span className="text-base font-medium text-[#1d1d1f] group-hover:text-[#E2492F] group-hover:underline md:text-[17px]">{article.title}</span>
              </Link>
            )) : (
              <div className="px-4 py-20 text-center text-gray-500">没有找到相关文章，请尝试其他关键词。</div>
            )}
          </div>
        </section>
      ) : (
        <>
      <section id="news-results" className="mx-auto max-w-7xl px-5 pt-7">
        {featured ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
            <Link href={`/news/${featured.slug}`} className="group relative min-h-[430px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#161616] via-[#101010] to-black p-8 text-white shadow-[0_18px_55px_rgba(0,0,0,.28)] md:p-12">
              <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[55px] border-white/10 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-[-100px] right-[18%] h-64 w-64 rounded-full bg-[#E2492F]/25 blur-2xl" />
              <div className="relative flex h-full max-w-3xl flex-col justify-between">
                <div><span className="rounded-full bg-white/18 px-3 py-1.5 text-xs font-medium backdrop-blur">{featured.category} · {featured.date}</span></div>
                <div>
                  <p className="mb-3 text-sm font-medium text-white/75">本期重点</p>
                  <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] md:text-6xl">{featured.title}</h2>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 md:text-lg">{featured.summary}</p>
                  <span className="mt-7 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#E2492F]">阅读全文</span>
                </div>
              </div>
            </Link>

            <aside className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/[0.04]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-[-0.03em]">热门内容</h2>
                <span className="text-xs text-[#E2492F]">实时推荐</span>
              </div>
              <div className="mt-5 divide-y divide-gray-100">
                {hot.map((article, index) => (
                  <Link key={article.slug} href={`/news/${article.slug}`} className="group flex gap-4 py-4 first:pt-2">
                    <span className={`text-2xl font-semibold ${index < 3 ? 'text-[#E2492F]' : 'text-gray-300'}`}>{String(index + 1).padStart(2, '0')}</span>
                    <div className="min-w-0"><p className="line-clamp-2 text-[15px] font-medium leading-6 group-hover:text-[#E2492F]">{article.title}</p><p className="mt-1 text-xs text-gray-400">{article.category} · {article.date}</p></div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        ) : (
          <div className="rounded-[28px] bg-white px-6 py-20 text-center text-gray-500">没有找到相关文章，请尝试其他关键词。</div>
        )}
      </section>

      {rest.length ? (
        <section className="mx-auto max-w-7xl px-5 pt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">为你推荐</h2>
            <span className="text-sm text-gray-400">共 {articles.length} 篇内容</span>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, index) => (
              <Link key={article.slug} href={`/news/${article.slug}`} className="group flex min-h-[310px] flex-col justify-between overflow-hidden rounded-[24px] bg-white p-7 shadow-sm ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,.09)]">
                <div>
                  <div className="flex items-center justify-between"><span className="rounded-full bg-[#f9e9e5] px-3 py-1.5 text-xs font-medium text-[#E2492F]">{article.category}</span><span className="text-xs text-gray-400">{article.date}</span></div>
                  <h3 className="mt-7 text-2xl font-semibold leading-tight tracking-[-0.035em] group-hover:text-[#E2492F]">{article.title}</h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-500">{article.summary}</p>
                </div>
                <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-5"><span className="text-sm font-medium text-[#E2492F]">阅读全文</span><span className="text-xs text-gray-300">NO.{String(index + 2).padStart(2, '0')}</span></div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
        </>
      )}
    </main>
  )
}
