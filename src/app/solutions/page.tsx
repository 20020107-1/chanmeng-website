import type { Metadata } from 'next'
import Link from 'next/link'
import BrandMark from '@/components/brand-mark'
import BrandName from '@/components/brand-name'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: '解决方案',
  description: '婵梦科技为制造业工厂、外贸企业、本地商家、跨境电商、品牌出海企业提供定制化增长解决方案。',
  robots: { index: true, follow: true },
}

const SOLUTIONS = [
  {
    industry: '制造业工厂',
    icon: '🏭',
    pain: '有产能、有技术，但缺乏线上获客渠道，外贸订单来源单一，品牌知名度低',
    approach: '海外社媒运营 + Google/TikTok全球推广 + 跨境电商人才输送',
    value: '拓宽海外订单来源，建立自主品牌渠道，降低对单一客户的依赖',
  },
  {
    industry: '外贸企业',
    icon: '📦',
    pain: '传统B2B平台流量红利消退，获客成本持续上升，缺乏数字化营销能力',
    approach: '全域流量矩阵搭建 + AI内容营销 + 社交媒体运营',
    value: '降低获客成本，提升品牌海外影响力，实现从B2B到DTC的渠道拓展',
  },
  {
    industry: '本地商家',
    icon: '🏪',
    pain: '线下客流减少，不懂线上引流，抖音/小红书等新渠道无从下手',
    approach: '本地生活服务运营 + 短视频内容 + 精准投流',
    value: '提升区域品牌知名度，引流到店转化，建立私域用户池',
  },
  {
    industry: '跨境电商',
    icon: '🛒',
    pain: '平台竞争激烈，广告成本高，人才招聘难，供应链管理复杂',
    approach: '全平台运营 + AI降本增效 + 人才孵化输送 + 供应链优化',
    value: '多平台协同增长，降低运营成本，提供稳定的人才供给',
  },
  {
    industry: '品牌出海',
    icon: '🌍',
    pain: '从0到1不知道如何规划，海外市场信息不对称，本地化运营能力不足',
    approach: '品牌策略 + 独立站 + 全球媒体投放 + 海外仓物流',
    value: '系统化出海路径规划，降低试错成本，加速海外市场拓展',
  },
]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="apple-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark />
            <BrandName />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/services" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">核心服务</Link>
            <Link href="/contact" className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors">预约咨询</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">解决方案</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            针对不同行业的企业增长难题，提供定制化的解决方案
          </p>
        </div>

        <div className="space-y-6">
          {SOLUTIONS.map((sol) => (
            <section key={sol.industry} className="bg-white rounded-2xl border border-blue-100 p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl">
                    {sol.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{sol.industry}</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-rose-500 mb-2">业务痛点</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{sol.pain}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-blue-500 mb-2">解决方案</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{sol.approach}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-emerald-500 mb-2">客户价值</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{sol.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-10 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">您的企业属于哪个行业？</h2>
            <p className="text-gray-600 mb-6">联系我们，免费获取针对您行业的定制化增长方案建议。</p>
            <Link href="/contact" className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all">
              获取方案
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
