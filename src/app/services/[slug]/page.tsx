import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import { getServiceDetail, SERVICE_DETAILS } from '@/data/services'

export function generateStaticParams() {
  return SERVICE_DETAILS.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getServiceDetail((await params).slug)
  return item ? { title: `${item.title}｜婵梦科技`, description: item.intro } : {}
}

const navItems = [
  ['overview', '服务概览'], ['problems', '客户问题'], ['modules', '服务内容'],
  ['scenarios', '应用场景'], ['advantages', '服务优势'], ['process', '实施方法'], ['delivery', '交付成果'], ['faq', '常见问题'],
]

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getServiceDetail((await params).slug)
  if (!item) notFound()
  const index = SERVICE_DETAILS.findIndex((entry) => entry.slug === item.slug)
  const nextItem = SERVICE_DETAILS[(index + 1) % SERVICE_DETAILS.length]

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <SiteHeader active="/services" />
      <main>
        <header id="overview" className="border-b border-black/[0.07] bg-[#f5f5f7]">
          <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
            <div className="flex items-center gap-4 border-b border-black/[0.08] pb-5">
              <span className="text-sm font-semibold text-blue-600">{String(index + 1).padStart(2, '0')}</span>
              <p className="text-xs font-semibold tracking-[0.16em] text-gray-500">{item.eyebrow}</p>
            </div>

            <div className="grid gap-10 pt-9 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)] lg:items-start lg:gap-16">
              <div>
                <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.05em] md:text-5xl lg:text-[56px]">{item.statement}</h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">{item.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500">咨询这项服务</Link>
                  <Link href="/cases" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1d1d1f] shadow-[inset_0_0_0_1px_rgba(0,0,0,.12)] transition-colors hover:bg-[#e8e8ed]">查看客户案例</Link>
                </div>
              </div>

              <div className="overflow-hidden rounded-[22px] border border-black/[0.08] bg-white">
                <div className="flex items-center justify-between px-6 py-5">
                  <p className="text-sm font-semibold text-[#1d1d1f]">服务价值</p>
                  <span className="text-xs text-gray-400">{item.title}</span>
                </div>
                <div className="divide-y divide-black/[0.07] border-t border-black/[0.07]">
                  {item.outcomes.map((outcome, outcomeIndex) => (
                    <div key={outcome.title} className="grid grid-cols-[34px_1fr] gap-3 px-6 py-4">
                      <span className="pt-0.5 text-xs font-semibold text-blue-600">{String(outcomeIndex + 1).padStart(2, '0')}</span>
                      <div>
                        <h2 className="text-base font-semibold tracking-[-0.02em]">{outcome.title}</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500">{outcome.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 py-16 md:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20 lg:py-24">
          <aside className="hidden lg:block">
            <nav className="sticky top-24 border-l border-gray-200 py-2" aria-label="服务详情目录">
              {navItems.map(([id, label]) => <a key={id} href={`#${id}`} className="block border-l-2 border-transparent px-5 py-3 text-sm text-gray-500 transition-colors hover:border-blue-600 hover:text-blue-600">{label}</a>)}
            </nav>
          </aside>

          <article className="min-w-0">
            <section id="problems" className="scroll-mt-24 border-t border-gray-300 pb-20 pt-14">
              <p className="text-sm font-semibold text-blue-600">客户问题</p>
              <div className="mt-7 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">为什么企业需要<br />这项服务</h2>
                <div className="divide-y divide-gray-200 border-y border-gray-200">
                  {item.painPoints.map((point, pointIndex) => (
                    <div key={point} className="grid grid-cols-[56px_1fr] items-start py-6">
                      <span className="text-base font-semibold text-blue-600">{String(pointIndex + 1).padStart(2, '0')}</span>
                      <p className="text-lg font-medium leading-8">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid overflow-hidden rounded-[24px] border border-black/[0.08] bg-[#f5f5f7] md:grid-cols-3">
              {item.outcomes.map((outcome, outcomeIndex) => (
                <div key={outcome.title} className="border-b border-black/[0.07] bg-white p-7 md:border-b-0 md:border-r md:p-8 md:last:border-r-0">
                  <span className="text-sm font-semibold text-blue-600">{String(outcomeIndex + 1).padStart(2, '0')}</span>
                  <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">{outcome.title}</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">{outcome.description}</p>
                </div>
              ))}
            </section>

            <section className="py-20">
              <div className="grid overflow-hidden rounded-[24px] border border-black/[0.08] bg-white md:grid-cols-2">
                <div className="bg-[#f5f5f7] p-7 md:p-10">
                  <p className="text-sm font-semibold text-gray-500">如果继续维持现状</p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em]">投入会继续发生，<br />但增长链路仍然模糊</h2>
                  <ul className="mt-8 space-y-4">
                    {item.painPoints.slice(0, 3).map((point) => <li key={point} className="flex gap-3 text-sm leading-7 text-gray-600"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />{point}</li>)}
                  </ul>
                </div>
                <div className="border-t border-blue-100 bg-[#eef5ff] p-7 text-[#1d1d1f] md:border-l md:border-t-0 md:p-10">
                  <p className="text-sm font-semibold text-blue-600">建立体系之后</p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-[#16386f]">客户更容易理解价值，<br />团队更清楚下一步怎么做</h2>
                  <ul className="mt-8 space-y-5">
                    {item.outcomes.map((outcome) => <li key={outcome.title}><strong className="block text-base text-[#1d1d1f]">{outcome.title}</strong><span className="mt-1 block text-sm leading-6 text-gray-600">{outcome.description}</span></li>)}
                  </ul>
                </div>
              </div>
            </section>

            <section id="modules" className="scroll-mt-24 border-t border-gray-300 py-20">
              <p className="text-sm font-semibold text-blue-600">服务内容</p>
              <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{item.title}<br />具体做什么</h2>
                <p className="max-w-md text-base leading-7 text-gray-500">每个模块围绕同一业务目标协同推进，具体范围根据企业现状、资源和项目阶段确认。</p>
              </div>
              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                {item.modules.map((module, moduleIndex) => (
                  <div key={module.title} className="min-h-[220px] rounded-[24px] border border-blue-100 bg-[#f7faff] p-7 transition-colors hover:border-blue-300 md:p-8">
                    <span className="text-sm font-semibold tracking-[0.08em] text-blue-600">{String(moduleIndex + 1).padStart(2, '0')}</span>
                    <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{module.title}</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">{module.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="scenarios" className="scroll-mt-24 border-t border-gray-300 py-20">
              <p className="text-sm font-semibold text-blue-600">应用场景</p>
              <h2 className="mt-7 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">客户在哪些场景下使用</h2>
              <div className="mt-12 divide-y divide-gray-200 border-y border-gray-200">
                {item.scenarios.map((scenario, scenarioIndex) => (
                  <div key={scenario.title} className="grid gap-3 py-7 md:grid-cols-[70px_230px_1fr] md:items-center">
                    <span className="text-lg font-semibold text-blue-600">{String(scenarioIndex + 1).padStart(2, '0')}</span>
                    <h3 className="text-xl font-semibold">{scenario.title}</h3>
                    <p className="text-base leading-7 text-gray-600">{scenario.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="advantages" className="scroll-mt-24 border-t border-gray-300 py-20">
              <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-sm font-semibold text-blue-600">为什么选择婵梦科技</p>
                  <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">不只提供执行，<br />更帮助客户建立能力</h2>
                  <p className="mt-6 max-w-md text-base leading-8 text-gray-600">客户真正需要的不是临时增加几条内容或一次投放，而是一套能够持续运行、被团队理解并根据结果调整的增长方法。</p>
                </div>
                <div className="grid gap-px overflow-hidden rounded-[26px] border border-gray-200 bg-gray-200 sm:grid-cols-2">
                  {[
                    ['从业务问题出发', '先诊断客户、产品、流量和承接现状，再决定优先服务范围，避免为了使用工具而使用工具。'],
                    ['四项业务协同', `把${item.title}与内容、流量和商业转化连接起来，减少不同供应商各自推进造成的断层。`],
                    ['交付过程透明', '明确阶段任务、交付物、双方责任和复盘依据，让客户知道项目正在解决什么问题。'],
                    ['帮助团队沉淀', '将方法、内容、数据和流程留在企业内部，让项目结束后仍然能够继续迭代。'],
                  ].map(([title, description], advantageIndex) => (
                    <div key={title} className="bg-white p-7 md:p-8">
                      <span className="text-sm font-semibold text-blue-600">{String(advantageIndex + 1).padStart(2, '0')}</span>
                      <h3 className="mt-7 text-xl font-semibold tracking-[-0.025em]">{title}</h3>
                      <p className="mt-4 text-sm leading-7 text-gray-600">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mb-20 rounded-[30px] bg-gradient-to-br from-[#eaf2ff] to-[#f8fbff] px-7 py-10 md:px-10 md:py-12">
              <p className="text-sm font-semibold text-blue-600">从一次业务诊断开始</p>
              <div className="mt-4 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold tracking-[-0.04em]">先找出最值得解决的问题，<br />再决定投入多少资源</h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">无需一开始购买全部服务。我们会先根据企业现状判断优先级，给出适合当前阶段的推进建议。</p>
                </div>
                <Link href="/contact" className="inline-flex w-fit shrink-0 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white hover:bg-blue-500">预约初步沟通</Link>
              </div>
            </section>

            <section id="process" className="scroll-mt-24 -mx-5 bg-[#f5f5f7] px-5 py-20 md:-mx-8 md:px-8 lg:mx-0 lg:rounded-[30px] lg:px-10">
              <p className="text-sm font-semibold tracking-[0.16em] text-blue-600">DELIVERY METHOD</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">从判断到执行，形成完整闭环</h2>
              <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] bg-gray-200 border border-gray-200 md:grid-cols-2">
                {item.process.map((step, stepIndex) => (
                  <div key={step.title} className="bg-white p-7 md:p-8">
                    <span className="text-sm font-semibold text-blue-600">{String(stepIndex + 1).padStart(2, '0')}</span>
                    <h3 className="mt-7 text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="delivery" className="scroll-mt-24 border-t border-gray-300 py-20">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-blue-600">适用对象</p>
                  <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">这项服务适合谁</h2>
                  <ul className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
                    {item.audience.map((text) => <li key={text} className="py-6 text-lg leading-8">{text}</li>)}
                  </ul>
                </div>
                <div className="rounded-[26px] border border-blue-100 bg-[#eef5ff] p-8 text-[#1d1d1f] md:p-10">
                  <p className="text-sm font-semibold text-blue-600">核心交付</p>
                  <div className="mt-8 space-y-3">
                    {item.deliverables.map((text, deliveryIndex) => (
                      <div key={text} className="flex items-center gap-5 rounded-2xl border border-black/[0.05] bg-white px-5 py-5 shadow-[0_3px_14px_rgba(15,23,42,.04)]">
                        <span className="text-sm font-semibold text-blue-600">{String(deliveryIndex + 1).padStart(2, '0')}</span>
                        <span className="font-medium">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-10 border-l-2 border-amber-400 bg-amber-50 px-6 py-5">
                <p className="text-sm font-semibold text-amber-700">合作边界</p>
                <p className="mt-2 text-sm leading-7 text-amber-950/75">{item.boundary}</p>
              </div>
            </section>

            <section id="faq" className="scroll-mt-24 border-t border-gray-300 py-20">
              <p className="text-sm font-semibold text-blue-600">常见问题</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">合作前经常被问到</h2>
              <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
                {item.faqs.map((faq, faqIndex) => (
                  <details key={faq.question} className="group py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                      <span><span className="mr-5 text-blue-600">{String(faqIndex + 1).padStart(2, '0')}</span>{faq.question}</span>
                      <span className="text-2xl font-light text-gray-400 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-3xl pb-2 pl-12 pt-5 text-base leading-8 text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-[26px] border border-blue-100 bg-[#eef5ff] px-7 py-10 text-[#1d1d1f] md:px-10 md:py-12">
              <p className="text-sm font-semibold text-blue-600">下一步</p>
              <div className="mt-4 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
                <div><h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#16386f]">先判断问题，再确定服务范围</h2><p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">提交企业现状和需求，我们会结合业务目标、现有资源与优先级进行初步判断。</p></div>
                <Link href="/contact" className="inline-flex w-fit shrink-0 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white hover:bg-blue-500">联系销售</Link>
              </div>
            </section>

            <Link href={`/services/${nextItem.slug}`} className="mt-8 flex items-center justify-between border-t border-gray-200 py-8">
              <span className="text-sm text-gray-400">下一项服务</span>
              <strong className="text-xl font-semibold text-blue-600">{nextItem.title}</strong>
            </Link>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
