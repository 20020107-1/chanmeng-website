'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const NAV_LINKS = [
  { name: '首页', href: '/' },
  { name: '关于我们', href: '/about' },
  { name: '核心服务', href: '/services' },
  { name: '解决方案', href: '/solutions' },
  { name: '渠道合作', href: '/partner' },
]

function FadeInView({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 主内容区 */}
        <div className="grid md:grid-cols-4 gap-10 py-14">
          {/* 公司信息 */}
          <FadeInView className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm">CM</div>
              <span className="text-lg font-bold text-white">婵梦科技</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              AI + 流量 + 人才 + 产业<br />企业全链路增长服务
            </p>
            <p className="text-gray-500 text-xs">
              杭州婵梦传媒科技有限公司
            </p>
          </FadeInView>

          {/* 快速导航 */}
          <FadeInView delay={0.1}>
            <h4 className="text-white font-semibold mb-4 text-sm">快速导航</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeInView>

          {/* 服务 */}
          <FadeInView delay={0.15}>
            <h4 className="text-white font-semibold mb-4 text-sm">核心服务</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><span className="hover:text-white transition-colors cursor-default">全域流量运营</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">AI企业效率提升</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">跨境电商人才孵化</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">品牌出海全案</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">企业综合服务</span></li>
            </ul>
          </FadeInView>

          {/* 联系与法律 */}
          <FadeInView delay={0.2}>
            <h4 className="text-white font-semibold mb-4 text-sm">联系方式</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>浙江省杭州市萧山区</li>
              <li><a href="mailto:contact@chanmeng.com" className="hover:text-white transition-colors">contact@chanmeng.com</a></li>
              <li><a href="tel:400-000-0000" className="hover:text-white transition-colors">400-000-0000</a></li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="inline-block px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-medium hover:bg-blue-500 transition-colors">
                预约咨询 →
              </Link>
            </div>
          </FadeInView>
        </div>

        {/* 分割线 */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 杭州婵梦传媒科技有限公司 · 保留所有权利
          </p>
          <div className="flex gap-6 text-xs">
            <Link href="/about" className="text-gray-500 hover:text-gray-300 transition-colors">关于我们</Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">隐私政策</Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">服务条款</Link>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">
              浙ICP备XXXXXXXX号
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
