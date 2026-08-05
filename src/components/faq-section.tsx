'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  { q: 'GEO与传统SEO有什么区别？', a: 'SEO主要提升网页在搜索引擎结果中的排名；GEO更关注品牌内容能否被生成式AI理解、引用和推荐。两者并不冲突，企业应根据客户真实搜索与决策习惯进行组合布局。' },
  { q: '哪些企业适合先做AI可见度诊断？', a: '已经有明确业务与产品，但在AI搜索中很少被提及；品牌介绍分散、内容缺乏统一结构；或希望判断自身与竞品在AI推荐场景中差距的企业，都适合先完成初步诊断。' },
  { q: 'GEO项目多久能看到变化？', a: '效果周期取决于企业现有内容基础、行业竞争、平台收录和信源建设情况。项目会先明确阶段目标，并通过品牌提及、问题覆盖、引用来源、内容收录与咨询线索等指标持续复盘，不承诺未经验证的固定排名。' },
  { q: '服务是否包含内容创作和发布？', a: '可根据项目范围提供问题矩阵、企业知识库、内容策划、结构化文章、短视频内容和渠道分发建议。最终交付范围、发布渠道与数量以双方确认的项目方案为准。' },
  { q: '如何判断项目是否真正有效？', a: '我们会结合AI平台可见度、重点问题排名、内容引用率、信源覆盖、有效咨询和成交承接情况进行判断，而不是只看内容数量或单一曝光数据。' },
  { q: '服务如何收费？', a: '费用会根据企业现状、服务阶段、内容规模、覆盖渠道和交付周期综合确定。建议先提交业务情况与目标，完成初步判断后再给出清晰的服务范围和报价。' },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="mobile-home-section border-y border-[#ded5c7] bg-[#f4efe5] px-4 py-16 md:px-6 md:py-24" aria-label="常见问题">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 grid gap-4 border-t border-[#d9cebb] pt-6 md:mb-14 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#9a7440]">QUESTIONS & ANSWERS</p>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#211d18] md:text-5xl">开始合作前，客户常问的问题</motion.h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[#6d655b] md:justify-self-end md:text-base">把服务边界、判断方式和合作预期说清楚，再决定是否进入下一步沟通。</p>
        </div>
        <div className="border-y border-[#d9cebb]">
          {FAQS.map((item, i) => (
            <div key={i} className="border-b border-[#d9cebb] last:border-b-0">
              <button onClick={() => setOpen(open === i ? null : i)} className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors md:px-5 md:py-7 md:hover:bg-white/55">
                <span className="flex items-start gap-5">
                  <small className="pt-1 text-xs font-semibold text-[#9b2f22]">0{i + 1}</small>
                  <span className="text-base font-semibold tracking-[-0.02em] text-[#211d18] md:text-lg">{item.q}</span>
                </span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="ml-4 flex-shrink-0 text-2xl font-light text-[#9a7440]">+</motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.26 }} className="overflow-hidden">
                    <p className="max-w-3xl pb-7 pl-9 pr-4 text-sm leading-7 text-[#6d655b] md:pl-[4.7rem] md:text-base md:leading-8">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
