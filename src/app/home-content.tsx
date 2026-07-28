'use client'

import { useState, useMemo, useCallback, useEffect, lazy, Suspense, Component } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import BrandMark from '@/components/brand-mark'
import BrandName from '@/components/brand-name'
import SiteSearch from '@/components/site-search'

import ProgressBar from '@/components/progress-bar'
import BackToTop from '@/components/back-to-top'
import CustomerCases from '@/components/customer-cases'
import FaqSection from '@/components/faq-section'
import Footer from '@/components/footer'
import { NEWS_ARTICLES } from '@/data/news'
import { PRIMARY_NAV } from '@/data/navigation'
import NavigationDrawer from '@/components/navigation-drawer'
import NavPreview from '@/components/nav-preview'
import FloatingCta from '@/components/floating-cta'
import HoverBorderCard from '@/components/hover-border-card'
import PhoneVerificationFields from '@/components/phone-verification-fields'

// ============ Dynamic import: 3D Canvas ============
const ParticleCanvas = lazy(() =>
  import('./particle-canvas').catch(() => ({ default: () => null }))
)

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: Error) {
    console.warn('3D Canvas render error:', error)
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

function HeroBackground({ opacity }: { opacity: any }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-sky-50" />
      <Suspense fallback={null}>
        <ErrorBoundary>
          <ParticleCanvas />
        </ErrorBoundary>
      </Suspense>
    </motion.div>
  )
}

// ============ Types ============
interface NavItem { name: string; id: string; href: string }
interface FormData { company: string; contact: string; demand: string }
interface FormErrors { company?: string; contact?: string; demand?: string }

const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = '83098712-93d4-49fb-92c3-27126baab3c9'

// ============ Navigation Items ============
const NAV_ITEMS: NavItem[] = [
  { name: '首页', id: 'home', href: '/' },
  { name: '关于我们', id: 'about', href: '/about' },
  { name: '核心服务', id: 'services', href: '/services' },
  { name: '客户案例', id: 'cases', href: '/cases' },
  { name: '新闻动态', id: 'news', href: '/news' },
  { name: '渠道合作', id: 'partner', href: '/partner' },
  { name: '联系我们', id: 'contact', href: '/contact' },
]

// ============ Core services ============
const SERVICES = [
  { title: 'AI搜索获客', icon: '01', href: '/services/ai-search-acquisition', value: '提升品牌可见度，获得更精准的主动咨询', desc: '面向希望进入AI搜索与智能推荐场景的企业和个人IP，系统建设可被理解、验证和引用的品牌内容。', services: 'GEO优化｜AEO优化｜LLMO优化｜自研获客系统', scenes: '专业服务｜本地企业｜企业品牌｜个人IP' },
  { title: 'AI内容营销', icon: '02', href: '/services/ai-content-marketing', value: '提高内容效率，持续积累品牌信任', desc: '围绕真实客户问题和业务价值建立内容体系，用AI辅助策划、生产与复盘，让内容能够连接获客和转化。', services: '内容策划｜短视频运营｜直播策划｜IP与品牌建设', scenes: '企业内容升级｜创始人IP｜知识服务｜品牌传播' },
  { title: '全域流量运营', icon: '03', href: '/services/omnichannel-traffic-operations', value: '减少渠道依赖，沉淀可持续客户资产', desc: '整合自然流量、付费投放、公域触达和私域承接，让不同渠道围绕同一个客户与业务目标协同运行。', services: '自然流量｜付费投放｜短视频与直播｜私域沉淀', scenes: '新客增长｜渠道优化｜同城获客｜私域运营' },
  { title: '商业转化与增长', icon: '04', href: '/services/commercial-conversion-growth', value: '提升成交效率，让增长进入经营结果', desc: '从商业定位、产品结构到销讲成交和客户承接，帮助已有流量或专业能力的团队建立可复制的转化体系。', services: '商业设计｜产品体系｜销讲成交｜组织执行', scenes: '项目转化｜招商路演｜私域成交｜持续复购' },
]

const PROOF_POINTS = [
  { value: '8', label: 'AI平台矩阵', note: '点击查看平台范围', href: '/platforms' },
  { value: '6,933', label: '问题收录记录', note: '装修行业案例材料', href: '/cases/geo-decoration-multi-platform' },
  { value: '4', label: '核心业务模块', note: '覆盖获客、内容、流量与转化', href: '/services' },
]

const GROWTH_STEPS = [
  { number: '01', title: '诊断', desc: '明确目标客户、增长问题与当前链路' },
  { number: '02', title: '获客', desc: '通过GEO与自媒体建立精准流量入口' },
  { number: '03', title: '转化', desc: '筛选商机并连接内容、表单与销售跟进' },
  { number: '04', title: '复盘', desc: '用项目数据持续优化投入与交付' },
]

// ============ Solutions (3 industries) ============
const SOLUTIONS_PREVIEW = [
  { industry: '企业品牌', icon: '🏢', href: '/services#ai-content', pain: '内容效率不足，品牌表达缺少统一体系', approach: 'AI内容生产+品牌内容建设+全域传播' },
  { industry: '个人IP', icon: '◉', href: '/services#ai-content', pain: '定位不清晰，内容与商业转化脱节', approach: 'IP定位+内容运营+私域成交' },
  { industry: '本地商家', icon: '🏪', href: '/solutions/local-business-customer-growth', pain: '线上流量分散，客户难以持续沉淀', approach: 'AI搜索+自媒体获客+私域承接' },
]

// ============ Shared Styles ============
const S = {
  section: 'py-16 md:py-24 px-4 md:px-6 bg-white',
  sectionAlt: 'py-16 md:py-24 px-4 md:px-6 bg-blue-50/40',
  heading: 'text-3xl md:text-4xl font-bold text-center mb-16',
  card: 'bg-white rounded-xl border shadow-sm',
  cardHover: 'hover:shadow-md transition-all duration-300',
  input: 'w-full bg-white border border-blue-200 rounded-lg px-5 py-4 text-gray-800 placeholder-gray-400 caret-blue-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors',
  inputError: 'w-full bg-white border border-red-400 rounded-lg px-5 py-4 text-gray-800 placeholder-gray-400 caret-red-400 focus:outline-none focus:ring-1 focus:ring-red-400 transition-colors',
}

// ============ Color system ============
type Accent = 'indigo' | 'emerald' | 'cyan' | 'amber'

const accentMap: Record<Accent, { heading: string; border: string; cardHover: string }> = {
  indigo:  { heading: 'text-blue-600', border: 'border-blue-200', cardHover: 'hover:border-blue-400 hover:shadow-blue-100/50' },
  emerald: { heading: 'text-teal-600', border: 'border-teal-200', cardHover: 'hover:border-teal-400 hover:shadow-teal-100/50' },
  cyan:    { heading: 'text-sky-600',  border: 'border-sky-200',  cardHover: 'hover:border-sky-400 hover:shadow-sky-100/50' },
  amber:   { heading: 'text-amber-600',border: 'border-amber-200',cardHover: 'hover:border-amber-400 hover:shadow-amber-100/50' },
}

function SectionHeading({ children, accent = 'indigo' }: { children: string; accent?: Accent }) {
  const c = accentMap[accent]
  return (
    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className={`${S.heading} ${c.heading}`}>
      {children}
    </motion.h2>
  )
}

const fadeDir = { left: { x: -30, y: 0 }, right: { x: 30, y: 0 }, up: { x: 0, y: 20 } }

function FadeInView({ children, className = '', delay = 0, direction = 'up' }: { children: React.ReactNode; className?: string; delay?: number; direction?: keyof typeof fadeDir }) {
  return (
    <motion.div initial={{ opacity: 0, ...fadeDir[direction] }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

// ============ Toast ============
interface Toast { id: number; message: string; type: 'success' | 'error' }
let toastId = 0

function Toast({ toasts, remove }: { toasts: Toast[]; remove: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`px-5 py-3 rounded-lg text-sm font-medium shadow-lg cursor-pointer ${t.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}
            onClick={() => remove(t.id)}>
            {t.type === 'success' ? '✓ ' : '✗ '}{t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ============ Scroll-aware nav ============
function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const top = visible.reduce((best, e) => {
            const rect = e.target.getBoundingClientRect()
            if (rect.top < best.top) return { top: rect.top, id: e.target.id }
            return best
          }, { top: Infinity, id: '' })
          const idx = sectionIds.indexOf(top.id)
          if (idx >= 0) setActive(idx)
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])
  return active
}

// ============ Form validation ============
function validateForm(form: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!form.company.trim()) errors.company = '请输入公司名称'
  if (!form.contact.trim()) { errors.contact = '请输入联系电话' }
  else if (!/^1[3-9]\d{9}$/.test(form.contact.trim())) { errors.contact = '请输入有效的中国大陆手机号码' }
  if (!form.demand.trim()) errors.demand = '请简单描述您的需求'
  return errors
}

// ============ Main Component ============
export default function HomeContent() {
  const [activeNav, setActiveNav] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [form, setForm] = useState<FormData>({ company: '', contact: '', demand: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  const sectionIds = useMemo(() => NAV_ITEMS.map((n) => n.id), [])
  const observedActive = useActiveSection(sectionIds)
  const currentNav = observedActive ?? activeNav

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
  }, [])

  const removeToast = useCallback((id: number) => setToasts((prev) => prev.filter((t) => t.id !== id)), [])

  const scrollTo = useCallback((id: string) => {
    const idx = sectionIds.indexOf(id)
    if (idx >= 0) setActiveNav(idx)
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [sectionIds])

  const updateForm = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const id = e.target.id as keyof FormData
    setForm((prev) => ({ ...prev, [id]: e.target.value }))
    setErrors((prev) => ({ ...prev, [id]: undefined }))
  }, [])

  const submitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    const errs = validateForm(form)
    if (Object.keys(errs).length > 0) {
      e.preventDefault()
      setErrors(errs)
      addToast('请检查表单中的错误', 'error')
      return
    }
    if (!FORM_ENDPOINT) {
      e.preventDefault()
      addToast('咨询通道正在配置，请通过页面邮箱联系我们', 'error')
      return
    }
    addToast('正在提交，请在新页面查看结果', 'success')
  }, [form, addToast])

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <ProgressBar />
      {/* ======== 导航栏 ======== */}
      <nav className="apple-nav fixed w-full z-50" role="navigation" aria-label="主导航">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => {
              setActiveNav(0)
              setMobileOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2"
            aria-label="回到首页"
          >
            <BrandMark />
            <BrandName />
          </button>

          <div className="apple-nav-links hidden lg:flex items-center">
            {PRIMARY_NAV.map((item) => <NavPreview key={item.href} item={item} />)}
          </div>

          <div className="apple-nav-actions ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => { setSearchOpen(!searchOpen); setMobileOpen(false) }}
              className={`grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-black/5 ${searchOpen ? 'bg-black/5 text-blue-600' : 'text-gray-800'}`}
              aria-label={searchOpen ? '关闭站内搜索' : '打开站内搜索'}
              aria-expanded={searchOpen}
            >
              <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" strokeWidth="1.7" />
                <path d="m16 16 4.2 4.2" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
            <button className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-black/5" onClick={() => { setMobileOpen(!mobileOpen); setSearchOpen(false) }} aria-label={mobileOpen ? '关闭全部导航' : '打开全部导航'} aria-expanded={mobileOpen}>
              <span className="relative block h-3.5 w-4" aria-hidden="true"><i className={`absolute left-0 top-[2px] block h-px w-4 bg-gray-800 transition-all duration-200 ${mobileOpen ? 'translate-y-[5px] rotate-45' : ''}`} /><i className={`absolute left-0 top-[7px] block h-px w-4 bg-gray-800 transition-opacity duration-150 ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} /><i className={`absolute bottom-[1px] left-0 block h-px w-4 bg-gray-800 transition-all duration-200 ${mobileOpen ? '-translate-y-[5px] -rotate-45' : ''}`} /></span>
            </button>
          </div>
        </div>
        <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
        <NavigationDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </nav>

      {/* ======== 首屏 Hero ======== */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" aria-label="首页">
        <HeroBackground opacity={opacity} />
        <div className="relative z-10 text-center px-4 max-w-5xl translate-y-6 md:translate-y-12">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <p className="mb-6 text-sm md:text-base font-medium tracking-[0.08em] text-slate-500">婵梦科技｜企业增长服务</p>
            <h1 className="font-semibold leading-[1.07] tracking-[-0.055em]">
              <span className="block text-4xl text-slate-900 md:text-[64px] lg:text-[72px]">让企业获客更精准</span>
              <span className="mt-1 block text-[38px] text-blue-600 md:text-[58px] lg:text-[66px]">让客户成交更顺畅</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <span className="block">面向企业与个人IP，</span>
            <span className="block mt-1">提供从AI搜索获客、内容营销到商业转化的一站式增长服务。</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.45 }}
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact"
              className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition-all text-white font-semibold text-lg shadow-lg shadow-blue-500/25">
              咨询增长方案
            </Link>
            <Link href="/cases"
              className="px-10 py-4 rounded-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition font-semibold text-lg">
              查看客户案例
            </Link>
          </motion.div>
        </div>

        <motion.button type="button" onClick={() => scrollTo('service-overview')} aria-label="向下探索，查看服务概览"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
          className="group hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2.5 text-blue-600 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 rounded-full">
          <span className="text-sm font-medium tracking-[0.2em] transition-colors group-hover:text-blue-700">向下探索</span>
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-300 bg-white/80 shadow-sm shadow-blue-900/10 backdrop-blur transition-all duration-300 group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:shadow-md">
            <span className="-mt-1 h-3.5 w-3.5 rotate-45 border-b-2 border-r-2 border-blue-500" aria-hidden="true" />
          </motion.span>
        </motion.button>
      </section>

      <section id="service-overview" className="relative z-20 bg-white px-4 pb-16 pt-5 md:px-6 md:pb-24 scroll-mt-24" aria-label="项目成果">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-600">SELECTED OUTCOMES</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-slate-950 md:text-4xl">先看真实项目，再谈增长方案</h2>
          </div>
          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-3">
            {PROOF_POINTS.map((item) => (
              <Link href={item.href} key={item.label} className="group border-b border-slate-200 px-7 py-8 text-center transition-colors hover:bg-blue-50/60 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <strong className="block text-4xl font-semibold tracking-[-0.045em] text-blue-600 md:text-5xl">{item.value}</strong>
                <span className="mt-3 block text-base font-semibold text-slate-900">{item.label}</span>
                <span className="mt-1 block text-xs text-slate-400">{item.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== 公司简介 ======== */}
      <section id="about" className={S.section} aria-label="关于我们">
        <div className="max-w-5xl mx-auto">
          <SectionHeading accent="indigo">关于婵梦科技</SectionHeading>
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-start">
            <FadeInView direction="left">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">杭州婵梦传媒科技有限公司</h3>
              <p className="text-gray-600 leading-relaxed mb-4">我们面向企业与个人IP，提供AI搜索获客、AI内容营销、全域流量运营与商业转化服务。</p>
              <p className="text-gray-600 leading-relaxed mb-4">从问题诊断、内容与投放，到商机筛选和项目复盘，我们用可执行的服务路径帮助客户建立更清晰的增长链路。</p>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">核心定位：</strong>
                以AI搜索优化和自研系统为技术底座，以内容营销和全域流量为获客入口，以商业设计和销讲体系为转化支撑的全链路增长服务商。
              </p>
            </FadeInView>
            <FadeInView direction="right">
              <div className="border-l-2 border-blue-600 py-2 pl-7">
                <p className="text-sm font-semibold text-blue-600">我们的原则</p>
                <p className="mt-4 text-2xl font-semibold leading-9 tracking-[-0.03em] text-slate-900">不为曝光制造数字，<br />只围绕真实业务问题推进。</p>
                <p className="mt-5 text-sm leading-7 text-slate-500">坚持实干、透明与长期合作，以双方确认的项目范围和数据作为交付依据。</p>
              </div>
            </FadeInView>
          </div>
          <div className="mt-10 text-center">
            <Link href="/about" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              了解更多</Link>
          </div>
        </div>
      </section>

      {/* ======== 核心服务预览 ======== */}
      <section id="services" className={S.sectionAlt} aria-label="核心服务">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-sky-600 mb-3">CORE SERVICES</p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900 md:text-5xl">四项业务协同，<br />创造长期增长价值</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-gray-600 md:text-lg">以AI技术和自研系统为底座，通过AI搜索获客、AI内容营销、全域流量运营与商业转化，为企业和个人IP提供从内容生产到客户成交的一体化增长服务。</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {SERVICES.map((svc, i) => (
              <FadeInView key={svc.title} delay={i * 0.1}>
                <Link href={svc.href} className="group block h-full rounded-[24px] border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_20px_55px_rgba(15,44,88,.08)] md:p-9">
                  <div className="flex items-start justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">{svc.icon}</div>
                    <span className="text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">了解详情</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{svc.title}</h3>
                  <p className="mt-3 text-lg font-semibold leading-7 text-blue-600">{svc.value}</p>
                  <p className="mt-5 text-[15px] leading-7 text-gray-600">{svc.desc}</p>
                  <dl className="mt-7 space-y-4 border-t border-slate-100 pt-6 text-sm">
                    <div><dt className="text-slate-400">核心服务</dt><dd className="mt-1.5 leading-6 text-slate-700">{svc.services}</dd></div>
                    <div><dt className="text-slate-400">适用场景</dt><dd className="mt-1.5 leading-6 text-slate-700">{svc.scenes}</dd></div>
                  </dl>
                </Link>
              </FadeInView>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              查看全部服务</Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-16 text-white md:px-6 md:py-24" aria-label="服务方法">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-blue-400">HOW WE WORK</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">从诊断到复盘，<br />每一步都服务于结果</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl md:leading-9">我们不把获客、投放和销售割裂开来，而是围绕同一个业务目标持续推进和校准。</p>
          </div>
          <div className="mt-12 grid border-t border-white/15 md:grid-cols-4">
            {GROWTH_STEPS.map((step) => (
              <div key={step.number} className="border-b border-white/15 py-7 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                <span className="text-base font-semibold text-blue-400">{step.number}</span>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 max-w-[16rem] text-base leading-7 text-slate-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== 解决方案预览 ======== */}
      <section id="solutions-section" className={S.section} aria-label="解决方案">
        <div className="max-w-7xl mx-auto">
          <SectionHeading accent="emerald">行业方案</SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            {SOLUTIONS_PREVIEW.map((sol, i) => (
              <FadeInView key={sol.industry} delay={i * 0.1}>
                <Link href={sol.href} className="group block bg-white rounded-xl border border-teal-200 p-6 h-full hover:-translate-y-1 hover:border-teal-400 hover:shadow-md transition-all duration-300">
                  <div className="text-3xl mb-3">{sol.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-3">{sol.industry}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-500"><span className="text-rose-500 font-medium">痛点：</span>{sol.pain}</p>
                    <p className="text-gray-500"><span className="text-teal-600 font-medium">方案：</span>{sol.approach}</p>
                  </div>
                  <span className="mt-5 inline-flex text-xs text-blue-600">查看方案</span>
                </Link>
              </FadeInView>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/solutions" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              查看全部方案</Link>
          </div>
        </div>
      </section>

      {/* ======== 客户案例 ======== */}
      <CustomerCases />

      {/* ======== 新闻动态 ======== */}
      <section id="news" className="py-16 md:py-24 px-4 md:px-6 bg-[#f5f5f7] scroll-mt-16" aria-label="新闻动态">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div><p className="text-xs font-semibold tracking-[0.2em] text-blue-600 mb-3">NEWSROOM</p><h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.045em] text-[#1d1d1f]">新闻与观点</h2><p className="mt-4 text-gray-500">记录公司进展，分享企业增长与AI应用的持续思考。</p></div>
            <Link href="/news" className="text-sm text-blue-600 hover:underline">查看全部新闻</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {NEWS_ARTICLES.slice(0, 3).map((article) => (
              <Link key={article.slug} href={`/news/${article.slug}`}
                className="group relative min-h-[320px] overflow-hidden rounded-[2rem] border border-black/5 bg-white p-7 text-[#1d1d1f] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 md:p-8 flex flex-col justify-between">
                <span className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-100/80 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                <p className="relative text-xs text-gray-500">{article.category} · {article.date}</p>
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.04em] leading-tight">{article.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-gray-500">{article.summary}</p>
                  <span className="mt-6 inline-flex text-sm text-blue-600">阅读全文</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== 渠道合作 ======== */}
      <section id="partner" className="border-y border-slate-200 bg-white px-4 py-12 md:px-6" aria-label="合作伙伴">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-base font-semibold text-blue-600">合作伙伴</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">寻找能够长期共同交付价值的伙伴</h2>
          </div>
          <Link href="/partner" className="shrink-0 rounded-full border border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50">了解合作方式</Link>
        </div>
      </section>

      {/* ======== 常见问题 ======== */}
      <FaqSection />

      {/* ======== 联系我们 ======== */}
      <section id="contact" className={S.section} aria-label="联系我们">
        <div className="max-w-3xl mx-auto">
          <SectionHeading accent="indigo">预约咨询</SectionHeading>
          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-5"
            action={FORM_ENDPOINT}
            method="POST"
            target="_blank"
            onSubmit={submitForm}
            noValidate
          >
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="hidden" name="subject" value="婵梦科技官网｜首页客户咨询" />
            <input type="hidden" name="from_name" value="婵梦科技官网" />
            <input type="hidden" name="redirect" value="https://web3forms.com/success" />
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">公司名称 *</label>
              <input id="company" name="公司名称" type="text" placeholder="请输入公司名称" autoComplete="organization" value={form.company} onChange={updateForm}
                className={errors.company ? S.inputError : S.input}
                aria-invalid={!!errors.company} aria-describedby={errors.company ? 'company-error' : undefined} />
              {errors.company && <p id="company-error" className="mt-1 text-sm text-red-600">{errors.company}</p>}
            </div>
            <PhoneVerificationFields
              id="contact"
              name="手机号码"
              value={form.contact}
              onChange={e => {
                setForm((prev) => ({ ...prev, contact: e.target.value.replace(/\D/g, '') }))
                setErrors((prev) => ({ ...prev, contact: undefined }))
              }}
              error={errors.contact}
              inputClassName={errors.contact ? S.inputError : S.input}
            />
            <div>
              <label htmlFor="demand" className="block text-sm font-medium text-gray-700 mb-1">需求描述 *</label>
              <textarea id="demand" name="需求描述" placeholder="请描述您的需求（服务咨询 / 合作意向 / 其他）" autoComplete="off" rows={5} value={form.demand} onChange={updateForm}
                className={`${errors.demand ? S.inputError : S.input} resize-none`}
                aria-invalid={!!errors.demand} aria-describedby={errors.demand ? 'demand-error' : undefined} />
              {errors.demand && <p id="demand-error" className="mt-1 text-sm text-red-600">{errors.demand}</p>}
            </div>
            <button type="submit" disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-500 disabled:from-blue-300 disabled:to-blue-400 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold text-lg transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
              {submitting && (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {submitting ? '提交中...' : '提交咨询'}
            </button>
          </motion.form>
          <iframe name="_formsubmit" className="hidden" title="表单提交" />
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">或直接联系我们</p>
            <p className="text-gray-500 text-sm mt-2">
              📧 企微客服邮箱：<a href="mailto:yaoyuan@chanmengtech.cn" className="text-blue-600 hover:text-blue-700 transition-colors">yaoyuan@chanmengtech.cn</a>
            </p>
            <p className="text-gray-400 text-xs mt-2">提交需求后，我们将在 1 个工作日内与您联系</p>
          </div>
        </div>
      </section>

      {/* ======== 页脚 ======== */}
      <Footer />

      <Toast toasts={toasts} remove={removeToast} />
      <BackToTop />
      <FloatingCta />
    </main>
  )
}
