import type { Metadata } from 'next'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import ShowcaseFrame from '@/components/showcase-frame'

export const metadata: Metadata = {
  title: '服务方案｜婵梦科技',
  description:
    '范围清晰、交付透明。可按需求选择基础方案或完整方案，开发服务可独立开启。',
  robots: { index: true, follow: true },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0b0c0d]">
      <SiteHeader active="/pricing" />
      <main>
        <ShowcaseFrame src="/pricing.html" title="服务方案" />
      </main>
      <Footer />
    </div>
  )
}
