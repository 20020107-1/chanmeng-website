/**
 * 轮播图 / Banner 管理：位置标识 + 排序 + 链接跳转 + 上线开关
 */
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from 'lucide-react'
import { bannerApi } from '@/services'
import { usePermission } from '@/hooks'
import { ConfirmDialog, PageHeader } from '@/components/common'
import { UploadZone } from '@/components/upload-zone'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { BANNER_POSITIONS } from '@/constants'
import type { Banner } from '@/types'

export default function BannerPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Banner | null>(null)
  const [form, setForm] = useState({ title: '', image: '', link: '', position: BANNER_POSITIONS[0] })

  const { data: list } = useQuery({ queryKey: ['banners'], queryFn: bannerApi.list })
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['banners'] })

  const saveMutation = useMutation({
    mutationFn: () =>
      editing
        ? bannerApi.update(editing.id, { ...form })
        : bannerApi.create({ ...form, order: (list?.length ?? 0) + 1, enabled: true }),
    onSuccess: () => { toast.success('已保存'); setDialogOpen(false); invalidate() },
  })
  const toggleMutation = useMutation({
    mutationFn: bannerApi.toggle,
    onSuccess: (b) => { toast.success(b.enabled ? '已上线' : '已下线'); invalidate() },
  })
  const removeMutation = useMutation({
    mutationFn: bannerApi.remove,
    onSuccess: () => { toast.success('已删除'); invalidate() },
  })
  /** 同位置内上移 / 下移 */
  const moveMutation = useMutation({
    mutationFn: async ({ b, dir }: { b: Banner; dir: -1 | 1 }) => {
      const siblings = (list ?? []).filter((x) => x.position === b.position).sort((a, c) => a.order - c.order)
      const idx = siblings.findIndex((x) => x.id === b.id)
      const swap = siblings[idx + dir]
      if (!swap) return
      await bannerApi.update(b.id, { order: swap.order })
      await bannerApi.update(swap.id, { order: b.order })
    },
    onSuccess: () => invalidate(),
  })

  const openCreate = () => {
    setEditing(null)
    setForm({ title: '', image: '', link: '', position: BANNER_POSITIONS[0] })
    setDialogOpen(true)
  }
  const openEdit = (b: Banner) => {
    setEditing(b)
    setForm({ title: b.title, image: b.image, link: b.link, position: b.position })
    setDialogOpen(true)
  }

  // 按位置分组展示
  const groups = BANNER_POSITIONS.map((pos) => ({
    pos,
    items: (list ?? []).filter((b) => b.position === pos).sort((a, b) => a.order - b.order),
  })).filter((g) => g.items.length > 0)

  return (
    <div>
      <PageHeader
        title="轮播图管理"
        description="管理官网各位置的 Banner，支持排序与上下线"
        extra={canCreate('banners') && <Button onClick={openCreate}><Plus className="mr-1 h-4 w-4" />新增 Banner</Button>}
      />

      <div className="space-y-8">
        {groups.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">暂无 Banner，点击右上角新增</p>}
        {groups.map((g) => (
          <section key={g.pos}>
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">{g.pos}（{g.items.length}）</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {g.items.map((b, idx) => (
                <Card key={b.id} className={b.enabled ? '' : 'opacity-60'}>
                  <div className="relative">
                    <img src={b.image} alt={b.title} className="h-36 w-full rounded-t-xl object-cover" />
                    <Badge className="absolute left-2 top-2" variant={b.enabled ? 'default' : 'secondary'}>
                      {b.enabled ? '已上线' : '已下线'}
                    </Badge>
                  </div>
                  <CardContent className="space-y-2 p-4">
                    <p className="font-medium">{b.title}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">跳转：{b.link || '无'}</p>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={b.enabled}
                          disabled={!canEdit('banners')}
                          onCheckedChange={() => toggleMutation.mutate(b.id)}
                        />
                        <span className="text-xs text-muted-foreground">{b.enabled ? '上线中' : '已下线'}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {canEdit('banners') && (
                          <>
                            <Button variant="ghost" size="icon" title="上移" disabled={idx === 0} onClick={() => moveMutation.mutate({ b, dir: -1 })}>
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="下移" disabled={idx === g.items.length - 1} onClick={() => moveMutation.mutate({ b, dir: 1 })}>
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="编辑" onClick={() => openEdit(b)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {canDelete('banners') && (
                          <ConfirmDialog
                            trigger={<Button variant="ghost" size="icon" title="删除"><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                            title="删除 Banner"
                            description={`确定删除「${b.title}」吗？`}
                            onConfirm={() => removeMutation.mutate(b.id)}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? '编辑 Banner' : '新增 Banner'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>标题</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>图片</Label>
              {form.image && <img src={form.image} alt="预览" className="h-28 w-full rounded-md object-cover" />}
              <UploadZone multiple={false} hint="建议尺寸 1200×400" onUploaded={(fs) => fs[0] && setForm((f) => ({ ...f, image: fs[0].url }))} />
              <Input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="或直接粘贴图片 URL" />
            </div>
            <div className="space-y-1.5">
              <Label>跳转链接</Label>
              <Input value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} placeholder="/services" />
            </div>
            <div className="space-y-1.5">
              <Label>展示位置</Label>
              <Select value={form.position} onValueChange={(v) => setForm((f) => ({ ...f, position: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {BANNER_POSITIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button disabled={!form.title.trim() || !form.image || saveMutation.isPending} onClick={() => saveMutation.mutate()}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
