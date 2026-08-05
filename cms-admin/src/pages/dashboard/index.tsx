/**
 * 仪表盘：数据卡片 + 7 天访问趋势 + 待办事项 + 快捷操作
 */
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  Eye, UsersRound, FileText, MessageSquare, Plus, Bell, ClipboardCheck, ArrowRight,
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { dashboardApi, articleApi, messageApi } from '@/services'
import { usePermission } from '@/hooks'
import { PageHeader } from '@/components/common'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils'

export default function DashboardPage() {
  const { canCreate, canAudit } = usePermission()

  const { data: stats, isLoading } = useQuery({ queryKey: ['dashboard-stats'], queryFn: dashboardApi.stats })
  const { data: drafts } = useQuery({
    queryKey: ['articles', 'drafts'],
    queryFn: () => articleApi.list({ page: 1, pageSize: 5, status: 'draft' }),
  })
  const { data: messages } = useQuery({
    queryKey: ['messages', 'todo'],
    queryFn: () => messageApi.list({ page: 1, pageSize: 5, status: 'unprocessed' }),
  })

  const cards = [
    { label: '今日访问量 PV', value: stats?.todayPV, icon: Eye, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950' },
    { label: '今日访客 UV', value: stats?.todayUV, icon: UsersRound, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950' },
    { label: '文章总数', value: stats?.articleCount, icon: FileText, color: 'text-violet-600 bg-violet-50 dark:bg-violet-950' },
    { label: '待处理留言', value: stats?.messageCount, icon: MessageSquare, color: 'text-orange-600 bg-orange-50 dark:bg-orange-950' },
  ]

  return (
    <div>
      <PageHeader title="仪表盘" description="官网运营数据一览" />

      {/* 数据卡片 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${c.color}`}>
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                {isLoading ? (
                  <Skeleton className="h-7 w-16" />
                ) : (
                  <p className="text-2xl font-bold tabular-nums">{c.value?.toLocaleString()}</p>
                )}
                <p className="text-xs text-muted-foreground">{c.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* 访问趋势 */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">最近 7 天访问趋势</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={stats?.pvTrend ?? []}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" name="PV" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="uv" name="UV" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* 快捷操作 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">快捷操作</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {canCreate('articles') && (
              <Button asChild variant="outline" className="h-auto flex-col gap-1.5 py-4">
                <Link to="/articles/new"><Plus className="h-5 w-5" />发布文章</Link>
              </Button>
            )}
            <Button asChild variant="outline" className="h-auto flex-col gap-1.5 py-4">
              <Link to="/media"><FileText className="h-5 w-5" />媒体库</Link>
            </Button>
            {canAudit('messages') && (
              <Button asChild variant="outline" className="h-auto flex-col gap-1.5 py-4">
                <Link to="/messages"><Bell className="h-5 w-5" />处理留言</Link>
              </Button>
            )}
            {canAudit('articles') && (
              <Button asChild variant="outline" className="h-auto flex-col gap-1.5 py-4">
                <Link to="/articles"><ClipboardCheck className="h-5 w-5" />审核文章</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 待办事项 */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">待审核 / 草稿文章</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/articles">全部 <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {drafts?.list.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">没有待处理的文章</p>}
            {drafts?.list.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="line-clamp-1 flex-1">{a.title}</span>
                <Badge variant="secondary">草稿</Badge>
                <span className="shrink-0 text-xs text-muted-foreground">{formatDate(a.updatedAt, false)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">新留言提醒</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/messages">全部 <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {messages?.list.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">没有未处理的留言</p>}
            {messages?.list.map((m) => (
              <div key={m.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="shrink-0 font-medium">{m.name}</span>
                <span className="line-clamp-1 flex-1 text-muted-foreground">{m.content}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{formatDate(m.createdAt, false)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
