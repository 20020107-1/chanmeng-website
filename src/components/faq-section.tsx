'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  { q: '婵梦科技是做什么的？', a: '婵梦科技是一家AI驱动的全链路增长服务商，面向企业与个人IP连接内容生产、精准获客、商业转化、客户承接与持续增长。' },
  { q: '核心服务有哪些？', a: '核心服务包括AI搜索获客、AI内容营销、全域流量运营和商业转化与增长。' },
  { q: '服务如何收费？', a: '提供分级服务方案：基础版（基础服务+AI工具）、成长版（流量+培训+基础运营）、企业版（专属团队+全案陪跑）、定制版（按需报价）。具体价格以双方签署的合同为准。' },
  { q: '如何与婵梦科技合作？', a: '合作模式包括城市服务商、业务合伙人、生态合作伙伴三种。具体合作条件与权益以双方签署的正式合作协议为准。投资有风险，合作需谨慎。' },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-16 md:py-24 px-4 md:px-6 bg-blue-50/40" aria-label="常见问题">
      <div className="max-w-3xl mx-auto">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-600">常见问题</motion.h2>
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center px-6 py-4 text-left group hover:bg-blue-50/50 transition-colors">
                <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{item.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-blue-400 text-xl ml-4 flex-shrink-0">+</motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-blue-50 pt-4">{item.a}</p>
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
