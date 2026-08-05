'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import BrandName from '@/components/brand-name'
import { SERVICE_DETAILS } from '@/data/services'
import footerStyles from './footer.module.css'

const NAV_LINKS = [
  { name: '首页', href: '/' },
  { name: '关于我们', href: '/about' },
  { name: '核心服务', href: '/services' },
  { name: 'GEO增长系统', href: '/geo-system' },
  { name: '服务方案', href: '/pricing' },
  { name: '行业方案', href: '/solutions' },
  { name: '客户案例', href: '/cases' },
  { name: '新闻动态', href: '/news' },
  { name: '合作伙伴', href: '/partners' },
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
    <footer className={`${footerStyles.footer} text-[#d7cdbd]`} role="contentinfo">
      <div className={`${footerStyles.inner} max-w-7xl mx-auto px-4 md:px-6`}>
        {/* 主内容区 */}
        <div className={`${footerStyles.mainGrid} grid gap-0 py-14 md:grid-cols-[1.2fr_.8fr_1fr_1.35fr]`}>
          {/* 公司信息 */}
          <FadeInView className={`${footerStyles.column} md:col-span-1`}>
            <div className="footer-brand mb-4 flex min-w-0 items-center gap-2.5">
              <span className="relative block w-14 h-9 translate-x-[5px] -translate-y-[4px] overflow-hidden flex-shrink-0" aria-hidden="true">
                <img
                  src={`${basePath}/chanmeng-logo-light.png`}
                  alt=""
                  className="absolute inset-x-0 top-0 w-full h-auto"
                />
              </span>
              <BrandName />
            </div>
            <p className={footerStyles.brandStatement}>
              AI赋能 · 实干共创<br />企业增长全链路服务
            </p>
            <p className={footerStyles.companyName}>
              杭州婵梦传媒科技有限公司
            </p>
          </FadeInView>

          {/* 快速导航 */}
          <FadeInView className={footerStyles.column} delay={0.1}>
            <h4 className={`${footerStyles.heading} font-semibold mb-4 text-sm`}>快速导航</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={`${footerStyles.link} text-sm`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeInView>

          {/* 服务 */}
          <FadeInView className={footerStyles.column} delay={0.15}>
            <h4 className={`${footerStyles.heading} font-semibold mb-4 text-sm`}>核心服务</h4>
            <ul className={`${footerStyles.secondaryList} space-y-2.5 text-sm`}>
              {SERVICE_DETAILS.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={footerStyles.link}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </FadeInView>

          {/* 联系与法律 */}
          <FadeInView className={footerStyles.column} delay={0.2}>
            <h4 className={`${footerStyles.heading} font-semibold mb-4 text-sm`}>联系方式</h4>
            <ul className={`${footerStyles.contactList} space-y-2.5 text-sm`}>
              <li className="max-w-[260px] leading-6">浙江省杭州市萧山区新街街道垦辉六路799号2号楼901-1室</li>
              <li>咨询电话：<a href="tel:19812347986" className={footerStyles.inlineLink}>19812347986</a></li>
              <li>合作电话：<a href="tel:19812347986" className={footerStyles.inlineLink}>19812347986</a></li>
              <li className="whitespace-nowrap text-xs">企微客服邮箱：<a href="mailto:yaoyuan@chanmengtech.cn" className={footerStyles.inlineLink}>yaoyuan@chanmengtech.cn</a></li>
              <li className="whitespace-nowrap text-xs">企微商务邮箱：<a href="mailto:wangyuyin@chanmengtech.cn" className={footerStyles.inlineLink}>wangyuyin@chanmengtech.cn</a></li>
              <li>工作时间 9:00—18:00</li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className={`${footerStyles.cta} inline-block rounded-full px-4 py-2 text-xs font-medium text-white`}>
                预约咨询
              </Link>
            </div>
          </FadeInView>
        </div>

        {/* 分割线 */}
        <div className={`${footerStyles.bottomBar} py-6 flex flex-col sm:flex-row justify-between items-center gap-4`}>
          <p className={footerStyles.copyright}>
            © 2026 杭州婵梦传媒科技有限公司 · 保留所有权利
          </p>
          <div className="flex gap-6 text-xs">
            <Link href="/about" className={footerStyles.legalLink}>关于我们</Link>
            <Link href="/privacy" className={footerStyles.legalLink}>隐私政策</Link>
            <Link href="/terms" className={footerStyles.legalLink}>服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
