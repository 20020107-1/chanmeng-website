import type { Metadata } from 'next'
import HomeContent from './home-content'

export const metadata: Metadata = {
  title: '婵梦科技 | AI+流量+人才+产业 · 企业全链路增长服务',
  description:
    '杭州婵梦科技——企业全链路增长服务提供商。通过AI赋能、全域流量运营、跨境电商人才孵化、品牌出海、企业综合服务五大核心业务，为企业提供从获客到交付的一站式增长解决方案。',
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
    title: '婵梦科技 | AI+流量+人才+产业 企业全链路增长服务',
    description:
      '为企业提供流量获客、AI提效、人才孵化、品牌出海一站式解决方案。',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: '婵梦科技 — 企业全链路增长服务',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '婵梦科技 | 企业全链路增长服务',
    description: 'AI+流量+人才+产业，一站式企业增长服务。',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://chanmeng.com',
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
                  text: '婵梦科技是一家企业全链路增长服务提供商，通过AI+流量+人才+产业四维模式，为企业提供全域流量运营、AI效率提升、跨境电商人才孵化、品牌出海全案、企业综合服务等一站式增长解决方案。总部位于杭州，成立于2026年。',
                },
              },
              {
                '@type': 'Question',
                name: '婵梦科技的核心服务有哪些？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '五大核心服务：全域流量运营（抖音/TikTok/Google/Facebook）、AI企业效率提升（智能客服、数据分析、内容生成）、跨境电商人才孵化（全岗位培训与输送）、品牌出海全案（独立站、全球投放、海外仓）、企业综合服务（财税、政策申报、供应链对接）。',
                },
              },
              {
                '@type': 'Question',
                name: '零房租产业园包含哪些服务？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '提供12项基础服务：精装办公场地、会议室、千兆网络、工商注册/税务登记、基础财税服务、基础法律服务、税收筹划、政府补贴申请、人员培训、选品中心、基础仓储、员工工作餐+宿舍。入驻条件与合作约定请咨询客服了解详情。',
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
