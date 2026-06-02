import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '关于我们',
  description:
    '了解婵梦科技——中国企业终身增长合伙人。成立于2026年5月，总部位于杭州萧山，通过AI+流量+人才+产业四维模式为企业提供全链路增长服务。',
  keywords: ['婵梦科技', '关于我们', '公司介绍', '创始人', '企业服务', '杭州', '品牌故事'],
  openGraph: {
    title: '关于婵梦科技 | 中国企业终身增长合伙人',
    description:
      '了解婵梦科技的品牌故事、创始团队与企业使命。AI+流量+人才+产业，四维驱动企业增长。',
  },
  robots: { index: true, follow: true },
}

const STATS = [
  { value: '2026', label: '成立年份' },
  { value: '杭州', label: '总部所在地' },
  { value: '5+', label: '核心业务板块' },
  { value: '12+', label: '产业园免费服务' },
]

const MISSIONS = [
  '用AI赋能人才',
  '用流量驱动增长',
  '用服务成就品牌',
  '让中国智造走向世界',
]

const VALUES = [
  { title: '客户第一 · 结果为王', desc: '一切以客户成功为衡量标准，不达目标不罢休' },
  { title: '专业为本 · 数据说话', desc: '每一项决策都基于真实数据，每一次交付都追求极致' },
  { title: '温度服务 · 终身陪伴', desc: '不只是服务商，更是企业成长路上的终身伙伴' },
  { title: '技术驱动 · AI赋能', desc: '拥抱前沿技术，用AI帮助企业降本增效' },
  { title: '合伙共赢 · 长期主义', desc: '与合作伙伴共同成长，共创长期价值' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 导航条 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-white">CM</div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">婵梦科技</span>
          </Link>
          <Link href="/#contact" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            联系我们 →
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* 标题 */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">关于婵梦科技</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            中国企业终身增长合伙人
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
                是一家专注于为中国企业提供全链路增长服务的综合性平台公司。
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                我们通过<span className="text-blue-600 font-semibold">AI+流量+人才+产业</span>的四维模式，
                为企业提供从人才孵化、流量获客、品牌出海到全链路服务的一站式解决方案。
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">核心定位：</strong>
                中国企业终身增长合伙人。我们不做二房东，不做培训机构，不做一次性代运营。
                我们是企业的长期增长服务伙伴。
                ——这是我们唯一的商业逻辑。
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
            <p className="text-gray-700 text-sm leading-relaxed">
              成为一家受尊敬的企业全链路增长服务提供商。
            </p>
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
              <p className="text-blue-600 text-sm font-medium mb-4">创始人</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                12年企业招商与销讲经验，熟悉企业服务市场。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-blue-200 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-2xl font-bold mb-4">V</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vivian</h3>
              <p className="text-violet-600 text-sm font-medium mb-4">联合创始人</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                10年跨境电商运营经验，深谙北美、欧洲、东南亚市场打法。
              </p>
            </div>
          </div>
          <div className="bg-gray-900 text-gray-300 rounded-2xl p-8 max-w-3xl mx-auto mt-8">
            <p className="text-white text-lg font-semibold mb-3">创始人心声</p>
            <p className="leading-relaxed text-sm text-gray-400">
              10年前，我们进入互联网行业，从普通运营一步步做到投流总监、公司合伙人。近年来，我们关注到跨境电商和AI技术的快速发展——也发现许多企业在数字化和全球化转型中面临挑战。于是，我们决定创办婵梦科技，将多年积累的投流经验、跨境理解和AI应用整合，打造全链路企业增长服务平台。
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
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">浙ICP备XXXXXXXX号</a>
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
              '了解婵梦科技——中国企业终身增长合伙人。成立于2026年5月，总部位于杭州萧山，通过AI+流量+人才+产业四维模式为企业提供全链路增长服务。',
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
