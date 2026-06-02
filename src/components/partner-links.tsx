'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

// ============ 合作伙伴数据（可自行增删改） ============
const PARTNER_LINKS = [
  { name: '阿里巴巴国际站', desc: '全球领先的B2B跨境电商平台', url: 'https://www.alibaba.com', emoji: '🌏' },
  { name: 'TikTok for Business', desc: '全球短视频营销与品牌推广', url: 'https://www.tiktok.com/business', emoji: '🎵' },
  { name: 'Shopify', desc: '全球领先的独立站建站平台', url: 'https://www.shopify.com', emoji: '🛒' },
  { name: 'EMMAS AI', desc: '出海社媒营销通用AI Agent', url: 'https://emmasai.com/', logo: '/emmasai-logo.webp' },
]

// ============ 淡入动画容器 ============
function FadeInView({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============ 主组件 ============
export default function PartnerLinks() {
  return (
    <section id="partner-links" className="py-16 md:py-24 px-4 md:px-6 bg-blue-50/40" aria-label="合作伙伴">
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-600"
        >
          合作伙伴 · 友情链接
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-500 text-sm mb-12"
        >
          以下为我们推荐与合作的行业平台，点击即可访问官网
        </motion.p>

        {/* 卡片网格 — 桌面4列 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PARTNER_LINKS.map((partner, i) => (
            <FadeInView key={partner.name} delay={i * 0.05}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-xl border border-blue-200 p-5 h-full
                           hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100/60
                           hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              >
                {/* 背景装饰 */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Logo 图标 */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100
                                flex items-center justify-center mb-4
                                group-hover:scale-110 group-hover:shadow-sm transition-all duration-300 overflow-hidden">
                  {partner.logo ? (
                    <img src={partner.logo} alt={partner.name} className="w-8 h-8 object-contain" />
                  ) : (
                    <span className="text-2xl">{partner.emoji}</span>
                  )}
                </div>

                {/* 公司信息 */}
                <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors text-sm">
                  {partner.name}
                </h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                  {partner.desc}
                </p>

                {/* 访问链接 */}
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium
                                 group-hover:bg-blue-100 group-hover:gap-1.5 transition-all">
                  访问官网
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            </FadeInView>
          ))}
        </div>

        {/* 申请友链提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-5 py-2.5 shadow-sm">
            <span className="text-gray-400 text-sm">想要互换友链？</span>
            <a href="#contact" className="text-blue-500 hover:text-blue-600 font-medium text-sm underline underline-offset-2 transition-colors">
              联系我们
            </a>
            <span className="text-blue-300">→</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
