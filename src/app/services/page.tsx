import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '核心服务',
  description: '婵梦科技提供全域流量运营、AI企业效率提升、跨境电商人才孵化、品牌出海全案、企业综合服务五大核心业务。',
  robots: { index: true, follow: true },
}

const SERVICES = [
  {
    title: '全域流量运营',
    icon: '📡',
    subtitle: '抖音 / TikTok / Google / Facebook 全平台精准获客',
    items: [
      'AI批量生成短视频内容，降低内容生产成本',
      '基于数据的精准投放，提升广告转化效率',
      '账号诊断与优化，账号健康度持续提升',
      '从曝光到转化，全链路流量运营服务',
    ],
  },
  {
    title: 'AI企业效率提升',
    icon: '🤖',
    subtitle: '用AI重新定义企业运营效率',
    items: [
      'AI智能客服系统，降低客服人力成本',
      'AI数据分析与经营洞察，辅助决策',
      'AI内容生成，批量产出营销素材',
      'AI营销自动化，提升线索转化效率',
    ],
  },
  {
    title: '跨境电商人才孵化',
    icon: '🎓',
    subtitle: '从0到1系统培养跨境全岗位人才',
    items: [
      '运营、投流、客服、选品全岗位培训',
      '理论授课+实操训练+真实项目实战',
      '点对点人才输送，匹配企业需求',
      '持续跟踪辅导，确保人才落地能力',
    ],
  },
  {
    title: '品牌出海全案',
    icon: '🌏',
    subtitle: '从品牌定位到全球市场一站式服务',
    items: [
      '品牌定位与市场策略规划',
      '独立站搭建与优化',
      '全球媒体投放（覆盖北美、欧洲、东南亚）',
      '海外仓物流与清关一站式对接',
    ],
  },
  {
    title: '企业综合服务',
    icon: '🏢',
    subtitle: '财税、政策申报、供应链等配套服务',
    items: [
      '基础财税服务与税务筹划',
      '政府政策解读与补贴申报辅导',
      '供应链资源对接与优化',
      '企业商学院搭建与团队培训',
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-white">CM</div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">婵梦科技</span>
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
            五大核心业务板块，覆盖企业从获客到交付的全部增长需求
          </p>
        </div>

        {/* 服务卡片 */}
        <div className="space-y-8">
          {SERVICES.map((svc, i) => (
            <section key={svc.title} className="bg-white rounded-2xl border border-blue-100 p-8 md:p-10 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
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
              联系我们 →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-8 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/" className="hover:text-gray-300 transition-colors">首页</Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors">关于我们</Link>
            <span className="text-gray-300">核心服务</span>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">隐私政策</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">服务条款</Link>
          </div>
          <p>© 2026 杭州婵梦传媒科技有限公司 · 保留所有权利</p>
        </div>
      </footer>
    </div>
  )
}
