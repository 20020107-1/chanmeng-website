import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'

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
  '帮助企业实现从获客到成交的持续增长',
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

// ============ 战略定位（源自企业战略蓝图 V1.0 第02章，对外口径） ============
const POSITIONING = [
  { key: '服务对象', value: '有明确产品、搜索决策场景和销售承接能力的企业' },
  { key: '核心问题', value: 'AI搜索不可见、品牌同质化、流量不稳定、转化不足' },
  { key: '核心入口', value: 'GEO优化（生成式引擎优化／AI搜索优化）' },
  { key: '辅助渠道', value: '短视频自然流与付费投流' },
  { key: '增效底座', value: '商业诊断、差异化定位、产品和转化体系' },
  { key: '交付载体', value: '自研GEO工作台、知识库、SOP、数据看板' },
  { key: '结果承接', value: '成交优化、招商设计与执行辅导' },
]

// ============ 能力与差异化（第03章） ============
const CAPABILITIES = [
  { name: '商业底层', role: '效果保障与增效底座', solves: '企业输出什么、凭什么被选择、流量如何转化' },
  { name: 'GEO优化', role: '核心流量入口', solves: '企业如何进入AI搜索与生成式答案' },
  { name: '短视频', role: '辅助与放大渠道', solves: '如何扩大触达、教育市场并补充线索' },
  { name: '成交与招商', role: '结果承接', solves: '如何将线索变成订单、渠道与增长' },
  { name: 'GEO工作台', role: '标准化与规模化载体', solves: '如何提升交付效率、数据透明与持续复盘' },
]

const DIFFERENCES = [
  { not: '先发内容', but: '先校准商业定位', note: '避免将同质化、错误或缺乏证据的内容大规模放大' },
  { not: '单点曝光', but: '企业知识体系建设', note: '统一事实、品牌实体、产品服务、人物、案例、问答与权威来源' },
  { not: '流量终点', but: '连接成交与招商', note: '以线索质量、商机推进、成交周期和经营结果作为复盘方向' },
  { not: '纯人工项目', but: '服务与系统双轮驱动', note: '用工作台固化诊断、策略、生产、审核、分发和监测流程' },
  { not: '一次性项目', but: '持续运营机制', note: '以知识更新、内容迭代、AI答案监测和经营复盘形成复利' },
]

// ============ 增长闭环（第04章） ============
const GROWTH_LOOP = [
  { step: '01', name: '诊断', output: '综合诊断报告、问题优先级' },
  { step: '02', name: '定位', output: '定位总纲、产品服务架构' },
  { step: '03', name: '知识', output: '企业知识库、统一口径词典' },
  { step: '04', name: '内容', output: '内容矩阵与生产计划' },
  { step: '05', name: 'GEO', output: 'GEO执行记录' },
  { step: '06', name: '短视频', output: '短视频与投流计划' },
  { step: '07', name: '转化', output: '销售SOP与话术库' },
  { step: '08', name: '招商', output: '招商方案与执行清单' },
  { step: '09', name: '复盘', output: '月报、优化清单' },
]

const CORE_VALUES = [
  { title: '差异化', desc: '帮助企业形成清晰、可信、可验证的被选择理由' },
  { title: '流量', desc: '建立GEO主入口与短视频增量渠道的协同获客结构' },
  { title: '转化', desc: '优化从AI答案和内容触达到线索、商机与成交的路径' },
  { title: '增效', desc: '通过工作台、知识库和SOP降低返工、提升交付透明度' },
  { title: '闭环', desc: '将定位、内容、获客、成交、招商和经营复盘连成一体' },
]

// ============ 商业模式（第07章，对外口径） ============
const ENGINES = [
  { name: '服务引擎', desc: '诊断、策略、执行、监测、转化与招商服务', focus: '建立客户价值、案例和交付方法' },
  { name: '产品引擎', desc: '以GEO工作台为载体，向系统订阅与行业模板演进', focus: '内部打磨与客户协作验证' },
  { name: '生态引擎', desc: '面向伙伴的专业协作、培训认证与联合交付', focus: '在服务标准与质量控制成熟后逐步开放' },
]

const FLYWHEEL = [
  '服务发现真实需求：项目暴露客户高频问题、交付难点和数据缺口',
  '系统固化高价值流程：把可重复的诊断、策略、审核和监测沉淀为功能',
  '数据反哺方法与产品：用真实项目数据优化行业模板、问题库和执行建议',
  '效率提升扩大交付能力：降低重复劳动、缩短周期、提高客户透明度',
  '订阅与行业方案形成复利：由单项目收入升级为持续系统收入与垂直方案',
  '伙伴复制扩大市场：在质量可控的前提下通过专业协作与认证伙伴扩张',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader active="/about" />

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">关于婵梦科技</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            AI驱动的合伙制企业增长全链路平台
          </p>
        </div>

        <section id="service-audiences" className="mb-20 scroll-mt-24">
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
                <span className="text-blue-600 font-semibold">AI搜索获客、内容营销、全域流量与商业转化</span>，
                帮助企业和创业者找到可持续的增长路径。
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">核心定位：</strong>
                AI驱动的合伙制企业增长全链路平台。
              </p>
            </div>

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

        {/* ======== 战略定位（蓝图02章） ======== */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">战略定位</h2>
          <p className="text-center text-blue-600 font-medium mb-8">
            让企业在AI搜索中被看见、被理解、被信任，并把流量转化为可持续的业务增长
          </p>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10">
              婵梦科技面向AI搜索时代，帮助企业先明确差异化定位、产品价值和转化路径，再通过
              <span className="text-blue-600 font-semibold">GEO优化</span>获取高意向AI搜索流量，
              以短视频自然流和付费投流补充增量，并通过成交优化、招商设计和执行辅导承接流量。
              依托<span className="text-blue-600 font-semibold">自研GEO工作台</span>，
              我们把商业诊断、企业知识建设、内容生产、渠道分发、效果监测和经营复盘整合为可执行的增长闭环。
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {POSITIONING.map((p) => (
                <div key={p.key} className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-semibold text-blue-600 tracking-wide mb-2">{p.key}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{p.value}</p>
                </div>
              ))}
              <div className="bg-blue-600 rounded-xl p-5 shadow-sm flex items-center">
                <p className="text-sm text-white leading-relaxed font-medium">
                  以GEO优化为核心入口、以商业增长体系为效果保障、以自研GEO工作台为交付载体的全域流量增长服务商
                </p>
              </div>
            </div>
          </div>
        </section>

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

        {/* ======== 三大能力与差异化（蓝图03章） ======== */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">能力体系与差异化优势</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {CAPABILITIES.map((c) => (
              <div key={c.name} className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
                <h3 className="text-base font-bold text-gray-900">{c.name}</h3>
                <p className="text-xs font-medium text-blue-600 mt-1 mb-3">{c.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{c.solves}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">与常见市场方案的核心差异</h3>
            <div className="space-y-4 max-w-4xl mx-auto">
              {DIFFERENCES.map((d) => (
                <div key={d.but} className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-sm text-gray-800">
                    <span className="text-gray-400 line-through mr-2">不是{d.not}</span>
                    <span className="text-blue-600 font-semibold">而是{d.but}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{d.note}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-8 max-w-2xl mx-auto leading-relaxed">
              服务承诺：我们承诺专业过程与持续优化，不承诺特定平台的收录、引用、排名或确定营收。
            </p>
          </div>
        </section>

        {/* ======== 业务增长闭环（蓝图04章） ======== */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">业务增长闭环</h2>
          <div className="grid grid-cols-3 lg:grid-cols-9 gap-3 mb-10">
            {GROWTH_LOOP.map((g) => (
              <div key={g.step} className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm text-center">
                <p className="text-xs font-bold text-blue-600">{g.step}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{g.name}</p>
                <p className="text-[11px] text-gray-500 mt-2 leading-snug">{g.output}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CORE_VALUES.map((v) => (
              <div key={v.title} className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-base font-bold text-blue-600 mb-2">{v.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ======== 商业模式（蓝图07章） ======== */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">商业模式 · 服务引擎 × 产品引擎</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {ENGINES.map((e) => (
              <div key={e.name} className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{e.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{e.desc}</p>
                <p className="text-xs text-blue-600 font-medium">当前重点：{e.focus}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">增长飞轮</h3>
            <ol className="space-y-3 max-w-3xl mx-auto">
              {FLYWHEEL.map((f, i) => (
                <li key={f} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{f}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">品牌故事</h2>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-blue-600 mb-6">婵梦的由来</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <span className="text-blue-600 font-semibold">&quot;婵&quot;</span>，是婵娟，是美好，是希望；
              <span className="text-blue-600 font-semibold">&quot;梦&quot;</span>，是梦想，是追求，是远方。
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

        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-10 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">准备好一起成长了吗？</h2>
            <p className="text-gray-600 mb-6">从城市服务商到企业全案服务，总有一种合作方式适合你。</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all"
              >
                预约合作
              </Link>
              <Link
                href="/services"
                className="px-8 py-3.5 rounded-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold transition-all"
              >
                了解业务
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

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
