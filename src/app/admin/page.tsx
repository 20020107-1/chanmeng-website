export const dynamic = "force-static";

import AdminDashboard from './admin-dashboard'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: '管理后台｜婵梦科技',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  if (!await isAdminAuthenticated()) redirect('/admin/login')
  return <AdminDashboard />
}
