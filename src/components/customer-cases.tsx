'use client'

import { motion } from 'framer-motion'

const CASES = [
  { title: '电动自行车品牌 · 北美出海', result: '品牌出海', detail: '覆盖海外内容运营与北美媒体投放，逐步建立自主获客渠道', highlight: '从渠道搭建到投放复盘', color: 'teal' as const },
  { title: '杭州家居集团 · 全域获客', result: '全域增长', detail: '整合内容矩阵与广告投放，持续优化线索获取和转化流程', highlight: '建立可复用获客链路', color: 'sky' as const },
  { title: '外贸企业 · 人才孵化', result: '人才支撑', detail: '根据岗位需求开展跨境运营培训与匹配，帮助团队补齐执行能力', highlight: '培训与岗位需求衔接', color: 'amber' as const },
  { title: '家电品牌 · 产业服务', result: '企业服务', detail: '围绕办公、资源连接与基础企业服务，降低业务落地的沟通成本', highlight: '增长之外的落地支撑', color: 'pink' as const },
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
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-500 mb-3">项目实践</p>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-slate-900">从问题出发，用交付建立信任</motion.h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">以下展示不同业务场景下的服务路径。具体数据和交付范围以双方确认的项目方案为准。</p>
        </div>
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
        <p className="text-center text-gray-400 text-xs mt-8">* 为保护客户商业信息，页面仅展示经脱敏处理的项目概览</p>
      </div>
    </section>
  )
}
