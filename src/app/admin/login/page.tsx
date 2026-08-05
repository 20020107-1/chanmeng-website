'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, LockKeyhole } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError('')
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).catch(() => null)
    if (response?.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      const result = response ? await response.json().catch(() => ({})) : {}
      setError(result.message || '登录失败，请稍后重试')
    }
  }

  return (
    <main className="admin-login grid min-h-screen lg:grid-cols-[1.08fr_.92fr]">
      <section className="admin-login-art relative hidden overflow-hidden border-r border-[#ae8448]/15 p-14 text-[#241f1a] lg:flex lg:flex-col">
        <div className="relative flex items-center gap-3 text-lg font-semibold tracking-[.12em]"><span className="h-px w-10 bg-[#b9853e]" />婵梦科技</div>
        <div className="relative my-auto max-w-xl">
          <p className="text-sm tracking-[.24em] text-[#a86f2e]">CONTENT OPERATING SYSTEM</p>
          <h1 className="mt-6 font-serif text-6xl leading-[1.08] tracking-[-.04em]">让官网内容管理<br />清晰而有秩序</h1>
          <p className="mt-7 max-w-lg text-base leading-8 text-[#665d53]">统一管理新闻、案例、核心服务和客户咨询，让每一次官网更新都有记录、可追踪。</p>
        </div>
        <p className="relative text-xs text-[#877969]">© 2026 杭州婵梦传媒科技有限公司</p>
      </section>
      <section className="flex items-center justify-center px-6 py-12">
        <form onSubmit={submit} className="w-full max-w-[420px] rounded-[28px] border border-[#b78a4d]/20 bg-[#fffdf8]/85 p-8 shadow-[0_24px_70px_rgba(85,61,31,.12)] backdrop-blur md:p-10">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#a83225] text-white shadow-[0_8px_22px_rgba(168,50,37,.2)]"><LockKeyhole size={20} /></div>
          <h2 className="mt-7 text-3xl font-semibold tracking-[-.04em] text-[#28231f]">登录管理后台</h2>
          <p className="mt-2 text-sm text-[#746b61]">请输入管理员账号继续</p>
          <label className="mt-8 block text-sm font-medium text-[#413b35]">管理员账号
            <input value={username} onChange={(e) => { setUsername(e.target.value); setError('') }} autoComplete="username" className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-white px-4 outline-none transition focus:border-[#a3783c] focus:ring-4 focus:ring-[#a3783c]/10" placeholder="请输入账号" />
          </label>
          <label className="mt-5 block text-sm font-medium text-[#413b35]">登录密码
            <span className="relative mt-2 block">
              <input value={password} onChange={(e) => { setPassword(e.target.value); setError('') }} type={visible ? 'text' : 'password'} autoComplete="current-password" className="h-12 w-full rounded-xl border border-black/10 bg-white px-4 pr-12 outline-none transition focus:border-[#a3783c] focus:ring-4 focus:ring-[#a3783c]/10" placeholder="请输入密码" />
              <button type="button" onClick={() => setVisible(!visible)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#81776c]">{visible ? <EyeOff size={17} /> : <Eye size={17} />}</button>
            </span>
          </label>
          {error ? <p className="mt-4 text-sm text-[#a83225]">{error}</p> : null}
          <button className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#29231e] text-sm font-semibold text-white transition hover:bg-[#a83225]">进入后台 <ArrowRight size={16} /></button>
          <p className="mt-5 text-center text-xs leading-5 text-[#999087]">后台已启用强密码、服务器会话与登录限速保护</p>
        </form>
      </section>
    </main>
  )
}
