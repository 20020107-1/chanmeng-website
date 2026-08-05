/**
 * 公共小组件：页面头部、空状态、确认对话框、状态徽标
 */
import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

/** 页面标题栏：标题 + 描述 + 右侧操作区 */
export function PageHeader({ title, description, extra }: { title: string; description?: string; extra?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {extra && <div className="flex items-center gap-2">{extra}</div>}
    </div>
  )
}

/** 空状态 */
export function EmptyState({ text = '暂无数据', children }: { text?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <Inbox className="h-10 w-10 opacity-40" />
      <p className="text-sm">{text}</p>
      {children}
    </div>
  )
}

/** 删除确认对话框（包一层 AlertDialog，触发器由调用方传入） */
export function ConfirmDialog({
  trigger, title = '确认操作', description, onConfirm, destructive = true,
}: {
  trigger: ReactNode
  title?: string
  description: string
  onConfirm: () => void
  destructive?: boolean
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={destructive ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
          >
            确认
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/** 文章状态徽标 */
export function ArticleStatusBadge({ status }: { status: 'draft' | 'published' | 'scheduled' }) {
  const map = {
    draft: { label: '草稿', variant: 'secondary' as const },
    published: { label: '已发布', variant: 'default' as const },
    scheduled: { label: '定时发布', variant: 'outline' as const },
  }
  const { label, variant } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}
