import type { Metadata } from 'next'
import Link from 'next/link'
import BrandMark from '@/components/brand-mark'
import BrandName from '@/components/brand-name'

export const metadata: Metadata = {
  title: '关于我们',
  description:
    '了解婵梦科技——AI驱动的合伙制企业增长全链路平台。使命是以AI赋能人才，以合伙成就事业。',
  keywords: ['婵梦科技', '关于我们', '公司介绍', '创始人', '企业服务', '杭州', '品牌故事'],
  openGraph: {
    title: '关于婵梦科技 | AI驱动的合伙制企业增长全链路平台',
    description:
      '了解婵梦科技的公司定位、企业使命、愿景与核心价值观。',
  },
  robots: { index: true, follow: true },
}

const STATS = [
  { value: '2026', label: '成立年份' },
  { value: '杭州', label: '总部所在地' },
  { value: '3类', label: '核心服务对象' },
  { value: '5项', label: '核心价值观' },
]

const MISSIONS = [
  '以AI赋能人才',
  '以合伙成就事业',
  '让创业者找到清晰的增长路径',
  '帮助企业实现从获客到出海的突破',
  '让AI成为每个人都能使用的增长工具',
]

const VISION_POINTS = [
  '构建充满活力的合伙人生态',
  '连接企业需求、人才能力与业务机会',
  '形成可复制、可持续的增长服务体系',
  '让合伙共创成为企业增长的新选择',
]

const VALUES = [
  { title: '合伙共创', desc: '合资源、资金、能力、机会与利润，做让所有合伙人共同增益的事' },
  { title: 'AI驱动', desc: '让AI参与关键流程，用技术持续提升获客、转化与交付效率' },
  { title: '实干为先', desc: '不画饼、不吹牛，能交付的才承诺' },
  { title: '开放共赢', desc: '坚持利润共享、信息透明、规则公开' },
  { title: '长期主义', desc: '不做短期收割，建设可持续的长期合伙生态' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 导航条 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark />
            <BrandName />
          </Link>
          <Link href="/#contact" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            联系我们
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* 标题 */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">关于婵梦科技</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            AI驱动的合伙制企业增长全链路平台
          </p>
        </div>

        {/* 公司概况 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">公司概况</h2>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 leading-relaxed mb-6">
                <strong className="text-gray-900">杭州婵梦传媒科技有限公司</strong>成立于
                <span className="text-blue-600 font-semibold">2026年5月</span>，总部位于
                <span className="text-blue-600 font-semibold">杭州市萧山区</span>，
                是一家以AI为核心工具、以合伙制为组织方式的企业增长生态平台。
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                我们服务企业客户、内部合伙人与外部合伙人，通过
                <span className="text-blue-600 font-semibold">流量获客、商业转化、品牌出海与AI赋能</span>，
                帮助企业和创业者找到可持续的增长路径。
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">核心定位：</strong>
                AI驱动的合伙制企业增长全链路平台。
              </p>
            </div>

            {/* 数据卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
              {STATS.map((s) => (
                <div key={s.label} className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">{s.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 使命 · 愿景 · 价值观 */}
        <section className="mb-20 grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-blue-600 mb-4">🎯 企业使命</h3>
            <ul className="space-y-2">
              {MISSIONS.map((m) => (
                <li key={m} className="text-gray-700 text-sm flex items-center gap-2">
                  <span className="text-blue-400">•</span> {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-emerald-600 mb-4">🔭 企业愿景</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4 font-medium">
              成为中国最具活力的合伙制企业增长生态平台。
            </p>
            <ul className="space-y-2">
              {VISION_POINTS.map((point) => (
                <li key={point} className="text-gray-700 text-sm flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-violet-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-violet-600 mb-4">💎 核心价值观</h3>
            <ul className="space-y-3">
              {VALUES.map((v) => (
                <li key={v.title}>
                  <p className="text-gray-800 text-sm font-medium">{v.title}</p>
                  <p className="text-gray-500 text-xs">{v.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 品牌故事 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">品牌故事</h2>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-blue-600 mb-6">婵梦的由来</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <span className="text-blue-600 font-semibold">"婵"</span>，是婵娟，是美好，是希望；
              <span className="text-blue-600 font-semibold">"梦"</span>，是梦想，是追求，是远方。
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              我们见过太多创业者——有好的产品、好的技术、好的团队，却因为不懂流量、不懂运营，倒在成功路上。
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              我们见过太多工厂老板——一辈子兢兢业业生产最好的产品，却因为没有渠道、没有客户，只能关门大吉。
            </p>
            <p className="text-gray-700 leading-relaxed">
              婵梦科技，就是要做创业者的<span className="text-blue-600 font-semibold">坚强后盾</span>，
              做企业的<span className="text-blue-600 font-semibold">终身增长合伙人</span>。
              让每一个创业者的梦想，都能在婵梦绽放。
            </p>
          </div>
        </section>

        {/* 创始人 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">创始团队 · 十年深耕，只为这一天</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-blue-200 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-4">萱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">萱盛果</h3>
              <p className="text-blue-600 text-sm font-medium mb-4">创始人 · 转化成交负责人</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                12年企业招商与销讲经验，擅长招商会承接、科学转化流程设计与一对多成交，帮助企业缩短变现路径，以成交和现金流结果为导向。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-blue-200 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-2xl font-bold mb-4">V</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vivian</h3>
              <p className="text-violet-600 text-sm font-medium mb-4">联合创始人 · AI获客负责人</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                专注AI精准获客与渠道优化，通过爆款短视频、IP打造和付费流量放大，持续提升流量效率，帮助企业获得更多精准客户。
              </p>
            </div>
          </div>
          <div className="bg-gray-900 text-gray-300 rounded-2xl p-8 max-w-3xl mx-auto mt-8">
            <p className="text-white text-lg font-semibold mb-3">创始人心声</p>
            <p className="leading-relaxed text-sm text-gray-400">
              我们始终相信，企业增长不应只停留在流量和方法上，而要真正落实到客户、成交与现金流。一个负责用AI和内容帮助企业找到更多精准客户，一个负责通过科学的转化体系推动成交、拿到结果。我们希望把获客与转化真正连接起来，陪伴企业走出一条更清晰、更高效、更可持续的增长路径。
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-10 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">准备好一起成长了吗？</h2>
            <p className="text-gray-600 mb-6">从城市服务商到企业全案服务，总有一种合作方式适合你。</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/#contact"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all"
              >
                预约合作
              </Link>
              <Link
                href="/#business"
                className="px-8 py-3.5 rounded-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold transition-all"
              >
                了解业务
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-500 py-8 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/" className="hover:text-gray-300 transition-colors">首页</Link>
            <span className="text-gray-300">关于我们</span>
            <Link href="/services" className="hover:text-gray-300 transition-colors">核心服务</Link>
            <Link href="/solutions" className="hover:text-gray-300 transition-colors">解决方案</Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">隐私政策</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">服务条款</Link>
          </div>
          <p>© 2026 杭州婵梦传媒科技有限公司 · 保留所有权利</p>
          <p className="text-gray-600 text-xs mt-2">
          </p>
        </div>
      </footer>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: '关于婵梦科技',
            description:
              '了解婵梦科技——AI驱动的合伙制企业增长全链路平台。使命是以AI赋能人才，以合伙成就事业。',
            url: 'https://chanmeng.com/about',
            about: {
              '@type': 'Organization',
              name: '杭州婵梦传媒科技有限公司',
              foundingDate: '2026-05',
              founder: [
                { '@type': 'Person', name: '萱盛果' },
                { '@type': 'Person', name: 'Vivian' },
              ],
            },
          }),
        }}
      />
    </div>
  )
}
