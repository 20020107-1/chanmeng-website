import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import { SERVICE_DETAILS } from '@/data/services'

export const metadata: Metadata = {
  title: '企业增长闭环｜核心服务',
  description: '婵梦科技通过商业诊断、产品内容、GEO获客、短视频增量、成交转化与招商增长六个阶段，为企业建立结构化增长闭环。',
  robots: { index: true, follow: true },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#211d18]">
      <SiteHeader active="/services" />
      <main>
        <header className="border-b border-[#ded5c7] px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#E2492F]">CHANMENG GROWTH LOOP</p>
            <div className="mt-6 grid gap-7 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.07] tracking-[-0.055em] md:text-6xl">
                六步企业增长闭环
                <span className="mt-2 block text-[#E2492F]">差异化 × 流量 × 转化 × 增效</span>
              </h1>
              <p className="max-w-xl text-base leading-8 text-[#6d655b] md:text-lg">
                从商业诊断开始，依次建立产品与内容、核心获客、增量触达、成交承接和业务复制。每一阶段有明确问题、交付物与结果判断。
              </p>
            </div>
          </div>
        </header>

        <section className="px-5 py-14 md:px-8 md:py-20" aria-label="增长闭环总览">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-5 border-t border-[#d9cebb] pt-6 md:grid-cols-[90px_1fr_420px]">
              <span className="text-sm font-semibold text-[#E2492F]">01—06</span>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">从问题出发，按阶段推进</h2>
              <p className="text-sm leading-7 text-[#6d655b]">无需一次购买全部服务。我们会先判断企业当前所处阶段，再确定优先投入的模块。</p>
            </div>

            <div className="divide-y divide-[#ded5c7] border-y border-[#ded5c7]">
              {SERVICE_DETAILS.map((service, index) => (
                <article key={service.slug} id={service.slug} className="scroll-mt-24">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group grid gap-6 py-9 transition-colors hover:bg-[#F2EFE9] md:grid-cols-[86px_minmax(240px,.8fr)_minmax(320px,1.2fr)_170px] md:items-start md:px-6"
                  >
                    <span className="text-3xl font-light tracking-[-0.05em] text-[#E2492F]">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.16em] text-[#E2492F]">{service.eyebrow.split('·')[1]}</p>
                      <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.035em]">{service.title}</h2>
                      <p className="mt-3 text-sm font-medium leading-6 text-[#E2492F]">{service.statement}</p>
                    </div>
                    <div>
                      <p className="text-sm leading-7 text-[#6d655b]">{service.intro}</p>
                      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <dt className="text-xs text-[#9b9185]">核心服务</dt>
                          <dd className="mt-2 text-sm leading-6 text-[#3f3932]">{service.modules.map((item) => item.title).join('｜')}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-[#9b9185]">预期价值</dt>
                          <dd className="mt-2 text-sm leading-6 text-[#3f3932]">{service.outcomes.map((item) => item.title).join('｜')}</dd>
                        </div>
                      </dl>
                    </div>
                    <span className="text-sm font-medium text-[#E2492F] md:text-right">查看阶段详情</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#ded5c7] bg-[#F2EFE9] px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#E2492F]">BUSINESS FOUNDATION</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">商业底层体系，是效果保障与增效底座</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#6d655b]">定位、产品、转化、招商与执行辅导贯穿整个闭环，让流量投入最终回到真实经营结果。</p>
            </div>
            <Link href="/contact" className="inline-flex w-fit rounded-full bg-[#211d18] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#C93A26]">
              预约业务诊断
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
