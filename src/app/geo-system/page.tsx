import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'GEO增长系统｜婵梦科技',
  description:
    '婵梦GEO工作台是一套面向企业与GEO服务团队的全链路AI搜索增长运营系统，贯通商业诊断、企业知识建设、内容生产、多平台分发、效果监测和经营复盘。',
  keywords: ['GEO工作台', 'GEO优化系统', 'AI搜索优化', '生成式引擎优化', '婵梦科技'],
  robots: { index: true, follow: true },
}

// ============ 三种关键能力（蓝图05章，对外口径） ============
const SYSTEM_ROLES = [
  {
    name: '交付操作系统',
    now: '固化10步SOP、任务、审核、协作与项目进度',
    future: '支持多客户、多团队的标准化交付',
  },
  {
    name: '数据与知识中枢',
    now: '沉淀事实、Prompt、内容、发布和监测数据',
    future: '形成行业基准、策略模型和知识资产',
  },
  {
    name: '产品化增长引擎',
    now: '提升服务效率和客户可视化体验',
    future: '演进为订阅、伙伴协作与企业自助形态',
  },
]

// ============ 10步产品主流程（蓝图05章） ============
const MAIN_FLOW = [
  { step: '01', name: '行业与竞争分析', desc: '识别赛道、竞争实体、客户问题和差异空间' },
  { step: '02', name: 'AI搜索基线诊断', desc: '监测品牌提及、引用、准确性、情感和来源' },
  { step: '03', name: '客户问题与Prompt词库', desc: '按画像、意图和决策阶段组织问题' },
  { step: '04', name: '商业定位与内容规划', desc: '把差异化、产品价值和转化路径转为内容主题' },
  { step: '05', name: '企业知识库与品牌实体', desc: '沉淀事实、证据、产品、人物、案例与关系' },
  { step: '06', name: '官网及Schema结构化', desc: '改善网站信息架构、实体表达和机器可理解性' },
  { step: '07', name: 'GEO内容生产', desc: '形成事实型问答、专题、解决方案、案例与媒体内容' },
  { step: '08', name: '事实审核与人工校对', desc: '控制真实性、版权、敏感行业与承诺边界' },
  { step: '09', name: '多平台内容分发', desc: '根据渠道规则发布、更新并记录内容资产' },
  { step: '10', name: 'AI搜索监测与持续复盘', desc: '将AI表现、流量、线索和经营数据连接起来' },
]

// ============ 功能架构（蓝图06章） ============
const FEATURE_DOMAINS = [
  { name: '商业诊断', features: '客户画像、商业模式、定位、产品和转化诊断', states: '待确认 / 已确认 / 需优化' },
  { name: '事实与证据中心', features: '企业事实、来源、授权、有效期和公开范围', states: '已确认 / 待确认 / 缺证据 / 过期' },
  { name: '策略中心', features: '行业分析、AI诊断、问题库、内容与渠道规划', states: '优先级 / 负责人 / 截止日期' },
  { name: '内容生产', features: '知识调用、AI初稿、人工校对、版本与审核', states: '草稿 / 审核中 / 通过 / 退回' },
  { name: '分发与实体建设', features: '官网、媒体、社媒、第三方来源和结构化数据', states: '待发布 / 已发布 / 需更新' },
  { name: '效果监测', features: '提及、引用、准确性、来源、竞品和趋势', states: '基线 / 周环比 / 月环比' },
  { name: '经营转化', features: '访问、咨询、线索、商机、成交、招商与收入', states: '渠道归因 / 阶段 / 金额' },
  { name: '客户协作', features: '资料收集、任务确认、内容审核、验收与报告', states: '客户待办 / 逾期 / 已完成' },
]

// ============ 数据看板（蓝图06章） ============
const DASHBOARDS = [
  { name: '项目健康度', desc: '整体进度、风险、逾期任务、客户待办和本周重点' },
  { name: 'GEO表现', desc: '重点问题覆盖、品牌提及、引用率、答案准确率和来源结构' },
  { name: '知识与内容资产', desc: '事实完整度、证据覆盖率、内容生产与更新状态' },
  { name: '流量与转化', desc: 'AI引荐、短视频、有效线索、商机、成交与招商进度' },
  { name: '下一步行动', desc: '系统依据缺口和变化生成可解释、可执行的优先任务' },
]

export default function GeoSystemPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader active="/geo-system" />

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">GEO增长系统</h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            婵梦GEO工作台是一套面向企业与GEO服务团队的全链路AI搜索增长运营系统，
            贯通商业诊断、企业知识建设、内容规划生产、事实审核、多平台分发、效果监测和经营复盘。
          </p>
        </div>

        {/* ======== 三种关键能力 ======== */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">三种关键能力</h2>
          <p className="text-center text-gray-500 mb-8">系统不是独立的业务口号，而是服务与产品的共同底座</p>
          <div className="grid md:grid-cols-3 gap-6">
            {SYSTEM_ROLES.map((r) => (
              <div key={r.name} className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-blue-600 mb-4">{r.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  <span className="font-semibold text-gray-900">当前价值：</span>{r.now}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  <span className="font-semibold text-gray-700">演进方向：</span>{r.future}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ======== 10步产品主流程 ======== */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">10步产品主流程</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {MAIN_FLOW.map((f) => (
              <div key={f.step} className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                <p className="text-xs font-bold text-blue-600">{f.step}</p>
                <h3 className="text-sm font-semibold text-gray-900 mt-1.5 mb-2">{f.name}</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ======== 功能架构 ======== */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">工作台功能架构</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURE_DOMAINS.map((d) => (
              <div key={d.name} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">{d.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">{d.features}</p>
                <p className="text-[11px] text-blue-600 font-medium">{d.states}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ======== 数据看板 ======== */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">数据看板</h2>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
            <div className="space-y-3 max-w-3xl mx-auto">
              {DASHBOARDS.map((d, i) => (
                <div key={d.name} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{d.name}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-8 leading-relaxed">
              工作台功能随项目迭代持续升级，具体能力以双方确认的项目方案与实际交付为准。
            </p>
          </div>
        </section>

        {/* ======== CTA ======== */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-10 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">想用系统化的方式做增长？</h2>
            <p className="text-gray-600 mb-6">从一次免费的AI可见度初步诊断开始，看清品牌在AI搜索里的真实位置。</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/contact?intent=ai-diagnosis"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all"
              >
                免费获取初步诊断
              </Link>
              <Link
                href="/services/geo-primary-acquisition"
                className="px-8 py-3.5 rounded-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold transition-all"
              >
                了解GEO获客服务
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
