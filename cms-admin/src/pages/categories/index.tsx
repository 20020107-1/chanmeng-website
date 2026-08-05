/**
 * 栏目管理：树形结构展示 + 拖拽排序（同级）+ 自定义 URL + 关联模板
 */
import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ChevronRight, FolderTree, GripVertical, Pencil, Plus, Trash2 } from 'lucide-react'
import { categoryApi } from '@/services'
import { usePermission } from '@/hooks'
import { ConfirmDialog, PageHeader } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import type { Category } from '@/types'
import { PAGE_TEMPLATES } from '@/constants'

interface TreeNode extends Category { children: TreeNode[] }

/** 把平铺栏目组装成树 */
function buildTree(list: Category[]): TreeNode[] {
  const map = new Map<number, TreeNode>()
  list.forEach((c) => map.set(c.id, { ...c, children: [] }))
  const roots: TreeNode[] = []
  map.forEach((node) => {
    if (node.parentId && map.has(node.parentId)) map.get(node.parentId)!.children.push(node)
    else roots.push(node)
  })
  const sortRec = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => a.order - b.order)
    nodes.forEach((n) => sortRec(n.children))
  }
  sortRec(roots)
  return roots
}

export default function CategoryPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1]))
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', parentId: '0', template: PAGE_TEMPLATES[0] })
  const [dragId, setDragId] = useState<number | null>(null)

  const { data: list } = useQuery({ queryKey: ['categories'], queryFn: categoryApi.list })
  const tree = useMemo(() => buildTree(list ?? []), [list])

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['categories'] })

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim(),
        parentId: form.parentId === '0' ? null : Number(form.parentId),
        template: form.template,
        order: editing?.order ?? (list?.length ?? 0) + 1,
      }
      return editing ? categoryApi.update(editing.id, payload) : categoryApi.create(payload)
    },
    onSuccess: () => {
      toast.success(editing ? '栏目已更新' : '栏目已创建')
      setDialogOpen(false)
      invalidate()
    },
  })

  const removeMutation = useMutation({
    mutationFn: categoryApi.remove,
    onSuccess: () => { toast.success('已删除'); invalidate() },
  })

  const reorderMutation = useMutation({
    mutationFn: categoryApi.reorder,
    onSuccess: () => { toast.success('排序已保存'); invalidate() },
  })

  const openCreate = (parentId?: number) => {
    setEditing(null)
    setForm({ name: '', slug: '', parentId: parentId ? String(parentId) : '0', template: PAGE_TEMPLATES[0] })
    setDialogOpen(true)
  }

  const openEdit = (c: Category) => {
    setEditing(c)
    setForm({ name: c.name, slug: c.slug, parentId: c.parentId ? String(c.parentId) : '0', template: c.template })
    setDialogOpen(true)
  }

  /** 拖拽落点：同级内交换顺序 */
  const handleDrop = (targetId: number) => {
    if (dragId === null || dragId === targetId || !list) return
    const source = list.find((c) => c.id === dragId)
    const target = list.find((c) => c.id === targetId)
    if (!source || !target || source.parentId !== target.parentId) {
      toast.info('仅支持同一层级内拖动排序')
      return
    }
    // 同级所有栏目按当前顺序，交换 source 到 target 位置
    const siblings = list.filter((c) => c.parentId === source.parentId).sort((a, b) => a.order - b.order)
    const from = siblings.findIndex((c) => c.id === dragId)
    const to = siblings.findIndex((c) => c.id === targetId)
    const [moved] = siblings.splice(from, 1)
    siblings.splice(to, 0, moved)
    reorderMutation.mutate(siblings.map((c, i) => ({ id: c.id, order: i + 1, parentId: c.parentId })))
    setDragId(null)
  }

  const renderNode = (node: TreeNode, depth: number) => {
    const isOpen = expanded.has(node.id)
    return (
      <div key={node.id}>
        <div
          draggable={canEdit('categories')}
          onDragStart={() => setDragId(node.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(node.id)}
          className={`group flex items-center gap-2 rounded-md border bg-card px-3 py-2.5 transition-colors ${dragId === node.id ? 'opacity-50' : ''}`}
          style={{ marginLeft: depth * 28 }}
        >
          {canEdit('categories') && <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground/50" />}
          {node.children.length > 0 ? (
            <button
              onClick={() => setExpanded((s) => {
                const next = new Set(s)
                if (next.has(node.id)) next.delete(node.id); else next.add(node.id)
                return next
              })}
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>
          ) : (
            <span className="w-4" />
          )}
          <FolderTree className="h-4 w-4 text-primary/70" />
          <span className="font-medium">{node.name}</span>
          <span className="text-xs text-muted-foreground">/{node.slug}</span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">{node.template}</span>
          <span className="ml-auto flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {canCreate('categories') && (
              <Button variant="ghost" size="icon" title="添加子栏目" onClick={() => openCreate(node.id)}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
            {canEdit('categories') && (
              <Button variant="ghost" size="icon" title="编辑" onClick={() => openEdit(node)}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {canDelete('categories') && (
              <ConfirmDialog
                trigger={<Button variant="ghost" size="icon" title="删除"><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                title="删除栏目"
                description={`确定删除栏目「${node.name}」吗？需先清空其文章与子栏目。`}
                onConfirm={() => removeMutation.mutate(node.id)}
              />
            )}
          </span>
        </div>
        {isOpen && node.children.map((child) => renderNode(child, depth + 1))}
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="栏目管理"
        description="树形栏目结构，拖动可调整同级排序"
        extra={canCreate('categories') && (
          <Button onClick={() => openCreate()}><Plus className="mr-1 h-4 w-4" />新建栏目</Button>
        )}
      />
      <div className="max-w-3xl space-y-2">{tree.map((n) => renderNode(n, 0))}</div>

      {/* 新建 / 编辑对话框 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? '编辑栏目' : '新建栏目'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>栏目名称</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="如：新闻动态" />
            </div>
            <div className="space-y-1.5">
              <Label>自定义 URL（slug）</Label>
              <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="如：news" />
            </div>
            <div className="space-y-1.5">
              <Label>父栏目</Label>
              <Select value={form.parentId} onValueChange={(v) => setForm((f) => ({ ...f, parentId: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">顶级栏目</SelectItem>
                  {list?.filter((c) => c.id !== editing?.id).map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>关联模板</Label>
              <Select value={form.template} onValueChange={(v) => setForm((f) => ({ ...f, template: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PAGE_TEMPLATES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button
              disabled={!form.name.trim() || saveMutation.isPending}
              onClick={() => saveMutation.mutate()}
            >
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
