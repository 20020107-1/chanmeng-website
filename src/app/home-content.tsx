'use client'

import { useState, useMemo, useCallback, useEffect, lazy, Suspense, Component } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

import ProgressBar from '@/components/progress-bar'
import BackToTop from '@/components/back-to-top'
import CustomerCases from '@/components/customer-cases'
import FaqSection from '@/components/faq-section'
import Footer from '@/components/footer'
import FloatingCta from '@/components/floating-cta'
import HoverBorderCard from '@/components/hover-border-card'
import TypewriterSwap from '@/components/typewriter-swap'

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
interface NavItem { name: string; id: string }
interface FormData { company: string; contact: string; demand: string }
interface FormErrors { company?: string; contact?: string; demand?: string }

// ============ Navigation Items ============
const NAV_ITEMS: NavItem[] = [
  { name: '首页', id: 'home' },
  { name: '关于我们', id: 'about' },
  { name: '核心服务', id: 'services' },
  { name: '解决方案', id: 'solutions-section' },
  { name: '客户案例', id: 'cases' },
  { name: '渠道合作', id: 'partner' },
  { name: '联系我们', id: 'contact' },
]

// ============ Services (5 items) ============
const SERVICES = [
  { title: '全域流量运营', icon: '📡', desc: '抖音/TikTok/Google/Facebook全平台精准投放，AI批量内容生成，从曝光到转化全链路运营' },
  { title: 'AI企业效率提升', icon: '🤖', desc: 'AI智能客服、数据分析、内容生成、营销自动化，帮助企业降低运营成本' },
  { title: '跨境电商人才孵化', icon: '🎓', desc: '从0到1系统培养运营、投流、客服、选品全岗位人才，点对点输送至企业' },
  { title: '品牌出海全案', icon: '🌏', desc: '品牌定位、独立站搭建、全球媒体投放、海外仓物流一站式服务' },
  { title: '企业综合服务', icon: '🏢', desc: '基础财税、政策申报辅导、供应链对接、企业商学院搭建' },
]

// ============ Solutions (3 industries) ============
const SOLUTIONS_PREVIEW = [
  { industry: '制造业 / 外贸企业', icon: '🏭', pain: '线上渠道匮乏，海外订单来源单一', approach: '独立站+全球投放+人才输送' },
  { industry: '跨境电商', icon: '🛒', pain: '广告成本上升，运营人才紧缺', approach: 'AI降本增效+多平台运营+人才孵化' },
  { industry: '品牌出海', icon: '🌍', pain: '海外市场信息不对称，本地化能力不足', approach: '品牌策略+全球媒体+海外仓' },
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
  else if (!/^[\d\s\-+()（）]{7,20}$/.test(form.contact.trim())) { errors.contact = '请输入有效的电话号码' }
  if (!form.demand.trim()) errors.demand = '请简单描述您的需求'
  return errors
}

// ============ Main Component ============
export default function HomeContent() {
  const [activeNav, setActiveNav] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
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
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      addToast('提交成功，我们将尽快联系您！', 'success')
    }, 1500)
    setForm({ company: '', contact: '', demand: '' })
    setErrors({})
  }, [form, addToast])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <ProgressBar />
      {/* ======== 导航栏 ======== */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-blue-200 shadow-sm" role="navigation" aria-label="主导航">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-3" aria-label="回到首页">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-white">CM</div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">婵梦科技</span>
          </button>

          <div className="hidden lg:flex gap-6">
            {NAV_ITEMS.map((item) => {
              const idx = sectionIds.indexOf(item.id)
              return (
                <button key={item.id} onClick={() => scrollTo(item.id)} aria-current={currentNav === idx ? 'page' : undefined}
                  className={`text-sm font-medium transition ${currentNav === idx ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
                  {item.name}
                </button>
              )
            })}
            <Link href="/partner" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors ml-2">
              渠道合作 →
            </Link>
          </div>

          <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? '关闭菜单' : '打开菜单'} aria-expanded={mobileOpen}>
            <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-600 transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-0 top-[73px] bg-white/95 backdrop-blur-xl z-40 overflow-y-auto">
              <div className="flex flex-col gap-1 px-6 py-4">
                {NAV_ITEMS.map((item) => {
                  const idx = sectionIds.indexOf(item.id)
                  return (
                    <button key={item.id} onClick={() => scrollTo(item.id)} aria-current={currentNav === idx ? 'page' : undefined}
                      className={`text-left px-4 py-3 rounded-lg text-base font-medium transition ${currentNav === idx ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}>
                      {item.name}
                    </button>
                  )
                })}
                <Link href="/partner" className="text-left px-4 py-3 rounded-lg text-base font-medium text-blue-600 hover:bg-blue-50 transition">
                  渠道合作 →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ======== 首屏 Hero ======== */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" aria-label="首页">
        <HeroBackground opacity={opacity} />
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-gray-800 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                AI+流量+人才+产业<br />企业全链路增长服务
              </span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed h-16">
            <TypewriterSwap
              phrases={[
                '为企业提供流量获客、AI提效、人才孵化、品牌出海一站式解决方案',
                '从获客到交付，陪伴企业持续增长',
                '零房租产业园，12项基础服务免费',
              ]}
              typingSpeed={50}
              pauseDuration={2500}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact"
              className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition-all text-white font-semibold text-lg shadow-lg shadow-blue-500/25">
              预约咨询
            </Link>
            <Link href="/services"
              className="px-10 py-4 rounded-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition font-semibold text-lg">
              查看方案
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-10">
          <div className="flex flex-col items-center gap-2 px-5 py-3 rounded-full bg-blue-50/80 backdrop-blur border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300">
            <span className="absolute inset-0 rounded-full animate-ping bg-blue-200/30 duration-[2.5s]" />
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-4 h-4 border-r-2 border-b-2 border-blue-500 rotate-45 relative z-10" />
            <span className="text-xs text-blue-500 tracking-widest relative z-10">向下探索</span>
          </div>
        </motion.div>
      </section>

      {/* ======== 公司简介 ======== */}
      <section id="about" className={S.section} aria-label="关于我们">
        <div className="max-w-5xl mx-auto">
          <SectionHeading accent="indigo">关于婵梦科技</SectionHeading>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInView direction="left">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">杭州婵梦传媒科技有限公司</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                成立于2026年5月，总部位于杭州市萧山区，是一家专注于为中国企业提供全链路增长服务的综合性平台公司。
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                我们通过<span className="text-blue-600 font-semibold">AI+流量+人才+产业</span>的四维模式，
                为企业提供从人才孵化、流量获客、品牌出海到全链路服务的一站式解决方案。
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">核心定位：</strong>
                企业全链路增长服务提供商。不做二房东，不做一次性代运营，做企业的长期服务伙伴。
              </p>
            </FadeInView>
            <FadeInView direction="right">
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                <h4 className="text-xl font-semibold mb-6">使命 · 愿景 · 价值观</h4>
                <div className="space-y-5">
                  <div>
                    <p className="text-blue-600 font-semibold mb-2">🎯 企业使命</p>
                    <p className="text-gray-600 text-sm">用AI赋能人才，用流量驱动增长，用服务成就品牌</p>
                  </div>
                  <div>
                    <p className="text-blue-600 font-semibold mb-2">🔭 企业愿景</p>
                    <p className="text-gray-600 text-sm">成为受尊敬的企业全链路增长服务提供商</p>
                  </div>
                  <div>
                    <p className="text-blue-600 font-semibold mb-2">💎 核心价值观</p>
                    <div className="flex flex-wrap gap-2">
                      {['客户为先', '专业务实', '技术驱动', '长期共赢'].map((v) => (
                        <span key={v} className="px-3 py-1 bg-white rounded-full text-gray-700 text-xs">{v}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
          <div className="mt-10 text-center">
            <Link href="/about" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              了解更多 →</Link>
          </div>
        </div>
      </section>

      {/* ======== 核心服务预览 ======== */}
      <section id="services" className={S.sectionAlt} aria-label="核心服务">
        <div className="max-w-7xl mx-auto">
          <SectionHeading accent="cyan">核心服务</SectionHeading>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SERVICES.map((svc, i) => (
              <FadeInView key={svc.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-sky-200 p-6 h-full hover:border-sky-400 hover:shadow-md transition-all duration-300 text-center">
                  <div className="text-3xl mb-3">{svc.icon}</div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-2">{svc.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{svc.desc}</p>
                </div>
              </FadeInView>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              查看全部服务 →</Link>
          </div>
        </div>
      </section>

      {/* ======== 解决方案预览 ======== */}
      <section id="solutions-section" className={S.section} aria-label="解决方案">
        <div className="max-w-7xl mx-auto">
          <SectionHeading accent="emerald">行业解决方案</SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            {SOLUTIONS_PREVIEW.map((sol, i) => (
              <FadeInView key={sol.industry} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-teal-200 p-6 h-full hover:border-teal-400 hover:shadow-md transition-all duration-300">
                  <div className="text-3xl mb-3">{sol.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-3">{sol.industry}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-500"><span className="text-rose-500 font-medium">痛点：</span>{sol.pain}</p>
                    <p className="text-gray-500"><span className="text-teal-600 font-medium">方案：</span>{sol.approach}</p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/solutions" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              查看全部方案 →</Link>
          </div>
        </div>
      </section>

      {/* ======== 客户案例 ======== */}
      <CustomerCases />

      {/* ======== 渠道合作 ======== */}
      <section id="partner" className={S.sectionAlt} aria-label="渠道合作">
        <div className="max-w-5xl mx-auto">
          <SectionHeading accent="amber">渠道合作</SectionHeading>
          <FadeInView>
            <div className="bg-white rounded-2xl border border-amber-200 p-8 mb-8 max-w-3xl mx-auto text-center">
              <p className="text-gray-600 leading-relaxed mb-4">
                我们诚邀城市服务商、业务合作伙伴、生态合作伙伴，共同服务中国企业增长市场。
                提供品牌授权、培训支持、市场物料、技术支撑等全方位赋能。
              </p>
              <Link href="/partner"
                className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold shadow-lg shadow-amber-500/25 transition-all">
                了解合作详情 →
              </Link>
              <p className="text-gray-400 text-xs mt-4">* 合作有风险，加入前请充分了解合作条款</p>
            </div>
          </FadeInView>
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
            action="https://formsubmit.co/你的邮箱@xxx.com"
            method="POST"
            target="_formsubmit"
            onSubmit={submitForm}
            noValidate
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_subject" value="新的咨询预约" />
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">公司名称 *</label>
              <input id="company" name="公司名称" type="text" placeholder="请输入公司名称" autoComplete="organization" value={form.company} onChange={updateForm}
                className={errors.company ? S.inputError : S.input}
                aria-invalid={!!errors.company} aria-describedby={errors.company ? 'company-error' : undefined} />
              {errors.company && <p id="company-error" className="mt-1 text-sm text-red-600">{errors.company}</p>}
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">联系电话/微信 *</label>
              <input id="contact" name="联系方式" type="text" placeholder="请输入联系电话或微信" autoComplete="tel" value={form.contact} onChange={updateForm}
                className={errors.contact ? S.inputError : S.input}
                aria-invalid={!!errors.contact} aria-describedby={errors.contact ? 'contact-error' : undefined} />
              {errors.contact && <p id="contact-error" className="mt-1 text-sm text-red-600">{errors.contact}</p>}
            </div>
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
            <p className="text-gray-400 text-xs mt-1">📞 400-000-0000 | 📧 contact@chanmeng.com</p>
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
