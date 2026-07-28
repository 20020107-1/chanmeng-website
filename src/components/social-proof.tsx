'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  '某家居品牌刚刚签约进阶版服务', '某企业完成AI搜索问题矩阵部署', '杭州萧山产业园新增3家企业入驻',
  '某本地品牌完成私域承接流程升级', '某企业内容运营体系进入执行阶段',
]

export default function SocialProof() {
  const [msg, setMsg] = useState<{ text: string; id: number } | null>(null)
  const [id, setId] = useState(0)
  useEffect(() => {
    const show = () => { const text = MESSAGES[id % MESSAGES.length]; setMsg({ text, id }); setId((p) => p + 1); setTimeout(() => setMsg(null), 4000) }
    show(); const interval = setInterval(show, 12000); return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-32 md:bottom-20 left-4 z-50">
      <AnimatePresence>
        {msg && (
          <motion.div key={msg.id} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            className="bg-white border border-blue-200 rounded-xl px-4 py-3 shadow-lg max-w-[260px]">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <p className="text-gray-600 text-xs leading-relaxed">{msg.text}</p>
                <p className="text-gray-400 text-[10px] mt-1">刚刚</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
