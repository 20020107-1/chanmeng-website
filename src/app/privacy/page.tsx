import type { Metadata } from 'next'
import Link from 'next/link'
import BrandMark from '@/components/brand-mark'
import BrandName from '@/components/brand-name'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: '隐私政策',
  description: '婵梦科技隐私政策 — 我们如何收集、使用和保护您的个人信息。',
  robots: { index: true, follow: true },
}

const SECTIONS = [
  {
    title: '一、信息收集',
    items: [
      '当您通过本站表单提交咨询时，我们会收集您的公司名称、联系电话和需求描述。',
      '当您注册成为合伙人或入驻产业园时，我们会收集必要的企业信息和身份资料。',
      '我们使用 Cookie 和类似技术来改善您的浏览体验和分析网站流量。',
    ],
  },
  {
    title: '二、信息使用',
    items: [
      '为您提供所请求的产品或服务。',
      '与您沟通，包括回复您的咨询和发送服务相关通知。',
      '改善我们的网站和服务，分析使用趋势和用户行为。',
      '遵守适用的法律法规要求。',
    ],
  },
  {
    title: '三、信息共享',
    items: [
      '我们不会向第三方出售您的个人信息。',
      '我们可能在以下情况下共享您的信息：获得您的同意、法律要求、与可信的服务提供商合作（如云服务商）。',
      '所有第三方服务提供商均受保密协议约束。',
    ],
  },
  {
    title: '四、数据安全',
    items: [
      '我们采取合理的物理、电子和管理措施来保护您的个人信息免遭未经授权的访问、使用或泄露。',
      '所有表单提交均通过加密连接（HTTPS）传输。',
    ],
  },
  {
    title: '五、Cookie 政策',
    items: [
      '本网站使用必要的 Cookie 以确保网站正常运行。',
      '我们使用分析型 Cookie 来了解访问者如何与网站互动，以便改进服务。',
      '您可以通过浏览器设置管理或禁用 Cookie。',
    ],
  },
  {
    title: '六、您的权利',
    items: [
      '访问我们持有的您的个人信息。',
      '更正不准确的信息。',
      '要求删除您的个人信息（在法律允许的范围内）。',
      '撤回同意（在适用的情况下）。',
    ],
  },
  {
    title: '七、联系我们',
    items: [
      '如果您对本隐私政策有任何疑问，或希望行使您的数据权利，请通过以下方式联系我们：',
      '企微邮箱：yaoyuan@chanmengtech.cn',
      '地址：浙江省杭州市萧山区',
    ],
  },
  {
    title: '八、政策更新',
    items: [
      '我们可能会不时更新本隐私政策。更新后的版本将发布在本页面，并注明最后更新日期。',
      '最后更新日期：2026年5月',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航条 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark />
            <BrandName />
          </Link>
          <Link href="/#contact" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            联系我们
          </Link>
        </div>
      </nav>

      {/* 内容区 */}
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">隐私政策</h1>
        <p className="text-gray-500 text-sm mb-12">
          杭州婵梦传媒科技有限公司（以下简称"婵梦科技"或"我们"）深知个人信息对您的重要性。本隐私政策说明了我们如何收集、使用和保护您的信息。
        </p>
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">{s.title}</h2>
              <ul className="space-y-2 text-gray-600 leading-relaxed">
                {s.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-400 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
