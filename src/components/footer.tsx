'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import BrandName from '@/components/brand-name'

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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 主内容区 */}
        <div className="grid md:grid-cols-4 gap-10 py-14">
          {/* 公司信息 */}
          <FadeInView className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative block w-14 h-9 translate-x-[5px] -translate-y-[4px] overflow-hidden flex-shrink-0" aria-hidden="true">
                <img
                  src={`${basePath}/chanmeng-logo-dark.png`}
                  alt=""
                  className="absolute inset-x-0 top-0 w-full h-auto"
                />
              </span>
              <BrandName />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              AI驱动 · 合伙共创<br />企业增长全链路平台
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
              <li><Link href="/services#commercial-growth" className="hover:text-white transition-colors">商业增长全案</Link></li>
              <li><Link href="/services#ai-tools" className="hover:text-white transition-colors">AI获客工具</Link></li>
              <li><Link href="/services#tiktok-b2b" className="hover:text-white transition-colors">TikTok B2B品牌出海</Link></li>
              <li><Link href="/services#cross-border-training" className="hover:text-white transition-colors">跨境电商培训</Link></li>
              <li><Link href="/services#ai-commerce" className="hover:text-white transition-colors">AI跨境带货</Link></li>
            </ul>
          </FadeInView>

          {/* 联系与法律 */}
          <FadeInView delay={0.2}>
            <h4 className="text-white font-semibold mb-4 text-sm">联系方式</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>浙江省杭州市萧山区</li>
              <li>咨询电话：<a href="tel:19812347986" className="hover:text-white transition-colors">19812347986</a></li>
              <li>合作电话：<a href="tel:19812347986" className="hover:text-white transition-colors">19812347986</a></li>
              <li className="whitespace-nowrap text-xs">企微客服邮箱：<a href="mailto:yaoyuan@chanmengtech.cn" className="hover:text-white transition-colors">yaoyuan@chanmengtech.cn</a></li>
              <li className="whitespace-nowrap text-xs">企微商务邮箱：<a href="mailto:wangyuyin@chanmengtech.cn" className="hover:text-white transition-colors">wangyuyin@chanmengtech.cn</a></li>
              <li>工作时间 9:00—18:00</li>
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
          </div>
        </div>
      </div>
    </footer>
  )
}
