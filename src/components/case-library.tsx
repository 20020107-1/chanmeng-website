'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { CaseStudy } from '@/data/cases'

export default function CaseLibrary({ cases }: { cases: CaseStudy[] }) {
  const categories = useMemo(() => ['全部', ...Array.from(new Set(cases.map((item) => item.category)))], [cases])
  const [active, setActive] = useState('全部')
  const visible = active === '全部' ? cases : cases.filter((item) => item.category === active)

  return (
    <section id="case-library" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-24 pt-12 md:pt-16">
      <div className="sticky top-12 z-20 -mx-5 border-y border-black/[0.05] bg-[#f5f5f7]/90 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto [scrollbar-width:none]">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                active === category ? 'bg-[#1d1d1f] text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300">
        {visible.map((item, index) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            className="group grid gap-3 border-b border-gray-300 py-6 transition-colors hover:bg-white md:grid-cols-[82px_minmax(0,1fr)_290px] md:items-center md:px-4"
          >
            <span className="text-xl font-semibold tracking-[-0.025em] text-[#E2492F] md:text-2xl">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p className="text-xs text-gray-400">{item.category} · {item.industry}</p>
              <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f] md:text-2xl">{item.title}</h2>
            </div>
            <p className="text-xs leading-5 text-gray-500 md:text-right">{item.scope}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
