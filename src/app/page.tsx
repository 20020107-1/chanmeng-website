import type { Metadata } from 'next'
import HomeContent from './home-content'

export const metadata: Metadata = {
  title: '婵梦科技｜六步企业增长闭环',
  description:
    '婵梦科技围绕商业诊断、产品内容、GEO获客、短视频增量、成交转化与招商增长，为企业建立结构化增长闭环。',
  keywords: [
    '婵梦科技',
    'AI搜索获客',
    'GEO优化',
    'AEO优化',
    'LLMO优化',
    'AI内容营销',
    '全域流量运营',
    '商业转化',
    '企业增长服务',
    '杭州',
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
    title: '婵梦科技｜六步企业增长闭环',
    description:
      '从差异化定位到招商增长，连接流量、转化与持续增效。',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: '婵梦科技六步企业增长闭环',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '婵梦科技｜六步企业增长闭环',
    description: '差异化、流量、转化与增效的一体化增长服务。',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://20020107-1.github.io/chanmeng-website',
  },
}

export default function Page() {
  return <HomeContent />
}
