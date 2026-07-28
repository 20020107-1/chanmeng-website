import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: '渠道合作',
  description: '婵梦科技渠道合作伙伴计划 — 城市服务商、业务合伙人、生态合作伙伴。',
  robots: { index: true, follow: true },
}

const COOPERATION_MODELS = [
  {
    title: '城市服务商',
    desc: '在指定区域内，代表婵梦科技拓展本地企业客户并提供落地服务支持',
    support: ['品牌授权与区域保护', '产品培训与销售赋能', '市场推广物料支持', '总部技术团队支撑'],
  },
  {
    title: '业务合伙人',
    desc: '利用自身人脉与行业资源，推荐企业客户并协助签约落地',
    support: ['一对一业务辅导', '高比例合作分成', '签约流程全程支持', '推荐客户持续绑定'],
  },
  {
    title: '生态合作伙伴',
    desc: '与婵梦科技在技术、产品、渠道等层面展开深度合作',
    support: ['技术对接与联合方案', '双方品牌联合曝光', '客户资源共享', '不定期战略研讨会'],
  },
]

const JOIN_PROCESS = [
  { step: '01', title: '提交申请', desc: '在线填写合作意向表单' },
  { step: '02', title: '资质审核', desc: '总部进行背景与资源评估' },
  { step: '03', title: '洽谈签约', desc: '明确合作模式与权益边界' },
  { step: '04', title: '培训赋能', desc: '产品培训与体系导入' },
  { step: '05', title: '启动运营', desc: '正式开展业务合作' },
]

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader active="/partner" />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">渠道合作</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            与城市服务商、业务合伙人、生态伙伴一起，共同服务中国企业增长
          </p>
        </div>

        <section className="mb-20 grid gap-6 md:grid-cols-2">
          <div id="internal-partner" className="scroll-mt-24 rounded-2xl bg-blue-50 p-8 md:p-10"><p className="text-sm font-medium text-blue-600">内部合伙人</p><h2 className="mt-3 text-2xl font-bold text-gray-900">从学习实践到项目协作</h2><p className="mt-4 text-sm leading-7 text-gray-600">面向希望发展个人事业的大学生、宝妈与全职创业者，提供方向、技能、AI工具和真实项目实践支持。</p><Link href="/contact" className="mt-6 inline-flex text-sm text-blue-600">咨询内部合伙人计划</Link></div>
          <div id="external-partner" className="scroll-mt-24 rounded-2xl bg-emerald-50 p-8 md:p-10"><p className="text-sm font-medium text-emerald-600">外部合伙人</p><h2 className="mt-3 text-2xl font-bold text-gray-900">连接渠道资源与成熟业务</h2><p className="mt-4 text-sm leading-7 text-gray-600">面向销售人才、渠道资源方与本地服务者，连接成熟服务能力、交付体系和长期合作机会。</p><Link href="/contact" className="mt-6 inline-flex text-sm text-emerald-700">咨询外部合伙人计划</Link></div>
        </section>

        {/* 合作模式 */}
        <section id="cooperation-models" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">合作模式</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {COOPERATION_MODELS.map((model) => (
              <div key={model.title} className="bg-white rounded-2xl border border-blue-100 p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{model.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{model.desc}</p>
                <div>
                  <p className="text-xs font-semibold text-blue-500 mb-3">平台支持</p>
                  <ul className="space-y-2">
                    {model.support.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="text-blue-400 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 合作流程 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">合作流程</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {JOIN_PROCESS.map((step) => (
              <div key={step.step} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mx-auto mb-3">{step.step}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                <p className="text-gray-500 text-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 合作条件 */}
        <section className="mb-20">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">合作意向</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center">
              如果您拥有企业客户资源、行业经验或区域市场优势，欢迎联系我们了解合作详情。
              具体合作条件与权益以双方签署的正式合作协议为准。
            </p>
            <div className="text-center">
              <Link href="/contact" className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all">
                提交合作申请
              </Link>
            </div>
            <p className="text-center text-gray-400 text-xs mt-6">
              * 合作有风险，加入前请充分了解合作条款与权利义务
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
