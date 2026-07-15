'use client'

import { useState } from 'react'
import Link from 'next/link'
import BrandMark from '@/components/brand-mark'
import BrandName from '@/components/brand-name'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', industry: '', demand: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const formEndpoint = 'https://api.web3forms.com/submit'
  const web3FormsAccessKey = '83098712-93d4-49fb-92c3-27126baab3c9'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!formEndpoint) {
      e.preventDefault()
      setSubmitError('在线咨询通道正在配置，请先通过企微邮箱 yaoyuan@chanmengtech.cn 联系我们。')
      return
    }
    setSubmitError('')
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark />
            <BrandName />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/services" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">核心服务</Link>
            <Link href="/solutions" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">解决方案</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">联系我们</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            填写以下信息，我们将尽快与您联系
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 联系信息 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">联系方式</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">📍</div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">公司地址</p>
                  <p className="text-gray-500 text-sm mt-1">浙江省杭州市萧山区（精确地址请预约后获取）</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">📧</div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">企微邮箱</p>
                  <p className="text-gray-500 text-sm mt-1">
                    <a href="mailto:yaoyuan@chanmengtech.cn" className="hover:text-blue-600 transition-colors">yaoyuan@chanmengtech.cn</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">🕐</div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">工作时间</p>
                  <p className="text-gray-500 text-sm mt-1">周一至周五 9:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500 leading-relaxed">
                <strong className="text-gray-800">杭州婵梦传媒科技有限公司</strong><br />
                AI驱动的合伙制企业增长全链路平台
              </p>
            </div>
          </div>

          {/* 表单 */}
          <div>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">提交成功</h3>
                <p className="text-gray-600 text-sm">感谢您的咨询，我们将在1-2个工作日内与您联系。</p>
              </div>
            ) : (
              <form action={formEndpoint} method="POST" target="_blank" onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="access_key" value={web3FormsAccessKey} />
                <input type="hidden" name="subject" value="婵梦科技官网｜联系页面客户咨询" />
                <input type="hidden" name="from_name" value="婵梦科技官网" />
                <input type="hidden" name="redirect" value="https://web3forms.com/success" />
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">您的姓名 / 公司名称 *</label>
                  <input id="name" name="姓名或公司名称" type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">联系电话 / 微信 *</label>
                  <input id="phone" name="联系方式" type="text" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">所属行业</label>
                  <select id="industry" name="所属行业" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                    <option value="">请选择</option>
                    <option value="制造业">制造业 / 工厂</option>
                    <option value="外贸">外贸 / 进出口</option>
                    <option value="跨境电商">跨境电商</option>
                    <option value="本地服务">本地服务 / 零售</option>
                    <option value="品牌出海">品牌出海</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="demand" className="block text-sm font-medium text-gray-700 mb-1">需求描述 *</label>
                  <textarea id="demand" name="需求描述" required rows={4} value={form.demand} onChange={e => setForm({...form, demand: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    placeholder="请描述您的需求或合作意向" />
                </div>
                <button type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-500 text-white py-4 rounded-lg font-semibold transition shadow-lg shadow-blue-500/20">
                  提交咨询
                </button>
                {submitError && <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">{submitError}</p>}
              </form>
            )}
            <iframe name="_contact-submit" className="hidden" title="联系表单提交" />
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-500 py-8 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/" className="hover:text-gray-300 transition-colors">首页</Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors">关于我们</Link>
            <Link href="/services" className="hover:text-gray-300 transition-colors">核心服务</Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">隐私政策</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">服务条款</Link>
          </div>
          <p>© 2026 杭州婵梦传媒科技有限公司 · 保留所有权利</p>
        </div>
      </footer>
    </div>
  )
}
