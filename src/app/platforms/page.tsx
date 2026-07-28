import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import AiPlatformMarquee, { AI_PLATFORMS } from '@/components/ai-platform-marquee'

export const metadata: Metadata = {
  title: 'AI平台覆盖矩阵',
  description: '查看婵梦科技AI搜索获客服务所覆盖的主流AI搜索与智能问答平台。',
}

export default function PlatformsPage() {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <SiteHeader />
      <main>
        <section className="bg-[#f5f5f7] px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-blue-600">AI PLATFORM MATRIX</p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.055em] md:text-7xl">覆盖主流AI搜索<br />与智能问答平台</h1>
              <p className="max-w-2xl text-lg leading-8 text-gray-600 md:text-xl md:leading-9">围绕不同平台的信息理解、联网检索与答案呈现方式，统一建设问题矩阵、品牌信息和专业内容，提高企业在AI决策场景中的可见机会。</p>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-[1600px]"><AiPlatformMarquee /></div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold text-blue-600">平台范围</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">八个平台，<br />不是八套孤立内容</h2>
              <p className="mt-6 max-w-md text-base leading-8 text-gray-600">我们以统一的企业事实和客户问题为基础，再根据平台特点调整内容结构，减少重复生产和信息冲突。</p>
            </div>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {AI_PLATFORMS.map((platform, index) => (
                <div key={platform.name} className="grid gap-3 py-6 sm:grid-cols-[70px_56px_190px_1fr_auto] sm:items-center">
                  <span className="text-base font-semibold text-blue-600">{String(index + 1).padStart(2, '0')}</span>
                  <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-[13px] border border-black/[0.06] bg-white shadow-[0_3px_12px_rgba(15,23,42,.07)]">
                    <img src={platform.icon} alt="" className="h-full w-full object-cover" />
                  </span>
                  <strong className="text-lg font-semibold">{platform.name}</strong>
                  <span className="text-sm leading-6 text-gray-500">{platform.note}</span>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`打开${platform.name}官方网站`}
                    className="inline-flex w-fit items-center justify-center rounded-full bg-[#f2f2f4] px-4 py-2 text-sm font-medium text-[#1d1d1f] transition-all duration-300 hover:bg-[#1d1d1f] hover:text-white active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    打开
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-20">
            <div>
              <p className="text-sm font-semibold text-blue-600">范围说明</p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">不同项目会根据行业、客户问题与平台可用性确定具体覆盖范围；平台算法和答案结果持续变化，不承诺固定排名或永久展示。</p>
            </div>
            <Link href="/services/ai-search-acquisition" className="inline-flex w-fit rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500">了解AI搜索获客</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
