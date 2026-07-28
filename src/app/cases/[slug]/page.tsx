import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import CaseSectionNav from '@/components/case-section-nav'
import { CASE_STUDIES, getCaseStudy } from '@/data/cases'

export function generateStaticParams() {
  return CASE_STUDIES.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getCaseStudy((await params).slug)
  return item ? { title: `${item.title}｜婵梦科技案例`, description: item.subtitle } : {}
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getCaseStudy((await params).slug)
  if (!item) notFound()
  const currentIndex = CASE_STUDIES.findIndex((entry) => entry.slug === item.slug)

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <SiteHeader active="/cases" />
      <main>
        <header className="mx-auto max-w-[1500px] px-5 pt-10 md:px-8 md:pt-14">
          <div className="mb-7 flex items-center gap-2 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">首页</Link>
            <span className="text-gray-300">/</span>
            <Link href="/cases" className="text-blue-600 hover:underline">案例研究</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500">{item.industry}</span>
          </div>

          <div className="relative min-h-[400px] overflow-hidden bg-[#eef4ff] md:min-h-[470px]">
            <div className="absolute inset-0 bg-[linear-gradient(110deg,#fff_0%,rgba(255,255,255,.96)_37%,rgba(255,255,255,.25)_66%,transparent_100%)]" />
            <div className="absolute -right-20 -top-28 h-[560px] w-[560px] rounded-full border border-blue-300/50" />
            <div className="absolute right-[8%] top-[18%] h-64 w-64 rounded-full bg-blue-600 shadow-[0_40px_120px_rgba(37,99,235,.30)]" />
            <div className="absolute bottom-[-90px] right-[28%] h-72 w-72 rounded-full border-[42px] border-white/60" />
            <div className="absolute right-[8%] top-[18%] grid h-64 w-64 place-items-center text-center text-white">
              <div><p className="text-xs font-medium tracking-[0.2em] text-blue-100">CASE STUDY</p><p className="mt-3 text-5xl font-light">{String(currentIndex + 1).padStart(2, '0')}</p></div>
            </div>

            <div className="relative z-10 flex min-h-[400px] max-w-[720px] flex-col p-7 md:min-h-[470px] md:p-12 lg:p-14">
              <p className="text-sm font-medium text-blue-600">{item.category}</p>
              <h1 className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.16] tracking-[-0.035em] md:text-5xl">{item.title}</h1>
              <p className="mt-auto max-w-2xl text-lg leading-8 text-gray-700 md:text-xl">{item.subtitle}</p>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24 lg:py-24">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <CaseSectionNav />
            </div>
          </aside>

          <article className="min-w-0">
            <section id="challenge" className="scroll-mt-28 border-t border-gray-300 pb-24 pt-16">
              <p className="font-sans text-base font-semibold tracking-[-0.01em] text-blue-600">商业挑战</p>
              <h2 className="mt-8 max-w-3xl text-2xl font-semibold leading-[1.35] tracking-[-0.025em] md:text-4xl">{item.challenge}</h2>
              <div className="mt-10 max-w-3xl space-y-6 text-[17px] leading-8 text-gray-700">
                <p>{item.overview}</p>
                <p>项目首先需要回答的不是“做什么内容”，而是明确目标客户、真实需求与可验证的增长路径，再把市场判断转化为可执行的工作。</p>
              </div>
              {item.evidenceImage && (
                <figure className="my-14 max-w-3xl">
                  <div className="flex max-h-[560px] justify-center overflow-hidden border border-gray-200 bg-[#f5f5f7] p-3 md:p-5">
                    <img src={item.evidenceImage} alt={item.evidenceAlt || item.title} className="h-auto max-h-[520px] max-w-full object-contain" />
                  </div>
                  {item.evidenceCaption && <figcaption className="mt-4 text-sm leading-6 text-gray-500">{item.evidenceCaption}</figcaption>}
                </figure>
              )}
              <div className="mt-14 max-w-3xl space-y-14">
                {item.article.map((section) => (
                  <section key={section.heading}>
                    <h3 className="text-2xl font-semibold leading-tight tracking-[-0.025em] md:text-3xl">{section.heading}</h3>
                    <div className="mt-6 space-y-6 text-[17px] leading-8 text-gray-700">
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section id="transformation" className="scroll-mt-28 border-t border-gray-300 py-24">
              <p className="font-sans text-base font-semibold tracking-[-0.01em] text-blue-600">解决策略</p>
              <h2 className="mt-8 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">从判断到执行</h2>
              <div className="mt-14 divide-y divide-gray-200 border-y border-gray-200">
                {item.strategy.map((text, index) => (
                  <div key={text} className="grid gap-5 py-8 md:grid-cols-[92px_1fr] md:items-center">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-blue-600 text-base font-semibold tracking-[-0.01em] text-white shadow-[0_7px_18px_rgba(37,99,235,.20)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-lg font-medium leading-8 tracking-[-0.015em] text-[#242426] md:text-xl">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-14">
                <p className="font-sans text-base font-semibold tracking-[-0.01em] text-blue-600">核心交付</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {item.deliverables.map((text, index) => (
                    <div key={text} className="group rounded-[20px] border border-blue-100 bg-[#f7faff] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_12px_32px_rgba(37,99,235,.08)]">
                      <span className="text-sm font-semibold tracking-[0.08em] text-blue-600">{String(index + 1).padStart(2, '0')}</span>
                      <p className="mt-5 text-lg font-medium leading-7 tracking-[-0.015em] text-[#242426]">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="results" className="scroll-mt-28 border-t border-gray-300 py-24">
              <p className="font-sans text-base font-semibold tracking-[-0.01em] text-blue-600">项目结果</p>
              <h2 className="mt-8 max-w-3xl text-2xl font-semibold leading-[1.4] tracking-[-0.02em] md:text-3xl">{item.outcome}</h2>
              {item.highlights && (
                <div className={`mt-12 grid gap-4 ${
                  item.highlights.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {item.highlights.map((highlight, index) => (
                    <div
                      key={highlight.label}
                      className={`relative min-h-[220px] overflow-hidden rounded-[24px] p-8 text-white shadow-[0_18px_50px_rgba(15,42,91,.16)] ${
                        index % 3 === 0
                          ? 'bg-[#102a56]'
                          : index % 3 === 1
                            ? 'bg-[#1565f9]'
                            : 'bg-[#087e8b]'
                      }`}
                    >
                      <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full border border-white/20" />
                      <div className="absolute -bottom-20 right-8 h-40 w-40 rounded-full bg-white/[0.06]" />
                      <span className="relative text-xs font-semibold tracking-[0.16em] text-white/55">RESULT {String(index + 1).padStart(2, '0')}</span>
                      <strong className="relative mt-9 block text-5xl font-semibold tracking-[-0.055em] md:text-6xl">{highlight.value}</strong>
                      <span className="relative mt-5 block max-w-[260px] text-sm font-medium leading-6 text-white/80">{highlight.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section id="background" className="scroll-mt-28 border-t border-gray-300 py-24">
              <p className="font-sans text-base font-semibold tracking-[-0.01em] text-blue-600">项目背景</p>
              <div className="mt-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">关于本项目</h2>
                <p className="max-w-md text-sm leading-6 text-gray-500">用统一字段快速了解项目所属行业、合作范围与重点能力。</p>
              </div>

              <dl className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="min-h-[170px] rounded-[24px] bg-[#102a56] p-7 text-white">
                  <dt className="text-sm font-medium text-blue-200">所属行业</dt>
                  <dd className="mt-8 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">{item.industry}</dd>
                </div>
                <div className="min-h-[170px] rounded-[24px] bg-blue-600 p-7 text-white">
                  <dt className="text-sm font-medium text-blue-100">案例类型</dt>
                  <dd className="mt-8 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">{item.category}</dd>
                </div>
                <div className="rounded-[24px] border border-blue-100 bg-[#f7faff] p-7 sm:col-span-2">
                  <dt className="text-sm font-semibold text-blue-600">服务范围</dt>
                  <dd className="mt-5 text-xl font-medium leading-8 tracking-[-0.015em] text-[#242426] md:text-2xl">{item.scope}</dd>
                </div>
                <div className="rounded-[24px] border border-gray-200 bg-white p-7 sm:col-span-2">
                  <dt className="text-sm font-semibold text-gray-500">重点标签</dt>
                  <dd className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => <span key={tag} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">{tag}</span>)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 rounded-[18px] bg-[#f5f5f7] px-5 py-4">
                <p className="max-w-3xl text-xs leading-6 text-gray-500">案例采用脱敏表达，不展示未经授权的客户数据；具体项目范围与结果以双方确认材料为准。</p>
              </div>
            </section>
          </article>
        </div>

      </main>
      <Footer />
    </div>
  )
}
