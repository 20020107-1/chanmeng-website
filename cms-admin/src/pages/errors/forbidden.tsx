/**
 * 403 无权限页面
 */
import { Link } from 'react-router-dom'
import { ShieldX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-muted/40 p-4 text-center">
      <ShieldX className="h-16 w-16 text-muted-foreground/50" />
      <h1 className="text-3xl font-bold">403</h1>
      <p className="text-muted-foreground">当前账号没有访问该模块的权限，请联系管理员开通。</p>
      <Button asChild><Link to="/">返回仪表盘</Link></Button>
    </div>
  )
}
