import { NextResponse } from 'next/server'
import { createLead, readLeads, updateLead } from '@/lib/lead-store'
import { getAdminSession, isAdminAuthenticated } from '@/lib/admin-auth'
import { clientIp, sameOriginRequest } from '@/lib/request-security'
import { consumeFormSubmission, writeAudit } from '@/lib/security-store'

function clean(value: unknown, maxLength: number) {
  return String(value || '').trim().slice(0, maxLength)
}

export async function POST(request: Request) {
  if (!sameOriginRequest(request)) return NextResponse.json({ success: false, message: '请求来源无效' }, { status: 403 })
  const rate = await consumeFormSubmission(clientIp(request))
  if (!rate.allowed) {
    return NextResponse.json(
      { success: false, message: '提交过于频繁，请稍后再试' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } },
    )
  }
  const body = await request.json().catch(() => ({}))
  if (body.website) return NextResponse.json({ success: true })

  const phone = clean(body.phone, 20).replace(/\D/g, '')
  const company = clean(body.company || body.name, 120)
  const demand = clean(body.demand, 2000)
  if (!company || !/^1[3-9]\d{9}$/.test(phone) || !demand) {
    return NextResponse.json({ success: false, message: '请完整填写公司/姓名、手机号码和需求描述' }, { status: 400 })
  }

  const lead = await createLead({
    company,
    contact: clean(body.contact || body.name, 80),
    phone,
    industry: clean(body.industry, 80),
    demand,
    source: clean(body.source, 80) || '官网表单',
    page: clean(body.page, 300),
  })
  return NextResponse.json({ success: true, id: lead.id })
}

export async function GET() {
  if (!await isAdminAuthenticated()) return NextResponse.json({ message: '未登录' }, { status: 401 })
  return NextResponse.json({ success: true, leads: await readLeads() })
}

export async function PATCH(request: Request) {
  if (!sameOriginRequest(request)) return NextResponse.json({ message: '请求来源无效' }, { status: 403 })
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ message: '未登录' }, { status: 401 })
  const body = await request.json().catch(() => ({}))
  const id = Number(body.id)
  if (!id) return NextResponse.json({ message: '缺少线索编号' }, { status: 400 })
  const allowed = ['待跟进', '沟通中', '已联系', '已成交']
  const status = allowed.includes(body.status) ? body.status : undefined
  const updates: { status?: '待跟进' | '沟通中' | '已联系' | '已成交'; note?: string } = {}
  if (status) updates.status = status
  if (typeof body.note === 'string') updates.note = clean(body.note, 2000)
  const lead = await updateLead(id, updates)
  if (!lead) return NextResponse.json({ message: '线索不存在' }, { status: 404 })
  await writeAudit({
    event: 'lead.updated',
    actor: session.username,
    ip: clientIp(request),
    detail: `lead=${id};status=${updates.status || 'unchanged'};note=${updates.note === undefined ? 'unchanged' : 'updated'}`,
  })
  return NextResponse.json({ success: true, lead })
}
