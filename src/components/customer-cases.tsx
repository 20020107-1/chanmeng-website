'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CASE_STUDIES } from '@/data/cases'

const colorMap = {
  blue:  { border: 'border-blue-200',  hoverBorder: 'hover:border-blue-400',  accent: 'text-blue-600',  badge: 'bg-blue-50 text-blue-700' },
  teal:  { border: 'border-teal-200',  hoverBorder: 'hover:border-teal-400',  accent: 'text-teal-600',  badge: 'bg-teal-50 text-teal-700' },
  amber: { border: 'border-amber-200', hoverBorder: 'hover:border-amber-400', accent: 'text-amber-600', badge: 'bg-amber-50 text-amber-700' },
  slate: { border: 'border-slate-200', hoverBorder: 'hover:border-slate-400', accent: 'text-slate-600', badge: 'bg-slate-50 text-slate-700' },
}

export default function CustomerCases() {
const featuredCases = [
    ...CASE_STUDIES.filter((item) => item.category === 'GEO优化').slice(0, 4),
]

  return (
    <section id="cases" className="py-16 md:py-24 px-4 md:px-6 bg-white" aria-label="客户案例">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-base font-semibold tracking-[0.08em] text-blue-600 mb-3">项目实践</p>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-slate-900">从问题出发，用交付建立信任</motion.h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">以下展示不同业务场景下的服务路径。具体数据和交付范围以双方确认的项目方案为准。</p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCases.map((c, i) => {
            const clr = colorMap[c.accent]
            return (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link href={`/cases/${c.slug}`} className={`group block h-full bg-white rounded-xl border ${clr.border} ${clr.hoverBorder} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}>
                <div className={`text-xs font-medium mb-3 ${clr.badge} inline-block px-2.5 py-1 rounded-full`}>{c.category}</div>
                <h4 className="font-semibold text-gray-800 mb-3">{c.title}</h4>
                <p className={`text-lg font-bold ${clr.accent} mb-2`}>{c.subtitle}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{c.overview}</p>
                <span className="mt-5 inline-flex text-xs text-blue-600">查看案例</span>
              </Link>
              </motion.div>
            )
          })}
        </div>
        <div className="mt-10 text-center"><Link href="/cases" className="text-sm font-medium text-blue-600 hover:text-blue-700">查看全部案例</Link></div>
        <p className="text-center text-gray-400 text-xs mt-8">* 为保护客户商业信息，页面仅展示经脱敏处理的项目概览</p>
      </div>
    </section>
  )
}
