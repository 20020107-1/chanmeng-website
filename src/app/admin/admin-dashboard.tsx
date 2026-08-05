'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Activity, BarChart3, Bell, BookOpenText, BriefcaseBusiness, CalendarDays,
  Check, ChevronDown, ChevronRight, CircleHelp, Clock3, Eye, FileText,
  Filter, LayoutDashboard, LogOut, Menu, MessageSquareText, MoreHorizontal,
  Newspaper, Pencil, Plus, Save, Search, Settings, Sparkles, Trash2,
  ShieldCheck, TrendingUp, UserRound, Users, X,
} from 'lucide-react'
import { SERVICE_DETAILS } from '@/data/services'

type Section = 'dashboard' | 'news' | 'cases' | 'services' | 'leads' | 'audit' | 'settings'
type PublishStatus = '已发布' | '草稿'
type ContentType = 'news' | 'cases' | 'services'
type LeadStatus = '待跟进' | '沟通中' | '已联系' | '已成交'

type ContentItem = {
  id: number
  title: string
  category: string
  status: PublishStatus
  updated: string
  summary?: string
  slug?: string
  author?: string
}

type Lead = {
  id: number
  company: string
  contact: string
  phone: string
  demand: string
  industry: string
  source: string
  page: string
  submittedAt: string
  status: LeadStatus
  note: string
}

type ContentState = Record<ContentType, ContentItem[]>
type AuditEvent = { id: string; event: string; actor: string; ip: string; detail?: string; createdAt: string }

const initialContent: ContentState = {
  news: [
    { id: 1, title: 'GEO是什么？企业布局生成式搜索的实用指南', category: '增长前沿', status: '已发布', updated: '2026-07-27', slug: 'geo-guide', author: '婵梦研究院', summary: '帮助企业理解生成式搜索中的品牌可见度建设。' },
    { id: 2, title: 'AI如何贯穿获客与转化链路', category: '业务观察', status: '已发布', updated: '2026-07-18', slug: 'ai-acquisition-conversion', author: '内容团队', summary: '从流量入口到客户承接，梳理AI参与业务增长的关键环节。' },
    { id: 3, title: '企业增长服务体系持续升级', category: '公司动态', status: '草稿', updated: '2026-07-12', slug: 'growth-system-update', author: '品牌中心', summary: '围绕客户真实业务结果，持续优化服务方法与交付标准。' },
  ],
  cases: [
    { id: 1, title: '财税服务机构 · AI搜索可见度优化', category: 'GEO优化', status: '已发布', updated: '2026-07-24', slug: 'geo-finance-ai-visibility', author: '项目组', summary: '围绕本地财税需求建立问题矩阵与可引用内容体系。' },
    { id: 2, title: '装饰服务企业 · 多平台GEO覆盖', category: 'GEO优化', status: '已发布', updated: '2026-07-20', slug: 'geo-decoration-multi-platform', author: '项目组', summary: '将装修决策问题转化为多平台AI搜索内容。' },
    { id: 3, title: '本地除甲醛服务 · AI推荐占位', category: '本地获客', status: '已发布', updated: '2026-07-15', slug: 'geo-local-formaldehyde-service', author: '项目组', summary: '围绕资质、流程和本地服务建立可信问答内容。' },
  ],
  services: SERVICE_DETAILS.map((service, index) => ({
    id: index + 1,
    title: service.title,
    category: '增长闭环',
    status: '已发布' as const,
    updated: '2026-07-30',
    slug: service.slug,
    author: '业务中心',
    summary: service.intro,
  })),
}

const initialLeads: Lead[] = []

const navigation = [
  { id: 'dashboard' as Section, label: '数据概览', icon: LayoutDashboard },
  { id: 'news' as Section, label: '新闻管理', icon: Newspaper },
  { id: 'cases' as Section, label: '案例管理', icon: BriefcaseBusiness },
  { id: 'services' as Section, label: '服务管理', icon: FileText },
  { id: 'leads' as Section, label: '表单数据', icon: MessageSquareText },
  { id: 'audit' as Section, label: '安全日志', icon: ShieldCheck },
  { id: 'settings' as Section, label: '网站设置', icon: Settings },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [section, setSection] = useState<Section>('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [content, setContent] = useState<ContentState>(initialContent)
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([])
  const [editing, setEditing] = useState<ContentItem | null>(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const savedContent = localStorage.getItem('chanmeng-admin-content')
    if (savedContent) setContent(JSON.parse(savedContent))
    fetch('/api/leads')
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((result) => setLeads(result.leads || []))
      .catch(() => setLeads([]))
    fetch('/api/admin/audit')
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((result) => setAuditEvents(result.events || []))
      .catch(() => setAuditEvents([]))
  }, [router])

  function persistContent(next: ContentState) {
    setContent(next)
    localStorage.setItem('chanmeng-admin-content', JSON.stringify(next))
  }

  function persistLeads(next: Lead[]) {
    const changed = next.find((item) => {
      const previous = leads.find((lead) => lead.id === item.id)
      return previous && (previous.status !== item.status || previous.note !== item.note)
    })
    setLeads(next)
    if (changed) {
      fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: changed.id, status: changed.status, note: changed.note }),
      }).catch(() => null)
    }
  }

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  function goTo(next: Section) {
    setSection(next)
    setQuery('')
    setMobileOpen(false)
  }

  const title = navigation.find((item) => item.id === section)?.label || '数据概览'
  const pendingCount = leads.filter((lead) => lead.status === '待跟进').length

  return (
    <main className="admin-shell min-h-screen text-[#241f1a]">
      {mobileOpen ? <button aria-label="关闭菜单" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" /> : null}
      <aside className={`admin-sidebar fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col px-4 py-5 shadow-2xl transition-transform duration-300 lg:translate-x-0 lg:shadow-none ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-3">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3" title="在新标签页打开官网">
            <span className="relative h-11 w-14 shrink-0">
              <img
                src="/brand/admin-brand-logo.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
            <span><strong className="block text-sm tracking-[.08em] text-[#211d19]">婵梦科技</strong><small className="text-[10px] tracking-[.16em] text-[#96774b]">ADMIN SYSTEM</small></span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10 lg:hidden"><X size={18} /></button>
        </div>

        <div className="mx-3 mt-7 rounded-xl border border-[#b98a47]/20 bg-white/45 p-3 backdrop-blur">
          <div className="flex items-center gap-2 text-xs text-[#9b6d2f]"><Sparkles size={13} />本地内容工作区</div>
          <p className="mt-1 text-[11px] leading-5 text-[#877b6d]">更改保存在当前浏览器</p>
        </div>

        <nav className="mt-6 space-y-1">
          {navigation.map((item) => (
            <button key={item.id} onClick={() => goTo(item.id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${section === item.id ? 'bg-[#af7f3c]/12 text-[#8f5e22] shadow-[inset_3px_0_0_#b98945]' : 'text-[#665e55] hover:bg-white/55 hover:text-[#211d19]'}`}>
              <item.icon size={17} /><span>{item.label}</span>
              {item.id === 'leads' && pendingCount ? <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-[#a83225] px-1 text-[10px] text-white">{pendingCount}</span> : null}
            </button>
          ))}
        </nav>

        <div className="mx-3 mt-6 rounded-xl border border-[#b98a47]/15 bg-white/35 p-3">
          <div className="flex items-center gap-2 text-xs text-[#7b6e60]"><CircleHelp size={14} />操作提示</div>
          <p className="mt-2 text-[11px] leading-5 text-[#9a8d7d]">正式上线前需接入数据库与服务器端权限。</p>
        </div>

        <div className="mt-auto border-t border-[#a77a3d]/15 pt-4">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#6f655a] transition hover:bg-white/55 hover:text-[#211d19]"><Eye size={17} />查看官网</Link>
          <button onClick={() => { fetch('/api/admin/logout', { method: 'POST' }).finally(() => router.replace('/admin/login')) }} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#6f655a] transition hover:bg-white/55 hover:text-[#9f3024]"><LogOut size={17} />退出登录</button>
        </div>
      </aside>

      <div className="admin-workspace lg:pl-[264px]">
        <header className="admin-topbar sticky top-0 z-30 flex h-[72px] items-center gap-4 px-5 backdrop-blur-xl md:px-8">
          <button onClick={() => setMobileOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 lg:hidden"><Menu size={18} /></button>
          <div><p className="text-[11px] tracking-[.08em] text-[#8a8178]">官网管理后台</p><h1 className="text-lg font-semibold">{title}</h1></div>
          <div className="ml-auto flex items-center gap-2">
            <span className="mr-2 hidden items-center gap-1.5 text-xs text-[#8d8379] md:flex"><span className="h-2 w-2 rounded-full bg-emerald-500" />系统正常</span>
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-black/[.07] bg-white transition hover:bg-[#f1ece3]"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#a83225]" /></button>
            <div className="ml-2 hidden text-right sm:block"><p className="text-sm font-medium">管理员</p><p className="text-xs text-[#91877d]">admin</p></div>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#bb8a45]/25 bg-[#a83225] text-xs font-semibold text-white shadow-[0_5px_16px_rgba(168,50,37,.2)]">婵</span>
          </div>
        </header>

        <div className="p-5 md:p-8">
          {section === 'dashboard' ? <Dashboard content={content} leads={leads} setSection={goTo} /> : null}
          {section === 'news' || section === 'cases' || section === 'services' ? (
            <ContentManager
              type={section}
              items={content[section]}
              query={query}
              setQuery={setQuery}
              onEdit={setEditing}
              onDelete={(id) => {
                if (!window.confirm('确定删除这条内容吗？此操作无法撤销。')) return
                persistContent({ ...content, [section]: content[section].filter((item) => item.id !== id) })
                notify('内容已删除')
              }}
              onToggle={(id) => {
                persistContent({ ...content, [section]: content[section].map((item) => item.id === id ? { ...item, status: item.status === '已发布' ? '草稿' : '已发布' } : item) })
                notify('发布状态已更新')
              }}
            />
          ) : null}
          {section === 'leads' ? <Leads leads={leads} onChange={persistLeads} notify={notify} /> : null}
          {section === 'audit' ? <AuditLog events={auditEvents} /> : null}
          {section === 'settings' ? <SiteSettings notify={notify} /> : null}
        </div>
      </div>

      {editing ? (
        <Editor item={editing} onClose={() => setEditing(null)} onSave={(next) => {
          const key = section as ContentType
          const list = content[key]
          const updated = next.id ? list.map((item) => item.id === next.id ? next : item) : [{ ...next, id: Date.now() }, ...list]
          persistContent({ ...content, [key]: updated })
          setEditing(null)
          notify(next.status === '已发布' ? '内容已保存并发布' : '草稿已保存')
        }} />
      ) : null}
      {toast ? <div className="fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#29231e] px-5 py-3 text-sm text-white shadow-xl"><Check size={15} className="text-[#d0aa69]" />{toast}</div> : null}
    </main>
  )
}

function Dashboard({ content, leads, setSection }: { content: ContentState; leads: Lead[]; setSection: (section: Section) => void }) {
  const published = Object.values(content).flat().filter((item) => item.status === '已发布').length
  const cards = [
    { label: '已发布内容', value: published, change: '+3 本月', icon: FileText, tone: 'gold' },
    { label: '客户咨询', value: leads.length, change: `${leads.filter((lead) => lead.status === '待跟进').length} 条待跟进`, icon: Users, tone: 'red' },
    { label: '官网访问', value: '2,846', change: '+14.2%', icon: BarChart3, tone: 'green' },
    { label: '内容完成率', value: '86%', change: '较上月 +8%', icon: TrendingUp, tone: 'blue' },
  ]
  const recent = [...content.news, ...content.cases].slice(0, 5)

  return <div className="mx-auto max-w-[1440px]">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div><p className="flex items-center gap-2 text-sm text-[#8a8178]"><CalendarDays size={14} />2026年7月29日 · 星期三</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.04em] md:text-4xl">欢迎回来，管理员</h2><p className="mt-2 text-sm text-[#8a8178]">今天有 {leads.filter((lead) => lead.status === '待跟进').length} 条客户线索等待处理。</p></div>
      <button onClick={() => setSection('news')} className="flex items-center gap-2 rounded-xl bg-[#29231e] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#413830]"><Plus size={16} />发布新内容</button>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <MetricCard key={card.label} {...card} />)}</div>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.75fr]">
      <section className="rounded-[24px] border border-black/[.06] bg-white p-6 shadow-[0_10px_35px_rgba(54,44,31,.04)]">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold">官网访问趋势</h3><p className="mt-1 text-xs text-[#978d83]">过去 7 天访问数据</p></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">较上周 +14.2%</span></div>
        <TrafficChart />
      </section>
      <section className="rounded-[24px] bg-[#29231e] p-7 text-white shadow-[0_18px_55px_rgba(41,35,30,.14)]">
        <p className="text-xs tracking-[.2em] text-[#d0aa69]">QUICK ACTIONS</p><h3 className="mt-4 text-2xl font-semibold">常用操作</h3><p className="mt-2 text-sm leading-6 text-white/40">快速进入高频管理任务</p>
        <div className="mt-6 space-y-2">{[['新闻管理','news'],['客户案例','cases'],['咨询线索','leads'],['网站设置','settings']].map(([label,id]) => <button key={id} onClick={() => setSection(id as Section)} className="flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-white/65 transition hover:border-[#d0aa69]/30 hover:bg-white/[.06] hover:text-white">{label}<ChevronRight size={15} /></button>)}</div>
      </section>
    </div>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
      <section className="rounded-[24px] border border-black/[.06] bg-white p-6"><div className="flex items-center justify-between"><div><h3 className="font-semibold">近期内容</h3><p className="mt-1 text-xs text-[#978d83]">最近更新的新闻与案例</p></div><button onClick={() => setSection('news')} className="text-sm text-[#9b753d] hover:underline">查看全部</button></div><div className="mt-4 divide-y divide-black/[.07]">{recent.map((item) => <div key={`${item.category}-${item.id}`} className="flex items-center gap-4 py-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f3ede2] text-[#9b753d]"><BookOpenText size={17} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.title}</p><p className="mt-1 text-xs text-[#978d83]">{item.category} · {item.updated}</p></div><Status status={item.status} /></div>)}</div></section>
      <section className="rounded-[24px] border border-black/[.06] bg-white p-6"><div className="flex items-center justify-between"><div><h3 className="font-semibold">最新线索</h3><p className="mt-1 text-xs text-[#978d83]">客户咨询跟进情况</p></div><button onClick={() => setSection('leads')} className="text-sm text-[#9b753d] hover:underline">全部线索</button></div><div className="mt-4 space-y-3">{leads.slice(0, 3).map((lead) => <button key={lead.id} onClick={() => setSection('leads')} className="flex w-full items-center gap-3 rounded-xl border border-black/[.06] p-3 text-left transition hover:bg-[#faf8f3]"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#f3ede2] text-xs font-semibold text-[#9b753d]">{lead.contact.slice(0, 1)}</span><span className="min-w-0 flex-1"><strong className="block truncate text-sm">{lead.company}</strong><small className="mt-1 block truncate text-[#978d83]">{lead.demand}</small></span><LeadBadge status={lead.status} /></button>)}</div></section>
    </div>
  </div>
}

function MetricCard({ label, value, change, icon: Icon, tone }: { label: string; value: string | number; change: string; icon: typeof FileText; tone: string }) {
  const toneMap: Record<string, string> = {
    gold: 'bg-[#f3ede2] text-[#9b753d]', red: 'bg-red-50 text-[#a83225]',
    green: 'bg-emerald-50 text-emerald-700', blue: 'bg-sky-50 text-sky-700',
  }
  return <article className="group rounded-[22px] border border-black/[.06] bg-white p-6 shadow-[0_10px_35px_rgba(54,44,31,.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(54,44,31,.08)]"><div className="flex items-start justify-between"><span className="text-sm text-[#81776d]">{label}</span><span className={`grid h-10 w-10 place-items-center rounded-xl ${toneMap[tone]}`}><Icon size={17} /></span></div><strong className="mt-6 block text-3xl font-semibold tracking-[-.04em]">{value}</strong><span className="mt-2 block text-xs text-[#9b753d]">{change}</span></article>
}

function TrafficChart() {
  const points = '18,128 90,112 162,120 234,78 306,90 378,54 450,64 522,28 594,44 666,18'
  return <div className="mt-6 overflow-hidden"><svg viewBox="0 0 684 165" className="h-[210px] w-full" role="img" aria-label="过去七天官网访问量上升趋势"><defs><linearGradient id="adminChart" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b58a4a" stopOpacity=".28" /><stop offset="1" stopColor="#b58a4a" stopOpacity="0" /></linearGradient></defs>{[30,70,110,150].map((y) => <line key={y} x1="8" x2="676" y1={y} y2={y} stroke="#2d2926" strokeOpacity=".08" />)}<polygon points={`${points} 666,155 18,155`} fill="url(#adminChart)" /><polyline points={points} fill="none" stroke="#9b753d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />{points.split(' ').map((point) => { const [cx,cy] = point.split(','); return <circle key={point} cx={cx} cy={cy} r="4" fill="#fff" stroke="#9b753d" strokeWidth="2" /> })}</svg><div className="grid grid-cols-7 text-center text-[11px] text-[#9a9187]"><span>周四</span><span>周五</span><span>周六</span><span>周日</span><span>周一</span><span>周二</span><span>今天</span></div></div>
}

function ContentManager({ type, items, query, setQuery, onEdit, onDelete, onToggle }: {
  type: ContentType; items: ContentItem[]; query: string; setQuery: (value: string) => void
  onEdit: (item: ContentItem) => void; onDelete: (id: number) => void; onToggle: (id: number) => void
}) {
  const [status, setStatus] = useState<'全部' | PublishStatus>('全部')
  const filtered = useMemo(() => items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) && (status === '全部' || item.status === status)), [items, query, status])
  const names = { news: '新闻', cases: '案例', services: '服务' }
  const create = () => onEdit({ id: 0, title: '', category: names[type], status: '草稿', updated: new Date().toISOString().slice(0, 10), summary: '', slug: '', author: '管理员' })

  return <section className="mx-auto max-w-[1440px]">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-medium tracking-[.14em] text-[#9b753d]">CONTENT MANAGEMENT</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.035em]">{names[type]}内容</h2><p className="mt-2 text-sm text-[#8a8178]">管理官网中的{names[type]}信息、正文和发布状态。</p></div><button onClick={create} className="flex items-center gap-2 rounded-xl bg-[#29231e] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5"><Plus size={16} />新增{names[type]}</button></div>
    <div className="mt-7 overflow-hidden rounded-[24px] border border-black/[.06] bg-white shadow-[0_10px_35px_rgba(54,44,31,.04)]">
      <div className="flex flex-wrap items-center gap-3 border-b border-black/[.07] p-5 md:p-6">
        <div className="relative min-w-[240px] flex-1 md:max-w-md"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9188]" size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} className="h-11 w-full rounded-xl border border-black/[.08] bg-[#faf9f6] pl-10 pr-4 text-sm outline-none transition focus:border-[#a3783c] focus:ring-4 focus:ring-[#a3783c]/10" placeholder={`搜索${names[type]}标题、分类或关键词`} /></div>
        <div className="flex items-center gap-1 rounded-xl border border-black/[.08] bg-[#faf9f6] p-1"><Filter size={14} className="ml-2 text-[#8a8178]" />{(['全部','已发布','草稿'] as const).map((item) => <button key={item} onClick={() => setStatus(item)} className={`rounded-lg px-3 py-2 text-xs transition ${status === item ? 'bg-white font-medium text-[#292521] shadow-sm' : 'text-[#8a8178] hover:text-[#292521]'}`}>{item}</button>)}</div>
        <span className="ml-auto text-xs text-[#9a9188]">共 {filtered.length} 条</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left">
          <thead><tr className="border-b border-black/[.08] bg-[#faf8f3] text-xs text-[#8a8178]"><th className="px-6 py-4 font-medium">内容信息</th><th className="px-4 py-4 font-medium">分类</th><th className="px-4 py-4 font-medium">状态</th><th className="px-4 py-4 font-medium">更新时间</th><th className="px-6 py-4 text-right font-medium">操作</th></tr></thead>
          <tbody>{filtered.map((item) => <tr key={item.id} className="border-b border-black/[.06] last:border-0 hover:bg-[#fcfaf6]"><td className="max-w-xl px-6 py-5"><p className="text-sm font-medium">{item.title}</p><p className="mt-1 line-clamp-1 text-xs leading-5 text-[#978d83]">{item.summary || '暂无内容摘要'}</p></td><td className="px-4 py-5 text-sm text-[#786f66]">{item.category}</td><td className="px-4 py-5"><button onClick={() => onToggle(item.id)} title="点击切换状态"><Status status={item.status} /></button></td><td className="px-4 py-5 text-sm text-[#8d8379]">{item.updated}</td><td className="px-6 py-5 text-right"><button onClick={() => onEdit(item)} className="mr-1 rounded-lg p-2 text-[#746b61] transition hover:bg-[#f3eee4] hover:text-[#292521]" aria-label="编辑"><Pencil size={16} /></button><button className="mr-1 rounded-lg p-2 text-[#746b61] transition hover:bg-[#f3eee4] hover:text-[#292521]" aria-label="更多"><MoreHorizontal size={16} /></button><button onClick={() => onDelete(item.id)} className="rounded-lg p-2 text-[#a83225] transition hover:bg-red-50" aria-label="删除"><Trash2 size={16} /></button></td></tr>)}</tbody>
        </table>
        {!filtered.length ? <div className="grid min-h-64 place-items-center text-center"><div><Search className="mx-auto text-[#c1b8ad]" size={28} /><p className="mt-3 text-sm font-medium">没有找到匹配内容</p><p className="mt-1 text-xs text-[#978d83]">请更换关键词或筛选条件</p></div></div> : null}
      </div>
    </div>
  </section>
}

function Editor({ item, onClose, onSave }: { item: ContentItem; onClose: () => void; onSave: (item: ContentItem) => void }) {
  const [form, setForm] = useState(item)
  const [tab, setTab] = useState<'content' | 'seo'>('content')
  const [body, setBody] = useState('')
  function submit(e: FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    onSave({ ...form, slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'), updated: new Date().toISOString().slice(0, 10) })
  }

  return <div className="fixed inset-0 z-[80] bg-[#f3efe7] text-[#292521]">
    <form onSubmit={submit} className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center border-b border-black/[.08] bg-[#fbfaf6] px-5 md:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <button type="button" onClick={onClose} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#71685f] transition hover:bg-[#eee7dc]" aria-label="关闭编辑器"><X size={19} /></button>
          <span className="h-5 w-px bg-black/10" />
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-[#292521]">{item.id ? '编辑内容' : '发布新内容'}</h3>
            <p className="mt-0.5 text-[11px] text-[#9a9187]">内容将同步至官方网站</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-xs text-[#9a9187] sm:inline">已自动保存至草稿箱</span>
          <button type="button" className="hidden rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-[#71685f] transition hover:bg-[#f3eee4] sm:block">预览</button>
          <button className="flex items-center gap-2 rounded-lg bg-[#29231e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#9b2f22]"><Save size={15} />{form.status === '已发布' ? '更新发布' : '保存内容'}</button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[920px] px-5 py-8 md:px-10 md:py-10">
            <div className="mb-7 flex border-b border-black/[.08]">
              {[['content','内容编辑'],['seo','SEO设置']].map(([id,label]) => (
                <button key={id} type="button" onClick={() => setTab(id as 'content' | 'seo')} className={`relative mr-8 pb-3 text-sm transition ${tab === id ? 'font-medium text-[#292521]' : 'text-[#8a8178] hover:text-[#514a43]'}`}>
                  {label}{tab === id ? <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#9b753d]" /> : null}
                </button>
              ))}
            </div>

            {tab === 'content' ? <div className="space-y-7">
              <div className="relative rounded-xl border border-black/[.07] bg-[#fbfaf6] px-6 py-2 shadow-[0_8px_28px_rgba(54,44,31,.04)]">
                <textarea
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value.slice(0, 40) })}
                  rows={2}
                  className="min-h-[88px] w-full resize-none bg-transparent py-4 text-[28px] font-semibold leading-[1.35] tracking-[-.02em] text-[#292521] outline-none placeholder:font-normal placeholder:text-[#bdb4aa]"
                  placeholder="请输入文章标题（5–40个字）"
                />
                <span className="absolute bottom-3 right-5 text-xs text-[#a79d92]">{form.title.length}/40</span>
              </div>

              <div className="overflow-hidden rounded-xl border border-black/[.07] bg-[#fbfaf6] shadow-[0_8px_28px_rgba(54,44,31,.04)]">
                <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-black/[.07] bg-[#f8f5ef] px-3 py-2">
                  {['撤销','重做','H1','H2','B','I','—','•','引用','链接','图片'].map((tool, index) => (
                    <button key={tool} type="button" title={tool} className={`grid h-8 min-w-8 place-items-center rounded px-2 text-xs text-[#71685f] transition hover:bg-white hover:text-[#292521] ${index === 2 || index === 6 || index === 9 ? 'ml-2 border-l border-black/[.08] pl-3' : ''}`}>{tool}</button>
                  ))}
                </div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="min-h-[520px] w-full resize-none bg-transparent px-8 py-7 text-[17px] leading-[2] text-[#38322c] outline-none placeholder:text-[#b8afa5]"
                  placeholder="从这里开始创作正文……&#10;&#10;建议使用清晰的小标题、短段落和真实案例，让内容更容易阅读与理解。"
                />
                <div className="flex items-center justify-between border-t border-black/[.06] px-5 py-3 text-xs text-[#9a9187]">
                  <span>支持正文图片、引用、链接与多级标题</span>
                  <span>{body.length} 字</span>
                </div>
              </div>
            </div> : <div className="space-y-6 rounded-xl border border-black/[.07] bg-[#fbfaf6] p-7">
              <Field label="页面路径"><div className="flex h-12 overflow-hidden rounded-lg border border-black/10 bg-white"><span className="flex items-center bg-[#f3eee4] px-3 text-xs text-[#8a8178]">/content/</span><input value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="min-w-0 flex-1 px-3 text-sm outline-none" placeholder="page-slug" /></div></Field>
              <Field label="搜索标题" hint="建议 28–60 个字符"><input defaultValue={form.title} className="admin-input" /></Field>
              <Field label="搜索描述" hint="建议不超过 160 个字符"><textarea defaultValue={form.summary} className="admin-textarea min-h-28" /></Field>
              <div className="rounded-lg border border-black/[.07] bg-[#f8f5ef] p-5"><p className="text-xs text-[#8a8178]">搜索结果预览</p><p className="mt-3 text-lg text-[#795a2e]">{form.title || '页面标题'}</p><p className="mt-1 text-xs text-emerald-700">chanmengtech.cn/content/{form.slug || 'page-slug'}</p><p className="mt-1 line-clamp-2 text-sm leading-6 text-[#71685f]">{form.summary || '页面描述将显示在这里。'}</p></div>
            </div>}
          </div>
        </main>

        <aside className="hidden w-[330px] shrink-0 overflow-y-auto border-l border-black/[.08] bg-[#fbfaf6] xl:block">
          <div className="space-y-7 p-6">
            <div>
              <p className="text-sm font-semibold text-[#292521]">发布设置</p>
              <p className="mt-1 text-xs text-[#9a9187]">完善信息有助于内容被搜索和推荐</p>
            </div>

            <Field label="内容分类">
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="admin-input" placeholder="请选择或输入分类" />
            </Field>
            <Field label="作者 / 团队">
              <input value={form.author || ''} onChange={(e) => setForm({ ...form, author: e.target.value })} className="admin-input" />
            </Field>
            <Field label="内容摘要" hint={`${form.summary?.length || 0}/160`}>
              <textarea value={form.summary || ''} maxLength={160} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="admin-textarea min-h-28" placeholder="用于列表、搜索结果和分享卡片" />
            </Field>

            <div>
              <div className="mb-2 flex items-center justify-between"><span className="text-sm font-medium">文章封面</span><span className="text-xs text-[#9a9187]">建议 16:9</span></div>
              <button type="button" className="grid min-h-32 w-full place-items-center rounded-lg border border-dashed border-[#c9beaf] bg-[#f8f5ef] text-center transition hover:border-[#9b753d] hover:bg-[#f3eee4]">
                <span><Plus className="mx-auto text-[#a89b8c]" size={22} /><b className="mt-2 block text-sm font-normal text-[#71685f]">上传封面图片</b><small className="mt-1 block text-[#a89b8c]">JPG / PNG，建议小于 5MB</small></span>
              </button>
            </div>

            <Field label="内容标签" hint="最多5个">
              <div className="flex min-h-12 flex-wrap items-center gap-2 rounded-lg border border-[#dfe2e6] px-3">
                <span className="rounded bg-[#f3eee4] px-2 py-1 text-xs text-[#9b753d]">企业增长</span>
                <span className="text-sm text-[#a89b8c]">+ 添加标签</span>
              </div>
            </Field>

            <Field label="发布状态">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as PublishStatus })} className="admin-input">
                <option>草稿</option><option>已发布</option>
              </select>
            </Field>

            <div className="rounded-lg bg-[#f3eee4] p-4 text-xs leading-6 text-[#81776d]">
              <p className="font-medium text-[#514a43]">发布检查</p>
              <p className="mt-2">标题：{form.title ? '已填写' : '待填写'}</p>
              <p>摘要：{form.summary ? '已填写' : '建议补充'}</p>
              <p>封面：待上传</p>
            </div>
          </div>
        </aside>
      </div>
    </form>
  </div>
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 flex items-center justify-between text-sm font-medium"><span>{label}{required ? <i className="ml-1 not-italic text-[#a83225]">*</i> : null}</span>{hint ? <small className="font-normal text-[#9a9188]">{hint}</small> : null}</span>{children}</label>
}

function Leads({ leads, onChange, notify }: { leads: Lead[]; onChange: (leads: Lead[]) => void; notify: (message: string) => void }) {
  const [selected, setSelected] = useState<Lead | null>(null)
  const [filter, setFilter] = useState<'全部' | LeadStatus>('全部')
  const filtered = leads.filter((lead) => filter === '全部' || lead.status === filter)

  function updateStatus(id: number, status: LeadStatus) {
    const next = leads.map((lead) => lead.id === id ? { ...lead, status } : lead)
    onChange(next)
    if (selected?.id === id) setSelected({ ...selected, status })
    notify('线索状态已更新')
  }

  return <section className="mx-auto max-w-[1440px]">
    <div><p className="text-xs font-medium tracking-[.14em] text-[#9b753d]">FORM DATA CENTER</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.035em]">表单数据中心</h2><p className="mt-2 text-sm text-[#8a8178]">统一汇总首页和联系销售页面提交的客户信息，并记录后续跟进。</p></div>
    <div className="mt-7 overflow-hidden rounded-[24px] border border-black/[.06] bg-white shadow-[0_10px_35px_rgba(54,44,31,.04)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-black/[.07] p-5">{(['全部','待跟进','沟通中','已联系','已成交'] as const).map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-xs transition ${filter === item ? 'bg-[#29231e] text-white' : 'bg-[#f5f1e9] text-[#71685f] hover:bg-[#ece4d7]'}`}>{item}</button>)}<span className="ml-auto text-xs text-[#978d83]">{filtered.length} 条线索</span></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[980px] text-left"><thead><tr className="border-b border-black/[.08] bg-[#faf8f3] text-xs text-[#8a8178]"><th className="px-6 py-4 font-medium">客户信息</th><th className="px-4 py-4 font-medium">需求</th><th className="px-4 py-4 font-medium">来源</th><th className="px-4 py-4 font-medium">提交时间</th><th className="px-4 py-4 font-medium">状态</th><th className="px-6 py-4 text-right font-medium">操作</th></tr></thead><tbody>{filtered.map((lead) => <tr key={lead.id} className="border-b border-black/[.06] last:border-0 hover:bg-[#fcfaf6]"><td className="px-6 py-5"><p className="text-sm font-medium">{lead.company}</p><p className="mt-1 text-xs text-[#978d83]">{lead.contact || '未填写联系人'} · {lead.phone}</p></td><td className="max-w-xs px-4 py-5 text-sm"><p className="line-clamp-2">{lead.demand}</p></td><td className="px-4 py-5 text-sm text-[#786f66]">{lead.source}</td><td className="px-4 py-5 text-sm text-[#8d8379]">{formatLeadTime(lead.submittedAt)}</td><td className="px-4 py-5"><LeadBadge status={lead.status} /></td><td className="px-6 py-5 text-right"><button onClick={() => setSelected(lead)} className="rounded-lg border border-black/[.08] px-3 py-2 text-xs transition hover:bg-[#f3eee4]">查看详情</button></td></tr>)}</tbody></table>{!filtered.length ? <div className="grid min-h-64 place-items-center text-center"><div><MessageSquareText className="mx-auto text-[#c1b8ad]" size={30} /><p className="mt-3 text-sm font-medium">暂时没有表单数据</p><p className="mt-1 text-xs text-[#978d83]">客户提交官网表单后会自动显示在这里</p></div></div> : null}</div>
    </div>
    {selected ? <LeadDetail lead={selected} onClose={() => setSelected(null)} onSave={(next) => { const updated = leads.map((lead) => lead.id === next.id ? next : lead); onChange(updated); notify('跟进记录已保存'); setSelected(null) }} onStatus={updateStatus} /> : null}
  </section>
}

function LeadDetail({ lead, onClose, onSave, onStatus }: { lead: Lead; onClose: () => void; onSave: (lead: Lead) => void; onStatus: (id: number, status: LeadStatus) => void }) {
  const [note, setNote] = useState(lead.note || '')
  return <div className="fixed inset-0 z-[80] flex justify-end bg-black/25 backdrop-blur-sm"><aside className="flex h-full w-full max-w-[500px] flex-col bg-[#fbfaf6] shadow-2xl"><header className="flex items-center justify-between border-b border-black/[.08] p-6"><div><p className="text-xs text-[#9b753d]">表单详情</p><h3 className="mt-1 text-xl font-semibold">{lead.company}</h3></div><button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-black/[.05]"><X size={17} /></button></header><div className="flex-1 overflow-y-auto p-6"><div className="grid grid-cols-2 gap-4"><Info label="联系人" value={lead.contact || '未填写'} /><Info label="联系电话" value={lead.phone} /><Info label="所属行业" value={lead.industry || '未填写'} /><Info label="提交时间" value={formatLeadTime(lead.submittedAt)} /><Info label="提交来源" value={lead.source} /><Info label="页面地址" value={lead.page || '未记录'} /></div><div className="mt-6 rounded-xl border border-black/[.07] bg-white p-4"><p className="text-xs text-[#8a8178]">客户需求</p><p className="mt-2 whitespace-pre-wrap text-sm leading-7">{lead.demand}</p></div><label className="mt-6 block text-sm font-medium">跟进状态<select value={lead.status} onChange={(e) => onStatus(lead.id, e.target.value as LeadStatus)} className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 outline-none"><option>待跟进</option><option>沟通中</option><option>已联系</option><option>已成交</option></select></label><label className="mt-5 block text-sm font-medium">跟进备注<textarea value={note} onChange={(e) => setNote(e.target.value)} className="admin-textarea mt-2 min-h-36" placeholder="记录沟通情况和下一步计划" /></label></div><footer className="border-t border-black/[.08] p-6"><button onClick={() => onSave({ ...lead, note })} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#29231e] py-3 text-sm font-semibold text-white"><Save size={15} />保存跟进记录</button></footer></aside></div>
}

function formatLeadTime(value: string) {
  if (!value) return '未知'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).format(date)
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-black/[.07] bg-white p-4"><p className="text-xs text-[#8a8178]">{label}</p><p className="mt-2 text-sm font-medium">{value}</p></div>
}

function AuditLog({ events }: { events: AuditEvent[] }) {
  const names: Record<string, string> = {
    'admin.login.success': '管理员登录成功',
    'admin.login.failed': '管理员登录失败',
    'admin.login.blocked': '登录请求已被限流',
    'admin.logout': '管理员退出登录',
    'lead.updated': '客户跟进记录更新',
  }
  return <section className="mx-auto max-w-[1440px]">
    <div><p className="text-xs font-medium tracking-[.14em] text-[#9b753d]">SECURITY AUDIT</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.035em]">安全操作日志</h2><p className="mt-2 text-sm text-[#8a8178]">记录后台登录、退出、拦截和客户数据修改行为。</p></div>
    <div className="mt-7 overflow-hidden rounded-[22px] border border-black/[.07] bg-white/80 shadow-[0_15px_40px_rgba(56,43,29,.06)]">
      <div className="overflow-x-auto"><table className="w-full min-w-[860px] text-left"><thead><tr className="border-b border-black/[.08] bg-[#faf8f3] text-xs text-[#8a8178]"><th className="px-6 py-4 font-medium">操作</th><th className="px-4 py-4 font-medium">账号</th><th className="px-4 py-4 font-medium">IP 地址</th><th className="px-4 py-4 font-medium">详情</th><th className="px-6 py-4 font-medium">时间</th></tr></thead><tbody>{events.map((event) => <tr key={event.id} className="border-b border-black/[.06] last:border-0"><td className="px-6 py-4 text-sm font-medium">{names[event.event] || event.event}</td><td className="px-4 py-4 text-sm text-[#71685f]">{event.actor}</td><td className="px-4 py-4 font-mono text-xs text-[#71685f]">{event.ip}</td><td className="max-w-md px-4 py-4 text-xs text-[#8d8379]">{event.detail || '—'}</td><td className="px-6 py-4 text-xs text-[#8d8379]">{formatLeadTime(event.createdAt)}</td></tr>)}</tbody></table>{!events.length ? <div className="grid min-h-56 place-items-center text-sm text-[#978d83]">暂无安全日志</div> : null}</div>
    </div>
  </section>
}

function SiteSettings({ notify }: { notify: (message: string) => void }) {
  const defaults = {
    company: '杭州婵梦传媒科技有限公司', shortName: '婵梦科技',
    consultPhone: '19812347986', partnerPhone: '19812347986',
    serviceEmail: 'yaoyuan@chanmengtech.cn', businessEmail: 'wangyuyin@chanmengtech.cn',
    address: '浙江省杭州市萧山区新街街道垦辉六路799号2号楼901-1室',
    slogan: 'AI赋能企业增长，让获客与成交有迹可循',
  }
  const [settings, setSettings] = useState(defaults)
  useEffect(() => {
    const saved = localStorage.getItem('chanmeng-admin-settings')
    if (saved) setSettings(JSON.parse(saved))
  }, [])

  function submit(event: FormEvent) {
    event.preventDefault()
    localStorage.setItem('chanmeng-admin-settings', JSON.stringify(settings))
    notify('网站设置已保存')
  }

  return <section className="mx-auto max-w-[1000px]">
    <div><p className="text-xs font-medium tracking-[.14em] text-[#9b753d]">SITE SETTINGS</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.035em]">网站设置</h2><p className="mt-2 text-sm text-[#8a8178]">管理官网基础信息、联系方式和品牌展示内容。</p></div>
    <form onSubmit={submit} className="mt-7 space-y-5">
      <SettingsCard title="企业信息" description="官网和页脚展示的公司主体信息"><div className="grid gap-5 sm:grid-cols-2"><SettingsInput label="公司全称" value={settings.company} onChange={(value) => setSettings({ ...settings, company: value })} /><SettingsInput label="品牌简称" value={settings.shortName} onChange={(value) => setSettings({ ...settings, shortName: value })} /></div><div className="mt-5"><SettingsInput label="品牌主张" value={settings.slogan} onChange={(value) => setSettings({ ...settings, slogan: value })} /></div></SettingsCard>
      <SettingsCard title="联系方式" description="客户在官网能够看到并使用的联系信息"><div className="grid gap-5 sm:grid-cols-2"><SettingsInput label="咨询电话" value={settings.consultPhone} onChange={(value) => setSettings({ ...settings, consultPhone: value })} /><SettingsInput label="合作电话" value={settings.partnerPhone} onChange={(value) => setSettings({ ...settings, partnerPhone: value })} /><SettingsInput label="客服邮箱" value={settings.serviceEmail} onChange={(value) => setSettings({ ...settings, serviceEmail: value })} /><SettingsInput label="商务邮箱" value={settings.businessEmail} onChange={(value) => setSettings({ ...settings, businessEmail: value })} /></div><div className="mt-5"><SettingsInput label="公司地址" value={settings.address} onChange={(value) => setSettings({ ...settings, address: value })} /></div></SettingsCard>
      <SettingsCard title="发布选项" description="控制网站内容的默认展示行为"><div className="space-y-3"><Toggle label="新内容默认保存为草稿" description="避免未审核内容直接出现在官网" defaultChecked /><Toggle label="显示内容更新时间" description="在文章和案例详情页展示最后更新时间" defaultChecked /><Toggle label="允许搜索引擎收录" description="关闭后将阻止搜索引擎索引官网内容" defaultChecked /></div></SettingsCard>
      <div className="sticky bottom-5 flex justify-end rounded-2xl border border-black/[.07] bg-white/90 p-4 shadow-xl backdrop-blur"><button className="flex items-center gap-2 rounded-xl bg-[#29231e] px-6 py-3 text-sm font-semibold text-white"><Save size={15} />保存全部设置</button></div>
    </form>
  </section>
}

function SettingsCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <section className="rounded-[24px] border border-black/[.06] bg-white p-6 md:p-7"><div className="mb-6 border-b border-black/[.07] pb-5"><h3 className="font-semibold">{title}</h3><p className="mt-1 text-xs text-[#978d83]">{description}</p></div>{children}</section>
}

function SettingsInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block text-sm font-medium">{label}<input value={value} onChange={(e) => onChange(e.target.value)} className="admin-input mt-2" /></label>
}

function Toggle({ label, description, defaultChecked }: { label: string; description: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(Boolean(defaultChecked))
  return <button type="button" onClick={() => setChecked(!checked)} className="flex w-full items-center justify-between gap-5 rounded-xl border border-black/[.06] p-4 text-left transition hover:bg-[#faf8f3]"><span><strong className="block text-sm font-medium">{label}</strong><small className="mt-1 block text-[#978d83]">{description}</small></span><span className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-[#9b753d]' : 'bg-[#d8d2c9]'}`}><i className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} /></span></button>
}

function Status({ status }: { status: PublishStatus }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${status === '已发布' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}><span className={`h-1.5 w-1.5 rounded-full ${status === '已发布' ? 'bg-emerald-500' : 'bg-amber-500'}`} />{status}</span>
}

function LeadBadge({ status }: { status: LeadStatus }) {
  const styles: Record<LeadStatus, string> = {
    '待跟进': 'bg-red-50 text-red-700', '沟通中': 'bg-amber-50 text-amber-700',
    '已联系': 'bg-sky-50 text-sky-700', '已成交': 'bg-emerald-50 text-emerald-700',
  }
  return <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] ${styles[status]}`}>{status}</span>
}
