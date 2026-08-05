import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import JsonLd from '@/components/json-ld'
import { NEWS_ARTICLES, getNewsArticle } from '@/data/news'
import { ORGANIZATION_ID, absoluteUrl } from '@/lib/seo'

export function generateStaticParams() { return NEWS_ARTICLES.map((article) => ({ slug: article.slug })) }

const HERO_IMAGES: Record<string, string> = {
  'growth-loop-not-one-off-campaign': '/images/journal-growth-loop.png',
  'geo-starts-from-business-diagnosis': '/images/journal-diagnosis-first.png',
  'geo-workbench-ten-step-workflow': '/images/journal-workbench-flow.png',
  'geo-explained-generative-search-traffic': '/images/news-geo-explained-hero.png',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getNewsArticle((await params).slug)
  if (!article) return {}
  const url = absoluteUrl(`/news/${article.slug}`)
  return {
    title: `${article.title}｜婵梦科技`,
    description: article.summary,
    alternates: { canonical: url },
    authors: [{ name: '婵梦科技' }],
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.summary,
      url,
      publishedTime: `${article.date.replaceAll('.', '-')}T00:00:00+08:00`,
      images: [absoluteUrl('/og-image.svg')],
    },
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getNewsArticle((await params).slug)
  if (!article) notFound()
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <SiteHeader active="/news" />
      <main>
        <article>
          <header className="mx-auto max-w-3xl px-5 pb-12 pt-14 text-center md:pb-16 md:pt-18">
            <Link href="/news" className="text-sm text-blue-600 hover:underline">新闻动态</Link>
            <p className="mt-4 text-sm text-gray-500">{article.category} · {article.date}</p>
            <h1 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-[-0.045em] md:text-5xl">{article.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-500 md:text-lg">{article.lead}</p>
          </header>
          {HERO_IMAGES[article.slug] ? (
            <div className="mx-auto max-w-4xl px-5">
              <img src={HERO_IMAGES[article.slug]} alt={article.title} className="w-full shadow-[0_18px_50px_rgba(0,0,0,.10)]" />
            </div>
          ) : null}
          <div className="mx-auto max-w-2xl px-5 py-12 md:py-16">
            {article.sections.map((section) => <section key={section.title} className="mb-10"><h2 className="text-xl font-semibold tracking-[-0.025em] md:text-2xl">{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-base leading-8 text-gray-600">{paragraph}</p>)}{section.image ? <img src={section.image} alt={section.title} className="mt-6 w-full shadow-[0_14px_40px_rgba(0,0,0,.09)]" loading="lazy" /> : null}</section>)}
            {article.sources?.length ? (
              <section className="mt-12 rounded-[22px] bg-[#f5f5f7] p-6 md:p-7">
                <h2 className="text-lg font-semibold tracking-[-0.02em]">参考资料</h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">本文基于公开权威资料原创整理，链接用于进一步查阅。</p>
                <ul className="mt-5 space-y-3">
                  {article.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">{source.title}</a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <div className="mt-14 border-t border-gray-200 pt-7"><Link href="/news" className="text-sm text-blue-600">返回新闻动态</Link></div>
          </div>
        </article>
      </main>
      <Footer />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'NewsArticle',
              '@id': `${absoluteUrl(`/news/${article.slug}`)}#article`,
              headline: article.title,
              description: article.summary,
              datePublished: `${article.date.replaceAll('.', '-')}T00:00:00+08:00`,
              dateModified: `${article.date.replaceAll('.', '-')}T00:00:00+08:00`,
              inLanguage: 'zh-CN',
              mainEntityOfPage: absoluteUrl(`/news/${article.slug}`),
              image: absoluteUrl('/og-image.svg'),
              author: { '@id': ORGANIZATION_ID },
              publisher: { '@id': ORGANIZATION_ID },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: '首页',
                  item: absoluteUrl('/'),
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: '新闻动态',
                  item: absoluteUrl('/news'),
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: article.title,
                  item: absoluteUrl(`/news/${article.slug}`),
                },
              ],
            },
          ],
        }}
      />
    </div>
  )
}
