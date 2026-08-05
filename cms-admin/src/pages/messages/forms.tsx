/**
 * 自定义表单：字段配置（询价单、报名表等），可增删改字段
 */
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { GripVertical, Pencil, Plus, Trash2 } from 'lucide-react'
import { formApi } from '@/services'
import { usePermission } from '@/hooks'
import { ConfirmDialog, PageHeader } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import type { CustomForm, FormField } from '@/types'

const FIELD_TYPES: { value: FormField['type']; label: string }[] = [
  { value: 'text', label: '单行文本' },
  { value: 'phone', label: '手机号' },
  { value: 'textarea', label: '多行文本' },
  { value: 'select', label: '下拉选择' },
  { value: 'date', label: '日期' },
]

const emptyField = (): FormField => ({ key: `field_${Date.now()}`, label: '', type: 'text', required: false })

export default function FormsPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<CustomForm | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [fields, setFields] = useState<FormField[]>([])

  const { data: forms } = useQuery({ queryKey: ['forms'], queryFn: formApi.list })
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['forms'] })

  const saveMutation = useMutation({
    mutationFn: () =>
      editing
        ? formApi.update(editing.id, { name: name.trim(), description, fields })
        : formApi.create({ name: name.trim(), description, fields }),
    onSuccess: () => { toast.success('表单已保存'); setDialogOpen(false); invalidate() },
  })
  const removeMutation = useMutation({
    mutationFn: formApi.remove,
    onSuccess: () => { toast.success('已删除'); invalidate() },
  })

  const openCreate = () => {
    setEditing(null)
    setName('')
    setDescription('')
    setFields([
      { key: 'name', label: '姓名', type: 'text', required: true },
      { key: 'phone', label: '联系电话', type: 'phone', required: true },
    ])
    setDialogOpen(true)
  }
  const openEdit = (f: CustomForm) => {
    setEditing(f)
    setName(f.name)
    setDescription(f.description)
    setFields(f.fields.map((x) => ({ ...x })))
    setDialogOpen(true)
  }

  const updateField = (idx: number, patch: Partial<FormField>) => {
    setFields((fs) => fs.map((f, i) => (i === idx ? { ...f, ...patch } : f)))
  }
  const moveField = (idx: number, dir: -1 | 1) => {
    setFields((fs) => {
      const next = [...fs]
      const target = idx + dir
      if (target < 0 || target >= next.length) return fs
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next
    })
  }

  return (
    <div>
      <PageHeader
        title="自定义表单"
        description="配置询价单、报名表等前台表单的字段"
        extra={canCreate('forms') && <Button onClick={openCreate}><Plus className="mr-1 h-4 w-4" />新建表单</Button>}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {forms?.map((f) => (
          <Card key={f.id}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">{f.name}</CardTitle>
              <div className="flex gap-1">
                {canEdit('forms') && (
                  <Button variant="ghost" size="icon" onClick={() => openEdit(f)}><Pencil className="h-4 w-4" /></Button>
                )}
                {canDelete('forms') && (
                  <ConfirmDialog
                    trigger={<Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                    title="删除表单"
                    description={`确定删除表单「${f.name}」吗？`}
                    onConfirm={() => removeMutation.mutate(f.id)}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">{f.description || '暂无描述'}</p>
              <div className="flex flex-wrap gap-1.5">
                {f.fields.map((field) => (
                  <Badge key={field.key} variant="secondary">
                    {field.label}{field.required && <span className="ml-0.5 text-destructive">*</span>}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 表单字段编辑器 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader><DialogTitle>{editing ? '编辑表单' : '新建表单'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>表单名称</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="如：询价单" />
              </div>
              <div className="space-y-1.5">
                <Label>描述</Label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="用途说明" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>字段列表</Label>
              {fields.map((field, idx) => (
                <div key={field.key} className="flex items-center gap-2 rounded-md border p-2">
                  <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                  <Input
                    className="w-32" value={field.label} placeholder="字段名"
                    onChange={(e) => updateField(idx, { label: e.target.value })}
                  />
                  <Select
                    value={field.type}
                    onValueChange={(v) => updateField(idx, { type: v as FormField['type'] })}
                  >
                    <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {FIELD_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {field.type === 'select' && (
                    <Input
                      className="flex-1" placeholder="选项，用逗号分隔"
                      value={(field.options ?? []).join(',')}
                      onChange={(e) => updateField(idx, { options: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                    />
                  )}
                  <label className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <Switch checked={field.required} onCheckedChange={(v) => updateField(idx, { required: v })} />
                    必填
                  </label>
                  <Button variant="ghost" size="icon" title="上移" onClick={() => moveField(idx, -1)}>↑</Button>
                  <Button variant="ghost" size="icon" title="下移" onClick={() => moveField(idx, 1)}>↓</Button>
                  <Button variant="ghost" size="icon" title="删除字段" onClick={() => setFields((fs) => fs.filter((_, i) => i !== idx))}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setFields((fs) => [...fs, emptyField()])}>
                <Plus className="mr-1 h-4 w-4" />添加字段
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button
              disabled={!name.trim() || fields.length === 0 || fields.some((f) => !f.label.trim()) || saveMutation.isPending}
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
