'use client'

import { motion } from 'framer-motion'

const CASES = [
  { title: '电动自行车品牌 · 北美出海', result: '6个月', detail: '品牌出海全案服务，覆盖独立站搭建与北美媒体投放', highlight: '投放ROAS稳定提升', color: 'teal' as const },
  { title: '杭州家居集团 · 全域获客', result: '3个月', detail: '全域流量运营+AI内容矩阵+独立站搭建', highlight: '获客成本持续优化', color: 'sky' as const },
  { title: '外贸企业 · 人才孵化', result: '3个月', detail: '跨境电商人才培训与点对点输送，匹配企业岗位需求', highlight: '人才留存率持续改善', color: 'amber' as const },
  { title: '家电品牌 · 产业园入驻', result: '入驻半年', detail: '零房租产业园入驻，享受12项基础服务', highlight: '办公成本显著降低', color: 'pink' as const },
]

const colorMap = {
  teal:  { border: 'border-teal-200',  hoverBorder: 'hover:border-teal-400',  accent: 'text-teal-600',  badge: 'bg-teal-50 text-teal-700' },
  sky:   { border: 'border-sky-200',   hoverBorder: 'hover:border-sky-400',   accent: 'text-sky-600',   badge: 'bg-sky-50 text-sky-700' },
  amber: { border: 'border-amber-200', hoverBorder: 'hover:border-amber-400', accent: 'text-amber-600', badge: 'bg-amber-50 text-amber-700' },
  pink:  { border: 'border-pink-200',  hoverBorder: 'hover:border-pink-400',  accent: 'text-pink-600',  badge: 'bg-pink-50 text-pink-700' },
}

export default function CustomerCases() {
  return (
    <section id="cases" className="py-16 md:py-24 px-4 md:px-6 bg-white" aria-label="客户案例">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-600">客户案例</motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CASES.map((c, i) => {
            const clr = colorMap[c.color]
            return (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-xl border ${clr.border} ${clr.hoverBorder} p-6 shadow-sm transition-all duration-300 hover:shadow-md`}>
                <div className={`text-xs font-medium mb-3 ${clr.badge} inline-block px-2.5 py-1 rounded-full`}>{c.result}</div>
                <h4 className="font-semibold text-gray-800 mb-3">{c.title}</h4>
                <p className={`text-lg font-bold ${clr.accent} mb-2`}>{c.highlight}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{c.detail}</p>
              </motion.div>
            )
          })}
        </div>
        <p className="text-center text-gray-400 text-xs mt-8">* 案例均已脱敏处理，具体数据以实际合作为准</p>
      </div>
    </section>
  )
}
