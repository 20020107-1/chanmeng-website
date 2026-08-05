import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import { getSolutionArticle, SOLUTION_ARTICLES } from '@/data/solutions'

export function generateStaticParams() {
  return SOLUTION_ARTICLES.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getSolutionArticle((await params).slug)
  return item ? { title: `${item.industry}增长解决方案｜婵梦科技`, description: item.intro } : {}
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getSolutionArticle((await params).slug)
  if (!item) notFound()
  const currentIndex = SOLUTION_ARTICLES.findIndex((entry) => entry.slug === item.slug)

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <SiteHeader active="/solutions" />
      <main>
        <header className="mx-auto max-w-[1500px] px-5 pt-10 md:px-8 md:pt-14">
          <div className="mb-7 flex items-center gap-2 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">首页</Link>
            <span className="text-gray-300">/</span>
            <Link href="/solutions" className="text-blue-600 hover:underline">行业方案</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500">{item.industry}</span>
          </div>

          <div className="relative min-h-[410px] overflow-hidden border border-[#e7dfd1] bg-[#fbf8f1] md:min-h-[480px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_48%,rgba(181,138,74,.10),transparent_26%),linear-gradient(110deg,#fff_0%,rgba(255,255,255,.96)_50%,rgba(248,242,231,.72)_100%)]" />
            <div className="absolute -right-24 -top-32 h-[600px] w-[600px] rounded-full border border-[#b58a4a]/25" />
            <div className="absolute right-[7%] top-1/2 hidden h-56 w-56 -translate-y-1/2 place-items-center rounded-full border border-[#b58a4a]/55 bg-white/45 text-center shadow-[0_24px_70px_rgba(80,55,25,.08)] backdrop-blur-sm md:grid">
              <div>
                <p className="text-[11px] font-medium tracking-[0.24em] text-[#9b753d]">INDUSTRY SOLUTION</p>
                <p className="mt-2 font-serif text-6xl font-light tracking-[-0.06em] text-[#211d18]">{String(currentIndex + 1).padStart(2, '0')}</p>
                <span className="mx-auto mt-5 block h-1.5 w-1.5 rounded-full bg-[#a83225]" />
              </div>
            </div>
            <div className="relative z-10 flex min-h-[410px] max-w-[770px] flex-col p-7 md:min-h-[480px] md:p-12 lg:p-14">
              <p className="text-base font-medium text-blue-600">{item.category}</p>
              <h1 className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.16] tracking-[-0.04em] md:text-5xl">{item.headline}</h1>
              <p className="mt-auto max-w-2xl text-lg leading-8 text-gray-700 md:text-xl">{item.intro}</p>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-24 lg:py-24">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 border-l border-gray-300 text-sm" aria-label="文章目录">
              {[['challenge', '行业挑战'], ['insight', '深度分析'], ['strategy', '解决路径'], ['delivery', '服务交付'], ['sources', '参考资料']].map(([href, label]) => (
                <a key={href} href={`#${href}`} className="block border-l-2 border-transparent px-5 py-3 text-gray-600 transition-colors hover:border-blue-600 hover:text-blue-600">{label}</a>
              ))}
            </nav>
          </aside>

          <article className="min-w-0">
            <section id="challenge" className="scroll-mt-28 border-t border-gray-300 pb-20 pt-16">
              <p className="text-base font-semibold text-blue-600">行业挑战</p>
              <h2 className="mt-8 max-w-4xl text-2xl font-semibold leading-[1.4] tracking-[-0.025em] md:text-4xl">{item.pain}</h2>
              <div className="mt-10 max-w-3xl space-y-6 text-[17px] leading-8 text-gray-700">
                <p>{item.intro}</p>
                <p>解决方案的起点不是选择某个平台，而是明确目标客户、真实业务问题、销售条件和企业能够持续投入的资源，再据此决定内容、渠道与交付方式。</p>
              </div>
            </section>

            <section id="insight" className="scroll-mt-28 border-t border-gray-300 py-20">
              <p className="text-base font-semibold text-blue-600">深度分析</p>
              <div className="mt-12 max-w-3xl space-y-16">
                {item.article.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-semibold leading-tight tracking-[-0.025em] md:text-3xl">{section.heading}</h2>
                    <div className="mt-6 space-y-6 text-[17px] leading-8 text-gray-700">
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section id="strategy" className="scroll-mt-28 border-t border-gray-300 py-20">
              <p className="text-base font-semibold text-blue-600">解决路径</p>
              <h2 className="mt-8 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">从判断到执行</h2>
              <div className="mt-12 divide-y divide-gray-200 border-y border-gray-200">
                {item.strategy.map((text, index) => (
                  <div key={text} className="grid gap-5 py-8 md:grid-cols-[92px_1fr] md:items-center">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-blue-600 text-base font-semibold text-white shadow-[0_7px_18px_rgba(37,99,235,.20)]">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-lg font-medium leading-8 tracking-[-0.015em] text-[#242426] md:text-xl">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="delivery" className="scroll-mt-28 border-t border-gray-300 py-20">
              <p className="text-base font-semibold text-blue-600">服务交付</p>
              <h2 className="mt-8 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">婵梦科技可以提供什么</h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {item.deliverables.map((text, index) => (
                  <div key={text} className="rounded-[22px] border border-blue-100 bg-[#f7faff] p-7">
                    <span className="text-sm font-semibold tracking-[0.08em] text-blue-600">{String(index + 1).padStart(2, '0')}</span>
                    <p className="mt-6 text-xl font-medium leading-8 tracking-[-0.015em]">{text}</p>
                  </div>
                ))}
              </div>
              <dl className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] bg-[#102a56] p-7 text-white">
                  <dt className="text-sm text-blue-200">适用企业</dt>
                  <dd className="mt-5 text-lg font-medium leading-8">{item.audience}</dd>
                </div>
                <div className="rounded-[22px] bg-blue-600 p-7 text-white">
                  <dt className="text-sm text-blue-100">服务范围</dt>
                  <dd className="mt-5 text-lg font-medium leading-8">{item.scope}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-2">
                {item.tags.map((tag) => <span key={tag} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">{tag}</span>)}
              </div>
            </section>

            <section id="sources" className="scroll-mt-28 border-t border-gray-300 py-20">
              <p className="text-base font-semibold text-blue-600">参考资料</p>
              <h2 className="mt-8 text-3xl font-semibold tracking-[-0.03em]">资料来源与说明</h2>
              <p className="mt-6 max-w-3xl text-[17px] leading-8 text-gray-700">本文结合公开权威资料与婵梦科技现有服务能力重新撰写。外部资料用于行业判断，不代表相关机构为婵梦科技背书。</p>
              <ul className="mt-8 max-w-3xl divide-y divide-gray-200 border-y border-gray-200">
                {item.sources.map((source) => (
                  <li key={source.url} className="py-5">
                    <a href={source.url} target="_blank" rel="noreferrer" className="font-medium leading-7 text-blue-600 hover:underline">{source.label}</a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-10 rounded-[28px] bg-[#f5f5f7] px-7 py-10 md:px-10">
              <p className="text-sm font-semibold text-blue-600">下一步</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">结合企业现状，判断优先解决哪个增长环节</h2>
              <Link href="/contact" className="mt-7 inline-flex rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500">预约诊断</Link>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
