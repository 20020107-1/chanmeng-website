import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: '核心服务',
  description: '婵梦科技提供AI搜索获客、AI内容营销、全域流量运营与商业转化增长服务。',
  robots: { index: true, follow: true },
}

const SERVICES = [
  {
    id: 'ai-search',
    href: '/services/ai-search-acquisition',
    title: 'AI搜索获客',
    icon: 'search',
    subtitle: '让品牌在AI搜索与智能推荐场景中更容易被发现、理解与选择',
    items: [
      'GEO生成式引擎优化',
      'AEO答案引擎优化',
      'LLMO大模型内容优化',
      'AI品牌曝光与精准获客',
      '自研获客系统部署与持续迭代',
    ],
  },
  {
    id: 'ai-content',
    href: '/services/ai-content-marketing',
    title: 'AI内容营销',
    icon: 'content',
    subtitle: '以AI提升内容生产效率，让专业能力转化为持续传播的内容资产',
    items: [
      '爆款内容策划与生产',
      '短视频内容运营',
      '直播内容策划',
      '个人IP打造',
      '企业品牌内容建设',
    ],
  },
  {
    id: 'omnichannel-growth',
    href: '/services/omnichannel-traffic-operations',
    title: '全域流量运营',
    icon: 'traffic',
    subtitle: '整合自然流量、付费流量与私域承接，构建完整客户获取体系',
    items: [
      '自然流量增长',
      '付费流量投放',
      '短视频与直播获客',
      '公域流量获取与私域沉淀',
      '精准客户筛选',
    ],
  },
  {
    id: 'commercial-conversion',
    href: '/services/commercial-conversion-growth',
    title: '商业转化与增长',
    icon: 'growth',
    subtitle: '把流量连接到成交、承接与复购，让增长真正进入经营结果',
    items: [
      '商业定位与模式设计',
      '产品及盈利体系规划',
      '线上线下销讲',
      '私域成交与客户承接',
      '招商、融资与项目路演',
      '组织、绩效及执行体系建设',
    ],
  },
]

function ServiceIcon({ name }: { name: string }) {
  const common = {
    width: 27,
    height: 27,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.65,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (name === 'search') {
    return <svg {...common}><circle cx="10.5" cy="10.5" r="5.75" /><path d="m15 15 4.25 4.25" /><path d="M7.6 10.5h5.8M10.5 7.6v5.8" opacity=".55" /></svg>
  }
  if (name === 'content') {
    return <svg {...common}><path d="M7.5 3.75h6.7l3.8 3.8v12.7H7.5z" /><path d="M14.2 3.75v3.8H18M10 11h5.5M10 14.5h5.5M10 18h3.5" /></svg>
  }
  if (name === 'traffic') {
    return <svg {...common}><circle cx="12" cy="12" r="2.2" /><circle cx="12" cy="12" r="6.1" opacity=".7" /><path d="M12 2.5v3.4M21.5 12h-3.4M12 21.5v-3.4M2.5 12h3.4" /></svg>
  }
  return <svg {...common}><path d="M4 18.5 9.1 13l3.4 3.1L20 7.5" /><path d="M14.8 7.5H20v5.2" /></svg>
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader active="/services" />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">核心服务</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            以AI技术和自研系统为底座，连接内容、流量、转化、承接与持续增长
          </p>
        </div>

        {/* 服务卡片 */}
        <div className="space-y-8">
          {SERVICES.map((svc, i) => (
            <section id={svc.id} key={svc.title} className="scroll-mt-24 bg-white rounded-2xl border border-blue-100 p-8 md:p-10 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-blue-100 bg-[#f2f7ff] text-blue-600 shadow-[inset_0_1px_0_rgba(255,255,255,.85)]">
                    <ServiceIcon name={svc.icon} />
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
                  <Link href={svc.href} className="mt-7 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-500">查看服务详情</Link>
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
