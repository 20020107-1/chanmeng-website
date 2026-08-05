'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import BrandMark from '@/components/brand-mark'
import BrandName from '@/components/brand-name'
import SiteSearch from '@/components/site-search'

import ProgressBar from '@/components/progress-bar'
import BackToTop from '@/components/back-to-top'
import Footer from '@/components/footer'
import { PRIMARY_NAV } from '@/data/navigation'
import NavigationDrawer from '@/components/navigation-drawer'
import NavPreview from '@/components/nav-preview'
import FloatingCta from '@/components/floating-cta'
import HoverBorderCard from '@/components/hover-border-card'
import PhoneVerificationFields from '@/components/phone-verification-fields'
import HeroSplineParallax from '@/components/hero-spline-parallax'
import CounterShowcase from './growth-data/counter-showcase'

// ============ Types ============
interface NavItem { name: string; id: string; href: string }
interface FormData { company: string; contact: string; demand: string }
interface FormErrors { company?: string; contact?: string; demand?: string }

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







// ============ Shared Styles ============
const S = {
  section: 'py-16 md:py-24 px-4 md:px-6 bg-[#fbfaf6]',
  sectionAlt: 'py-16 md:py-24 px-4 md:px-6 bg-[#F2EFE9]',
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
  const navCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [form, setForm] = useState<FormData>({ company: '', contact: '', demand: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

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

  const submitForm = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = validateForm(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      addToast('请检查表单中的错误', 'error')
      return
    }
    setSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: form.company,
          contact: form.company,
          phone: form.contact,
          demand: form.demand,
          source: '首页预约咨询',
          page: window.location.href,
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || '提交失败')
      setForm({ company: '', contact: '', demand: '' })
      addToast('提交成功，我们将在两到三个工作日内与您联系', 'success')
    } catch (error) {
      addToast(error instanceof Error ? error.message : '提交失败，请稍后重试', 'error')
    } finally {
      setSubmitting(false)
    }
  }, [form, addToast])

  return (
    <main className="home-page-main min-h-screen bg-white text-gray-800">
      <ProgressBar />
      {/* ======== 导航栏 ======== */}
      <nav
        className="apple-nav home-mobile-nav fixed w-full z-50"
        role="navigation"
        aria-label="主导航"
        onMouseEnter={() => {
          if (navCloseTimer.current) clearTimeout(navCloseTimer.current)
        }}
        onMouseLeave={() => {
          if (navCloseTimer.current) clearTimeout(navCloseTimer.current)
          navCloseTimer.current = setTimeout(() => setMobileOpen(false), 420)
        }}
      >
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => {
              setActiveNav(0)
              setMobileOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="min-w-0 flex items-center gap-1.5"
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
            <div
              className="-m-1 p-1"
              onPointerEnter={() => {
                if (navCloseTimer.current) clearTimeout(navCloseTimer.current)
                setMobileOpen(true)
                setSearchOpen(false)
              }}
              onPointerLeave={() => {
                if (navCloseTimer.current) clearTimeout(navCloseTimer.current)
                navCloseTimer.current = setTimeout(() => setMobileOpen(false), 420)
              }}
            >
              <button
                type="button"
              className="home-menu-button flex h-10 min-w-[112px] items-center justify-center gap-2.5 rounded-lg bg-[#181816] px-5 text-[13px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-black active:scale-[0.98]"
                onFocus={() => {
                  if (navCloseTimer.current) clearTimeout(navCloseTimer.current)
                  setMobileOpen(true)
                  setSearchOpen(false)
                }}
                onClick={() => {
                  if (navCloseTimer.current) clearTimeout(navCloseTimer.current)
                  setMobileOpen((current) => !current)
                  setSearchOpen(false)
                }}
                aria-label={mobileOpen ? '关闭全部导航' : '打开全部导航'}
                aria-expanded={mobileOpen}
              >
                <span className="hidden sm:inline">全部导航</span>
                <span className="sm:hidden">导航</span>
                <svg className={`h-3.5 w-3.5 transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
        <NavigationDrawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          onPointerEnter={() => {
            if (navCloseTimer.current) clearTimeout(navCloseTimer.current)
          }}
          onPointerLeave={() => {
            if (navCloseTimer.current) clearTimeout(navCloseTimer.current)
            navCloseTimer.current = setTimeout(() => setMobileOpen(false), 420)
          }}
        />
      </nav>

      {/* ======== 首屏 Hero ======== */}
      <section id="home" className="relative min-h-screen overflow-hidden" aria-label="首页">
        <HeroSplineParallax />
        <div className="hero-content mobile-hero-content relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 pb-20 pt-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <p className="mb-7 flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.28em] text-[#E2492F] md:text-sm">
              <span className="h-px w-9 bg-[#E2492F]" />
              CHANMENG TECHNOLOGY
              <span className="h-px w-9 bg-[#E2492F]" />
            </p>
            <h1 className="font-semibold leading-[1.08] tracking-[-0.045em] text-[#1e1b17]">
              <span className="block text-4xl md:text-[60px] lg:text-[68px]">AI驱动企业增长</span>
              <span className="mt-2 block text-[34px] text-[#E2492F] md:text-[52px] lg:text-[58px]">从获客到成交，形成增长闭环</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#5f584e] md:text-lg">
            <span className="block">以AI搜索与内容营销建立获客入口，</span>
            <span className="block">用商业设计和转化体系推动成交与持续增长。</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.45 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact"
              className="rounded-full bg-[#25211c] px-9 py-3.5 text-center text-base font-semibold text-[#fbf8f1] shadow-[0_12px_30px_rgba(44,36,26,.16)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#C93A26] hover:shadow-[0_18px_40px_rgba(226,73,47,.30)] active:translate-y-0 active:scale-[0.98]">
              预约诊断
            </Link>
            <Link href="/cases"
              className="rounded-full border border-[#E2492F] bg-[#fffdf8]/75 px-9 py-3.5 text-center text-base font-semibold text-[#C93A26] backdrop-blur transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#E2492F] hover:text-white hover:shadow-[0_18px_40px_rgba(226,73,47,.25)] active:translate-y-0 active:scale-[0.98]">
              查看客户案例
            </Link>
          </motion.div>
          </div>
        </div>

        <motion.button type="button" onClick={() => scrollTo('service-overview')} aria-label="向下探索，查看服务概览"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.6 }}
          className="group hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2.5 text-[#E2492F] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E2492F] focus-visible:ring-offset-4 rounded-full">
          <span className="text-xs font-medium tracking-[0.24em] transition-colors group-hover:text-[#E2492F]">向下探索</span>
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F0836A] bg-[#fffdf8]/80 shadow-sm backdrop-blur transition-all duration-300 group-hover:border-[#E2492F] group-hover:bg-[#F2EFE9]">
            <span className="-mt-1 h-3.5 w-3.5 rotate-45 border-b-2 border-r-2 border-[#E2492F]" aria-hidden="true" />
          </motion.span>
        </motion.button>
      </section>

      {/* 首页与数据展示之间的说明过渡 */}
      <section className="bg-[#fbf7ef] px-4 py-14 md:px-6 md:py-20" aria-label="增长数据说明">
        <div className="mx-auto grid max-w-7xl gap-8 border-y border-[#d8c09a]/70 py-10 md:grid-cols-[0.9fr_1.1fr] md:items-end md:py-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.32em] text-[#E2492F]">GROWTH EVIDENCE</p>
            <h2 className="mt-5 max-w-2xl text-[clamp(2.2rem,4.8vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#211d18]">
              增长不是口号，<br />要能被验证。
            </h2>
          </div>
          <div className="max-w-2xl md:justify-self-end">
            <p className="text-base leading-8 text-[#5f554a] md:text-lg">
              下面展示的是婵梦科技对项目经验、客户反馈、专业能力与交付结果的结构化表达。我们希望客户看到的不只是服务名称，而是每一步如何落到结果上。
            </p>
          </div>
        </div>
      </section>

      {/* 完整动效页面：保留原始视觉与交互，并按内容高度接入首页连续文档流 */}
      <div id="service-overview"><CounterShowcase /></div>

      {/* ======== 联系销售入口 ======== */}
      <section id="contact" className="border-y border-[#d8c09a]/70 bg-[#fbf5ea] px-4 py-16 text-[#211d18] md:px-6 md:py-24" aria-label="预约诊断">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 rounded-[32px] border border-[#d8c09a]/75 bg-[#fffaf1]/70 px-6 py-12 shadow-[0_28px_70px_rgba(98,70,35,0.08)] md:grid-cols-[1.12fr_.88fr] md:items-end md:gap-20 md:px-10 md:py-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-[#E2492F]">FREE DIAGNOSIS</p>
              <h2 className="mt-6 max-w-[9.4em] text-[clamp(2.4rem,5.4vw,5rem)] font-semibold leading-[.96] tracking-[-0.06em]">
                让下一次增长，<br />从一次诊断开始。
              </h2>
            </div>
            <div className="md:pb-1">
              <p className="max-w-xl text-base leading-8 text-[#5f554a] md:text-lg">
                告诉我们您正在推进的业务、当前遇到的问题，以及希望抵达的目标。我们会先为您做一次初步的AI搜索可见性诊断，在两到三个工作日内回复，并给出清晰的下一步建议。
              </p>
              <Link
                href="/contact"
                className="group relative mt-8 inline-flex min-h-12 items-center rounded-full bg-[#211d18] px-7 text-sm font-semibold text-[#fffaf1] shadow-[0_16px_34px_rgba(33,29,24,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C93A26] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2492F] focus-visible:ring-offset-4 focus-visible:ring-offset-[#fbf5ea]"
              >
                预约诊断
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======== 金色过渡带：页脚前的品牌主张收口 ======== */}
      <section className="border-t border-[#d8c09a]/70 bg-[#f6ecde] px-4 py-14 text-center md:px-6 md:py-16" aria-label="品牌主张">
        <p className="text-xs font-semibold tracking-[0.28em] text-[#E2492F]">CHANMENG GROWTH LOOP</p>
        <p className="mx-auto mt-6 max-w-3xl text-xl font-semibold leading-9 text-[#211d18] md:text-2xl md:leading-10">
          让企业在AI搜索中被<span className="text-[#9b6a2d]">看见</span>、被<span className="text-[#9b6a2d]">理解</span>、被<span className="text-[#9b6a2d]">信任</span>，
          并把流量转化为可持续的业务增长。
        </p>
      </section>

      {/* ======== 页脚 ======== */}
      <Footer />

      <Toast toasts={toasts} remove={removeToast} />
      <BackToTop />
      <FloatingCta />
    </main>
  )
}
