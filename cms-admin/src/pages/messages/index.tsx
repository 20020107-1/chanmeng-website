/**
 * 留言管理：列表 + 状态标记 + 导出 Excel（CSV）+ 删除
 */
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Check, Download, Search, Trash2, Undo2 } from 'lucide-react'
import { formApi, messageApi } from '@/services'
import { useDebounce, usePermission } from '@/hooks'
import { ConfirmDialog, PageHeader } from '@/components/common'
import { DataTable, Pager, type Column } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import type { Message } from '@/types'
import { downloadFile, formatDate, toCsv } from '@/utils'

export default function MessagesPage() {
  const queryClient = useQueryClient()
  const { canEdit, canDelete } = usePermission()
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState('all')
  const [formId, setFormId] = useState('all')
  const debouncedKeyword = useDebounce(keyword)

  const { data, isLoading } = useQuery({
    queryKey: ['messages', page, debouncedKeyword, status, formId],
    queryFn: () =>
      messageApi.list({
        page, pageSize: 10,
        keyword: debouncedKeyword || undefined,
        status: status === 'all' ? undefined : status,
        formId: formId === 'all' ? undefined : formId,
      }),
  })
  const { data: forms } = useQuery({ queryKey: ['forms'], queryFn: formApi.list })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['messages'] })

  const statusMutation = useMutation({
    mutationFn: ({ id, s }: { id: number; s: Message['status'] }) => messageApi.setStatus(id, s),
    onSuccess: (m) => { toast.success(m.status === 'processed' ? '已标记为已处理' : '已恢复为未处理'); invalidate() },
  })
  const removeMutation = useMutation({
    mutationFn: messageApi.remove,
    onSuccess: () => { toast.success('已删除'); invalidate() },
  })

  /** 导出 Excel（CSV 格式，Excel 可直接打开） */
  const handleExport = () => {
    const list = data?.list ?? []
    if (list.length === 0) {
      toast.info('当前没有可导出的留言')
      return
    }
    const csv = toCsv(
      ['姓名', '电话', '留言内容', '来源表单', '状态', '提交时间'],
      list.map((m) => [
        m.name, m.phone, m.content,
        forms?.find((f) => f.id === m.formId)?.name ?? '官网留言',
        m.status === 'processed' ? '已处理' : '未处理',
        formatDate(m.createdAt),
      ]),
    )
    downloadFile(`留言导出_${formatDate(new Date().toISOString(), false)}.csv`, csv, 'text/csv')
    toast.success('已导出当前页数据')
  }

  const columns: Column<Message>[] = [
    { key: 'name', title: '姓名', width: 110, sortValue: (r) => r.name },
    { key: 'phone', title: '电话', width: 140 },
    { key: 'content', title: '留言内容', render: (r) => <span className="line-clamp-2">{r.content}</span> },
    {
      key: 'formId', title: '来源', width: 110,
      render: (r) => forms?.find((f) => f.id === r.formId)?.name ?? '官网留言',
    },
    {
      key: 'status', title: '状态', width: 100,
      render: (r) => r.status === 'processed'
        ? <Badge variant="secondary">已处理</Badge>
        : <Badge>未处理</Badge>,
    },
    { key: 'createdAt', title: '提交时间', sortValue: (r) => r.createdAt, render: (r) => formatDate(r.createdAt) },
    {
      key: 'actions', title: '操作', width: 150,
      render: (r) => (
        <div className="flex gap-1">
          {canEdit('messages') && (
            <Button
              variant="ghost" size="sm"
              onClick={() => statusMutation.mutate({ id: r.id, s: r.status === 'processed' ? 'unprocessed' : 'processed' })}
            >
              {r.status === 'processed'
                ? <><Undo2 className="mr-1 h-3.5 w-3.5" />恢复</>
                : <><Check className="mr-1 h-3.5 w-3.5" />已处理</>}
            </Button>
          )}
          {canDelete('messages') && (
            <ConfirmDialog
              trigger={<Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>}
              title="删除留言"
              description={`确定删除 ${r.name} 的留言吗？`}
              onConfirm={() => removeMutation.mutate(r.id)}
            />
          )}
        </div>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="留言管理"
        description="处理官网收到的客户留言"
        extra={<Button variant="outline" onClick={handleExport}><Download className="mr-1 h-4 w-4" />导出 Excel</Button>}
      />

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="w-56 pl-8" placeholder="搜索姓名 / 内容…" value={keyword} onChange={(e) => { setKeyword(e.target.value); setPage(1) }} />
        </div>
        <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1) }}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="unprocessed">未处理</SelectItem>
            <SelectItem value="processed">已处理</SelectItem>
          </SelectContent>
        </Select>
        <Select value={formId} onValueChange={(v) => { setFormId(v); setPage(1) }}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部来源</SelectItem>
            {forms?.map((f) => <SelectItem key={f.id} value={String(f.id)}>{f.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns} data={data?.list ?? []} loading={isLoading}
        emptyText="暂无留言"
        rowClassName={(r) => (r.status === 'unprocessed' ? 'bg-primary/[0.03]' : undefined)}
      />
      <Pager page={page} pageSize={10} total={data?.total ?? 0} onChange={setPage} />
    </div>
  )
}
