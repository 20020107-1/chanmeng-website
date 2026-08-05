/**
 * 友情链接管理：名称 / URL / Logo / 排序
 */
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ArrowDown, ArrowUp, ExternalLink, Pencil, Plus, Trash2 } from 'lucide-react'
import { linkApi } from '@/services'
import { usePermission } from '@/hooks'
import { ConfirmDialog, PageHeader } from '@/components/common'
import { DataTable, type Column } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import type { FriendLink } from '@/types'

export default function LinksPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<FriendLink | null>(null)
  const [form, setForm] = useState({ name: '', url: '', logo: '' })

  const { data: list, isLoading } = useQuery({ queryKey: ['links'], queryFn: linkApi.list })
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['links'] })

  const saveMutation = useMutation({
    mutationFn: () =>
      editing
        ? linkApi.update(editing.id, form)
        : linkApi.create({ ...form, order: (list?.length ?? 0) + 1 }),
    onSuccess: () => { toast.success('已保存'); setDialogOpen(false); invalidate() },
  })
  const removeMutation = useMutation({
    mutationFn: linkApi.remove,
    onSuccess: () => { toast.success('已删除'); invalidate() },
  })
  const moveMutation = useMutation({
    mutationFn: async ({ l, dir }: { l: FriendLink; dir: -1 | 1 }) => {
      const arr = [...(list ?? [])].sort((a, b) => a.order - b.order)
      const idx = arr.findIndex((x) => x.id === l.id)
      const swap = arr[idx + dir]
      if (!swap) return
      await linkApi.update(l.id, { order: swap.order })
      await linkApi.update(swap.id, { order: l.order })
    },
    onSuccess: () => invalidate(),
  })

  const columns: Column<FriendLink>[] = [
    {
      key: 'logo', title: 'Logo', width: 80,
      render: (r) => r.logo
        ? <img src={r.logo} alt={r.name} className="h-8 w-8 rounded object-contain" />
        : <span className="flex h-8 w-8 items-center justify-center rounded bg-muted text-xs">{r.name[0]}</span>,
    },
    { key: 'name', title: '名称', sortValue: (r) => r.name },
    {
      key: 'url', title: '链接地址',
      render: (r) => (
        <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
          {r.url} <ExternalLink className="h-3 w-3" />
        </a>
      ),
    },
    { key: 'order', title: '排序', sortValue: (r) => r.order, width: 80 },
    {
      key: 'actions', title: '操作', width: 220,
      render: (r) => (
        <div className="flex gap-0.5">
          {canEdit('links') && (
            <>
              <Button variant="ghost" size="icon" title="上移" onClick={() => moveMutation.mutate({ l: r, dir: -1 })}><ArrowUp className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" title="下移" onClick={() => moveMutation.mutate({ l: r, dir: 1 })}><ArrowDown className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" title="编辑" onClick={() => { setEditing(r); setForm({ name: r.name, url: r.url, logo: r.logo }); setDialogOpen(true) }}>
                <Pencil className="h-4 w-4" />
              </Button>
            </>
          )}
          {canDelete('links') && (
            <ConfirmDialog
              trigger={<Button variant="ghost" size="icon" title="删除"><Trash2 className="h-4 w-4 text-destructive" /></Button>}
              title="删除友情链接"
              description={`确定删除「${r.name}」吗？`}
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
        title="友情链接"
        description="管理官网页脚的友情链接"
        extra={canCreate('links') && (
          <Button onClick={() => { setEditing(null); setForm({ name: '', url: '', logo: '' }); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" />新增链接
          </Button>
        )}
      />
      <DataTable columns={columns} data={list ?? []} loading={isLoading} emptyText="暂无友情链接" />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? '编辑链接' : '新增链接'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>名称</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>链接地址</Label>
              <Input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} placeholder="https://" />
            </div>
            <div className="space-y-1.5">
              <Label>Logo 地址（可选）</Label>
              <Input value={form.logo} onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))} placeholder="https://…/logo.png" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button disabled={!form.name.trim() || !form.url.trim() || saveMutation.isPending} onClick={() => saveMutation.mutate()}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
