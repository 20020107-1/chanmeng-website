import type { Metadata } from 'next'
import HomeContent from './home-content'

export const metadata: Metadata = {
  title: '婵梦科技 | AI驱动的合伙制企业增长全链路平台',
  description:
    '杭州婵梦科技是AI驱动的合伙制企业增长全链路平台，以AI赋能人才，以合伙成就事业，服务企业客户与创业合伙人。',
  keywords: [
    '婵梦科技',
    '企业增长服务',
    '跨境电商',
    'AI赋能',
    '流量运营',
    '品牌出海',
    '企业服务',
    '杭州',
    '人才孵化',
  ],
  authors: [{ name: '杭州婵梦传媒科技有限公司' }],
  category: '企业服务',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '婵梦科技',
    title: '婵梦科技 | AI驱动的合伙制企业增长全链路平台',
    description:
      '以AI赋能人才，以合伙成就事业。覆盖流量获客、商业转化、品牌出海与跨境增长。',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: '婵梦科技 — AI驱动的合伙制企业增长全链路平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '婵梦科技 | 企业增长全链路平台',
    description: 'AI驱动，合伙共创，连接企业增长与创业者事业成长。',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://chanmengtech.me',
  },
}

export default function Page() {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '婵梦科技是做什么的？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '婵梦科技是AI驱动的合伙制企业增长全链路平台，服务企业客户、内部合伙人与外部合伙人，覆盖流量获客、商业转化、品牌出海与跨境增长。总部位于杭州，成立于2026年。',
                },
              },
              {
                '@type': 'Question',
                name: '婵梦科技的核心服务有哪些？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '核心服务包括流量获客与商业转化、AI工具与效率赋能、品牌出海与跨境增长，并通过合伙人生态连接人才、能力与业务机会。',
                },
              },
              {
                '@type': 'Question',
                name: '如何与婵梦科技合作？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '合作模式包括城市服务商、业务合伙人、生态合作伙伴三种。具体合作条件与权益以双方签署的正式合作协议为准。',
                },
              },
            ],
          }),
        }}
      />
      <HomeContent />
    </>
  )
}
