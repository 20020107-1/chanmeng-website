import { NextResponse } from 'next/server'
import { securityConfigured, setAdminSession, validAdminCredentials } from '@/lib/admin-auth'
import { clientIp, sameOriginRequest } from '@/lib/request-security'
import { clearLoginFailures, getLoginBlock, recordLoginFailure, writeAudit } from '@/lib/security-store'

export async function POST(request: Request) {
  if (!sameOriginRequest(request)) return NextResponse.json({ success: false, message: '请求来源无效' }, { status: 403 })
  const ip = clientIp(request)
  const body = await request.json().catch(() => ({}))
  const username = String(body.username || '').trim().slice(0, 80)
  const key = `${ip}:${username.toLowerCase()}`
  const block = await getLoginBlock(key)
  if (block.blocked) {
    await writeAudit({ event: 'admin.login.blocked', actor: username || 'unknown', ip })
    return NextResponse.json(
      { success: false, message: `登录尝试过多，请在 ${Math.ceil(block.retryAfter / 60)} 分钟后重试` },
      { status: 429, headers: { 'Retry-After': String(block.retryAfter) } },
    )
  }
  if (!securityConfigured()) {
    return NextResponse.json({ success: false, message: '后台安全配置未完成，已拒绝登录' }, { status: 503 })
  }
  if (!await validAdminCredentials(username, String(body.password || ''))) {
    await recordLoginFailure(key)
    await writeAudit({ event: 'admin.login.failed', actor: username || 'unknown', ip })
    return NextResponse.json({ success: false, message: '账号或密码不正确' }, { status: 401 })
  }
  await clearLoginFailures(key)
  await setAdminSession(username, ip, request.headers.get('user-agent') || '')
  await writeAudit({ event: 'admin.login.success', actor: username, ip })
  return NextResponse.json({ success: true })
}
