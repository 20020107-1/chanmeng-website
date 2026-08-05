export const dynamic = "force-static";

import { NextResponse } from 'next/server'
import { clearAdminSession, getAdminSession } from '@/lib/admin-auth'
import { clientIp, sameOriginRequest } from '@/lib/request-security'
import { writeAudit } from '@/lib/security-store'

export async function POST(request: Request) {
  if (!sameOriginRequest(request)) return NextResponse.json({ success: false }, { status: 403 })
  const session = await getAdminSession()
  await clearAdminSession()
  await writeAudit({ event: 'admin.logout', actor: session?.username || 'unknown', ip: clientIp(request) })
  return NextResponse.json({ success: true })
}
