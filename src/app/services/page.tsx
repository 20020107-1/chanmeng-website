import type { Metadata } from 'next'
import Link from 'next/link'
import BrandMark from '@/components/brand-mark'
import BrandName from '@/components/brand-name'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: '核心服务',
  description: '婵梦科技以商业增长全案为根基，提供AI获客工具、TikTok B2B品牌出海、跨境电商培训与AI跨境带货服务。',
  robots: { index: true, follow: true },
}

const SERVICES = [
  {
    id: 'commercial-growth',
    title: '商业增长全案',
    icon: '📡',
    subtitle: '从流量获客到商业转化，建立可持续增长路径',
    items: [
      '短视频IP与内容获客体系',
      '精准投流与GEO增长支持',
      '商业转化与增长模式梳理',
      '从诊断、方案到执行复盘的全链路服务',
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI获客工具',
    icon: '🤖',
    subtitle: '让AI参与获客、转化与交付的关键流程',
    items: [
      'AI外呼与客户触达工具',
      '无人直播与内容自动化能力',
      'GEO精准获客与定向推广',
      '数字员工与企业流程提效',
    ],
  },
  {
    id: 'tiktok-b2b',
    title: 'TikTok B2B品牌出海',
    icon: '🌏',
    subtitle: '面向批发商、代理商、经销商与采购商的品牌出海服务',
    items: [
      '海外品牌定位与内容包装',
      'TikTok B2B渠道搭建',
      '海外市场推广与客户触达',
      '持续运营与阶段性复盘',
    ],
  },
  {
    id: 'cross-border-training',
    title: '跨境电商培训',
    icon: '🎓',
    subtitle: '覆盖TikTok Shop、美客多与虾皮的实操成长路径',
    items: [
      '从0到1的平台认知与开店流程',
      '运营、投流、客服与选品训练',
      '理论学习与真实项目实操结合',
      '持续辅导与岗位能力提升',
    ],
  },
  {
    id: 'ai-commerce',
    title: 'AI跨境带货',
    icon: '🛒',
    subtitle: '用AI大模型提升跨境内容与带货效率',
    items: [
      'AI辅助选品与内容生产',
      '跨境带货素材规模化制作',
      '数据反馈与内容持续优化',
      'AI工具与跨境业务场景结合',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark />
            <BrandName />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/solutions" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">解决方案</Link>
            <Link href="/#contact" className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors">预约咨询</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">核心服务</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            以商业增长全案为根基，用AI工具、出海服务与人才成长能力支撑业务落地
          </p>
        </div>

        {/* 服务卡片 */}
        <div className="space-y-8">
          {SERVICES.map((svc, i) => (
            <section id={svc.id} key={svc.title} className="scroll-mt-24 bg-white rounded-2xl border border-blue-100 p-8 md:p-10 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-3xl">
                    {svc.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{svc.title}</h2>
                  <p className="text-blue-600 font-medium text-sm mb-4">{svc.subtitle}</p>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {svc.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <section className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-10 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">需要定制化服务方案？</h2>
            <p className="text-gray-600 mb-6">点击下方按钮，告诉我们您的需求，我们将为您匹配最合适的方案。</p>
            <Link href="/contact" className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all">
              联系我们
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
