/**
 * 角色管理：自定义角色 + 按模块分配权限（查看/新增/编辑/删除/审核）
 */
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Pencil, Plus, ShieldCheck, Trash2 } from 'lucide-react'
import { roleApi } from '@/services'
import { usePermission } from '@/hooks'
import { ConfirmDialog, PageHeader } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { ACTION_LABELS, MODULE_DEFS } from '@/constants'
import type { PermissionMap, Role } from '@/types'

export default function RolesPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Role | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [permissions, setPermissions] = useState<PermissionMap>({})

  const { data: roles } = useQuery({ queryKey: ['roles'], queryFn: roleApi.list })
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['roles'] })

  const saveMutation = useMutation({
    mutationFn: () =>
      editing
        ? roleApi.update(editing.id, { name: name.trim(), description, permissions })
        : roleApi.create({ name: name.trim(), description, permissions }),
    onSuccess: () => { toast.success('角色已保存'); setDialogOpen(false); invalidate() },
  })
  const removeMutation = useMutation({
    mutationFn: roleApi.remove,
    onSuccess: () => { toast.success('已删除'); invalidate() },
  })

  const openDialog = (role?: Role) => {
    if (role) {
      setEditing(role)
      setName(role.name)
      setDescription(role.description)
      setPermissions(role.id === 1 ? {} : { ...role.permissions })
    } else {
      setEditing(null)
      setName('')
      setDescription('')
      setPermissions({ dashboard: ['view'] })
    }
    setDialogOpen(true)
  }

  const togglePermission = (module: string, action: string, checked: boolean) => {
    setPermissions((p) => {
      const current = new Set(p[module as keyof PermissionMap] ?? [])
      if (checked) current.add(action as never)
      else current.delete(action as never)
      return { ...p, [module]: [...current] }
    })
  }

  /** 统计角色拥有的权限点数量（用于卡片展示） */
  const countPermissions = (r: Role) => (r.id === 1 ? '全部权限' : `${Object.values(r.permissions).flat().length} 个权限点`)

  return (
    <div>
      <PageHeader
        title="角色管理"
        description="自定义角色并按模块分配操作权限"
        extra={canCreate('roles') && <Button onClick={() => openDialog()}><Plus className="mr-1 h-4 w-4" />新建角色</Button>}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roles?.map((r) => (
          <Card key={r.id}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="h-4 w-4 text-primary" />
                {r.name}
                {r.builtin && <Badge variant="secondary">内置</Badge>}
              </CardTitle>
              {!r.builtin && (
                <div className="flex gap-1">
                  {canEdit('roles') && (
                    <Button variant="ghost" size="icon" onClick={() => openDialog(r)}><Pencil className="h-4 w-4" /></Button>
                  )}
                  {canDelete('roles') && (
                    <ConfirmDialog
                      trigger={<Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                      title="删除角色"
                      description={`确定删除角色「${r.name}」吗？`}
                      onConfirm={() => removeMutation.mutate(r.id)}
                    />
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{r.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {r.id === 1 ? (
                  <Badge>全部模块 · 全部操作</Badge>
                ) : (
                  Object.entries(r.permissions).map(([m, actions]) => {
                    const def = MODULE_DEFS.find((d) => d.key === m)
                    return (
                      <Badge key={m} variant="outline">
                        {def?.label ?? m}：{(actions ?? []).map((a) => ACTION_LABELS[a]).join('/')}
                      </Badge>
                    )
                  })
                )}
              </div>
              <p className="text-xs text-muted-foreground">{countPermissions(r)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 权限矩阵编辑对话框 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader><DialogTitle>{editing ? `编辑角色：${editing.name}` : '新建角色'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>角色名称</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="如：运营专员" />
              </div>
              <div className="space-y-1.5">
                <Label>描述</Label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>

            {/* 权限矩阵 */}
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2.5 text-left font-medium">模块</th>
                    {MODULE_DEFS.length > 0 && ['view', 'create', 'edit', 'delete', 'audit'].map((a) => (
                      <th key={a} className="px-3 py-2.5 text-center font-medium">{ACTION_LABELS[a as keyof typeof ACTION_LABELS]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MODULE_DEFS.map((mod) => (
                    <tr key={mod.key} className="border-b last:border-0">
                      <td className="px-4 py-2.5 font-medium">{mod.label}</td>
                      {(['view', 'create', 'edit', 'delete', 'audit'] as const).map((action) => {
                        const supported = mod.actions.includes(action)
                        const checked = permissions[mod.key]?.includes(action) ?? false
                        return (
                          <td key={action} className="px-3 py-2.5 text-center">
                            {supported ? (
                              <Checkbox
                                checked={checked}
                                onCheckedChange={(v) => togglePermission(mod.key, action, v === true)}
                              />
                            ) : (
                              <span className="text-muted-foreground/30">—</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button disabled={!name.trim() || saveMutation.isPending} onClick={() => saveMutation.mutate()}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
