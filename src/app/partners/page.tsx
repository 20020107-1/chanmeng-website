import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import PartnerLogoMarquee from '@/components/partner-logo-marquee'

export const metadata: Metadata = {
  title: '合作伙伴',
  description: '婵梦科技面向技术平台、内容渠道与企业服务机构建立长期合作关系。',
}

const MODELS = [
  { title: '联合解决方案', description: '围绕客户实际需求组合双方能力，明确服务边界、交付责任与项目目标。' },
  { title: '项目协同交付', description: '根据具体项目建立协作机制，共享必要信息，按照节点推进和复盘。' },
  { title: '内容与市场共建', description: '共同开展行业内容、线上活动与市场推广，让专业能力获得更准确的客户认知。' },
]

const PRINCIPLES = [
  ['专业可信', '具备清晰的服务能力、真实案例与稳定交付基础'],
  ['信息透明', '合作范围、费用结构、客户归属与责任边界提前确认'],
  ['长期协作', '不追求一次性资源交换，重视可持续的合作价值'],
  ['客户优先', '所有合作以客户需求、数据安全和交付质量为前提'],
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-white px-5 py-20 md:py-28">
          <div className="absolute left-1/2 top-[-240px] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="relative mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold tracking-[0.14em] text-blue-600">PARTNER ECOSYSTEM</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-[-0.055em] md:text-7xl">连接专业伙伴<br /><span className="text-blue-600">共同服务企业增长</span></h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-500">我们希望与具备真实能力和长期视角的机构建立合作，让客户能够获得更完整、更可靠的服务。</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="rounded-full bg-blue-600 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-500">申请成为合作伙伴</Link>
              <Link href="#partners" className="rounded-full border border-blue-300 bg-white px-7 py-3.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">查看合作伙伴</Link>
            </div>
          </div>
        </section>

        <section id="partners" className="scroll-mt-24 overflow-hidden px-0 py-20">
          <div className="mx-auto mb-10 max-w-7xl px-5 text-center">
            <p className="text-sm font-medium text-blue-600">合作伙伴</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">一起连接更多增长可能</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500">品牌标识自动循环流动，鼠标移入即可暂停查看。当前内容仅用于展示页面效果。</p>
          </div>
          <PartnerLogoMarquee />
          <p className="mx-auto mt-7 max-w-3xl px-5 text-center text-xs leading-6 text-gray-400">演示标识不代表已建立正式合作关系，最终展示以双方确认与授权为准。</p>
        </section>

        <section className="bg-white px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-medium text-blue-600">合作方式</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">从明确目标开始合作</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {MODELS.map((item, index) => (
                <article key={item.title} className="rounded-[24px] bg-[#f5f5f7] p-7 md:p-8">
                  <span className="text-sm font-semibold text-blue-600">0{index + 1}</span>
                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-gray-500">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="text-sm font-medium text-blue-600">合作标准</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">规则清楚，合作才能长久</h2><p className="mt-5 max-w-md text-base leading-8 text-gray-500">我们不会在官网展示未经确认的“合作伙伴”关系。正式合作前，双方将确认授权范围、信息使用方式和对外表述。</p></div>
            <div className="overflow-hidden rounded-[28px] bg-white px-7 shadow-sm ring-1 ring-black/[0.04] md:px-9">
              {PRINCIPLES.map(([title, description]) => (
                <div key={title} className="grid gap-2 border-b border-gray-100 py-7 last:border-0 md:grid-cols-[150px_1fr] md:items-center">
                  <h3 className="text-lg font-semibold">{title}</h3><p className="text-sm leading-7 text-gray-500">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-blue-600 px-8 py-14 text-white md:px-14">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div><p className="text-sm text-blue-100">成为婵梦科技合作伙伴</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">告诉我们您的能力与合作想法</h2><p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">我们将在收到信息后进行初步评估，并由相关负责人联系沟通。</p></div>
              <Link href="/contact" className="shrink-0 self-start rounded-full bg-white px-7 py-3.5 text-sm font-medium text-blue-600 hover:bg-blue-50">提交合作意向</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
