'use client'

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import Footer from '@/components/footer'
import PhoneVerificationFields from '@/components/phone-verification-fields'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', industry: '', demand: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!/^1[3-9]\d{9}$/.test(form.phone)) {
      setSubmitError('请输入有效的中国大陆手机号码。')
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.name,
          contact: form.name,
          phone: form.phone,
          industry: form.industry,
          demand: form.demand,
          source: '联系销售页面',
          page: window.location.href,
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || '提交失败')
      setSubmitted(true)
      setForm({ name: '', phone: '', industry: '', demand: '' })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '提交失败，请稍后重试。')
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = 'w-full rounded-xl border border-[#d9d1c5] bg-white px-4 py-3.5 text-[15px] text-[#292521] outline-none transition-all duration-200 placeholder:text-[#aaa39a] hover:border-[#bba98f] focus:border-[#E2492F] focus:ring-4 focus:ring-[#E2492F]/[0.08]'

  return (
    <div className="min-h-screen bg-[#f7f3eb] text-[#292521]">
      <SiteHeader active="/contact" />

      <main>
        <section className="border-b border-[#ded5c7] bg-[#fbfaf6] px-4 py-14 md:px-6 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-end">
              <div>
                <p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-[#E2492F]">
                  <span className="h-px w-8 bg-[#E2492F]" /> CONTACT SALES
                </p>
                <h1 className="text-4xl font-semibold tracking-[-0.05em] text-[#211d18] md:text-6xl">预约诊断</h1>
              </div>
              <p className="max-w-xl text-base leading-8 text-[#6f675e] md:pb-1">
                告诉我们您当前所处的业务阶段、主要问题和增长目标。我们会先判断需求，再安排合适的顾问与您沟通。
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:px-6 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
            <aside className="self-start rounded-[24px] border border-[#ded5c7] bg-[#f1eadf] p-7 md:p-9 lg:sticky lg:top-24">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#E2492F]">沟通前，您可以先了解</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-[#211d18]">我们如何承接您的需求</h2>
              <ol className="mt-8 divide-y divide-[#d8cdbc] border-y border-[#d8cdbc]">
                {[
                  ['01', '提交需求', '说明企业阶段、主要问题与目标'],
                  ['02', '需求判断', '由团队判断服务范围与优先级'],
                  ['03', '顾问联系', '两到三个工作日内安排初步沟通'],
                ].map(([number, title, description]) => (
                  <li key={number} className="grid grid-cols-[42px_1fr] gap-3 py-5">
                    <span className="font-serif text-lg text-[#a2763a]">{number}</span>
                    <div>
                      <p className="text-[15px] font-semibold text-[#292521]">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#777066]">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 space-y-5 text-sm">
                <div>
                  <p className="font-semibold text-[#292521]">咨询电话</p>
                  <a href="tel:19812347986" className="mt-1 inline-block text-[#6f675e] transition-colors hover:text-[#E2492F]">19812347986</a>
                </div>
                <div>
                  <p className="font-semibold text-[#292521]">企微客服邮箱</p>
                  <a href="mailto:yaoyuan@chanmengtech.cn" className="mt-1 inline-block break-all text-[#6f675e] transition-colors hover:text-[#E2492F]">yaoyuan@chanmengtech.cn</a>
                </div>
                <div>
                  <p className="font-semibold text-[#292521]">公司地址</p>
                  <p className="mt-1 leading-6 text-[#6f675e]">浙江省杭州市萧山区新街街道垦辉六路799号2号楼901-1室</p>
                </div>
                <div>
                  <p className="font-semibold text-[#292521]">工作时间</p>
                  <p className="mt-1 text-[#6f675e]">周一至周五 9:00–18:00</p>
                </div>
              </div>
            </aside>

            <div className="rounded-[24px] border border-[#ded5c7] bg-[#fbfaf6] p-6 shadow-[0_18px_60px_rgba(75,57,36,.06)] md:p-10">
              <div className="mb-8 flex items-start justify-between gap-4 border-b border-[#e1d9ce] pb-6">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#a2763a]">BUSINESS INQUIRY</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-[#211d18]">提交业务需求</h2>
                  <p className="mt-2 text-sm leading-6 text-[#777066]">带 * 为必填项，信息仅用于本次业务沟通。</p>
                </div>
                <span className="hidden rounded-full border border-[#d8cdbc] px-3 py-1.5 text-xs text-[#777066] sm:inline-flex">预计填写 2 分钟</span>
              </div>

            {submitted ? (
              <div className="rounded-2xl border border-[#c9b998] bg-[#F2EFE9] px-6 py-14 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#E2492F] text-xl text-white">✓</div>
                <h3 className="mt-5 text-2xl font-semibold text-[#211d18]">需求已提交</h3>
                <p className="mt-3 text-sm leading-7 text-[#6f675e]">感谢您的咨询，我们将在两到三个工作日内与您联系。</p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-[#E2492F] hover:underline">继续提交其他需求</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#514a43]">您的姓名 / 公司名称 *</label>
                  <input id="name" name="姓名或公司名称" type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className={fieldClass} placeholder="例如：王女士 / 杭州某某有限公司" />
                </div>
                <PhoneVerificationFields
                  id="phone"
                  name="手机号码"
                  value={form.phone}
                  onChange={e => {
                    setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })
                    setSubmitError('')
                  }}
                  error={submitError.includes('手机号码') ? submitError : undefined}
                  inputClassName={fieldClass}
                />
                <div>
                  <label htmlFor="industry" className="mb-2 block text-sm font-medium text-[#514a43]">所属行业</label>
                  <select id="industry" name="所属行业" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})}
                    className={fieldClass}>
                    <option value="">请选择</option>
                    <option value="企业品牌">企业品牌</option>
                    <option value="个人IP">个人IP / 知识服务</option>
                    <option value="制造业">制造业</option>
                    <option value="本地服务">本地生活服务</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="demand" className="mb-2 block text-sm font-medium text-[#514a43]">需求描述 *</label>
                  <textarea id="demand" name="需求描述" required rows={5} value={form.demand} onChange={e => setForm({...form, demand: e.target.value})}
                    className={`${fieldClass} resize-none`}
                    placeholder="建议说明：目前业务阶段、主要问题、希望达到的目标" />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full rounded-xl bg-[#211d18] py-4 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(33,29,24,.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C93A26] disabled:cursor-not-allowed disabled:opacity-60">
                  {submitting ? '提交中...' : '提交咨询'}
                </button>
                {submitError && !submitError.includes('手机号码') && <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">{submitError}</p>}
                <p className="text-center text-xs leading-5 text-[#91897f]">
                  提交即表示您同意我们仅为本次业务沟通保存和使用以上信息。
                  <Link href="/privacy" className="ml-1 text-[#E2492F] hover:underline">查看隐私政策</Link>
                </p>
              </form>
            )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
