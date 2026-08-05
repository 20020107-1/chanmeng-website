import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: '连续动效演示',
  description: '网站连续滚动与数据计数动效演示页面。',
  robots: { index: false, follow: false },
}

export default function GrowthDataPage() {
  redirect('/growth-data.html')
}
