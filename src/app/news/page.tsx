import type { Metadata } from 'next'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import NewsContent from './news-content'

export const metadata: Metadata = { title: '新闻动态｜婵梦科技', description: '了解婵梦科技公司动态、业务观察与企业增长观点。' }

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <SiteHeader active="/news" />
      <NewsContent />
      <Footer />
    </div>
  )
}
