import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import { SOLUTION_ARTICLES } from '@/data/solutions'

export const metadata: Metadata = {
  title: '行业方案',
  description: '婵梦科技围绕商业诊断、产品内容、GEO获客、短视频增量、成交转化与招商增长提供结构化企业增长方案。',
  robots: { index: true, follow: true },
}

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader active="/solutions" />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">行业方案</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            针对不同行业的企业增长难题，提供定制化的解决方案
          </p>
        </div>

        <div className="space-y-6">
          {SOLUTION_ARTICLES.map((sol) => (
            <Link id={sol.id} href={`/solutions/${sol.slug}`} key={sol.industry} className="group block scroll-mt-24 rounded-2xl border border-blue-100 bg-white p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl">
                    {sol.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-4 flex items-center justify-between gap-5">
                    <h2 className="text-xl font-bold text-gray-900">{sol.industry}</h2>
                    <span className="text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">阅读行业方案</span>
                  </div>
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
            </Link>
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
