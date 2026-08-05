export const dynamic = "force-static";

import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { readAuditLog } from '@/lib/security-store'

export async function GET() {
  if (!await isAdminAuthenticated()) return NextResponse.json({ message: '未登录' }, { status: 401 })
  return NextResponse.json({ success: true, events: await readAuditLog() })
}
