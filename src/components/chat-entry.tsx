'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function ChatEntry() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(!open)} aria-label="在线客服"
        className="fixed bottom-20 md:bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-110 transition-transform">
        {open ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-36 md:bottom-20 right-6 z-50 w-[320px] bg-white rounded-2xl border border-blue-200 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-4">
              <p className="text-white font-semibold">婵梦科技 · 在线咨询</p>
              <p className="text-blue-100 text-xs mt-0.5">我们将尽快回复您的消息</p>
            </div>
            <div className="p-5 h-[200px] flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <p className="text-gray-600 text-sm mb-1">您好，欢迎咨询婵梦科技</p>
              <p className="text-gray-400 text-xs">请留下您的联系方式，<br />我们的顾问将在 30 分钟内与您联系</p>
            </div>
            <div className="px-5 pb-5">
              <Link href="/contact" onClick={() => setOpen(false)} className="block w-full text-center py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition">进入预约诊断页面</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
