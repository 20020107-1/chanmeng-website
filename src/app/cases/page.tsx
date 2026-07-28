import type { Metadata } from 'next'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import CaseLibrary from '@/components/case-library'
import { CASE_STUDIES } from '@/data/cases'

export const metadata: Metadata = { title: '客户案例｜婵梦科技', description: '查看婵梦科技在AI搜索获客、内容营销与商业增长领域的项目实践。' }

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <SiteHeader active="/cases" />
      <main>
        <CaseLibrary cases={CASE_STUDIES} />
        <p className="px-5 pb-20 text-center text-xs text-gray-400">为保护客户商业信息，案例采用脱敏表达；项目范围及结果以双方实际确认内容为准。</p>
      </main>
      <Footer />
    </div>
  )
}
