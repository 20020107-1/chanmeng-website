/**
 * 管理员列表：账号、角色、状态、最后登录时间；支持新增 / 编辑 / 启停 / 删除
 */
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { KeyRound, Pencil, Plus, Power, Trash2 } from 'lucide-react'
import { roleApi, userApi } from '@/services'
import { usePermission } from '@/hooks'
import { ConfirmDialog, PageHeader } from '@/components/common'
import { DataTable, type Column } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import type { AdminUser } from '@/types'
import { formatDate } from '@/utils'

export default function UsersPage() {
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<AdminUser | null>(null)
  const [form, setForm] = useState({ username: '', password: '', name: '', roleId: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data: users, isLoading } = useQuery({ queryKey: ['users'], queryFn: userApi.list })
  const { data: roles } = useQuery({ queryKey: ['roles'], queryFn: roleApi.list })
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['users'] })

  const roleName = (id: number) => roles?.find((r) => r.id === id)?.name ?? '-'

  const saveMutation = useMutation({
    mutationFn: () => {
      if (!editing) {
        return userApi.create({ username: form.username.trim(), password: form.password, name: form.name.trim(), roleId: Number(form.roleId) })
      }
      return userApi.update(editing.id, {
        name: form.name.trim(),
        roleId: Number(form.roleId),
        password: form.password || undefined, // 留空表示不修改密码
      })
    },
    onSuccess: () => { toast.success('已保存'); setDialogOpen(false); invalidate() },
  })
  const toggleMutation = useMutation({
    mutationFn: userApi.toggleStatus,
    onSuccess: (u) => { toast.success(u.status === 'active' ? '已启用' : '已禁用'); invalidate() },
  })
  const removeMutation = useMutation({
    mutationFn: userApi.remove,
    onSuccess: () => { toast.success('已删除'); invalidate() },
  })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!editing && !form.username.trim()) e.username = '请输入账号'
    if (!editing && form.password.length < 8) e.password = '密码至少 8 位'
    if (editing && form.password && form.password.length < 8) e.password = '密码至少 8 位'
    if (!form.name.trim()) e.name = '请输入姓名'
    if (!form.roleId) e.roleId = '请选择角色'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const columns: Column<AdminUser>[] = [
    { key: 'username', title: '账号', sortValue: (r) => r.username },
    { key: 'name', title: '姓名' },
    { key: 'roleId', title: '角色', render: (r) => <Badge variant="secondary">{roleName(r.roleId)}</Badge> },
    {
      key: 'status', title: '状态',
      render: (r) => r.status === 'active' ? <Badge>正常</Badge> : <Badge variant="destructive">已禁用</Badge>,
    },
    { key: 'lastLoginAt', title: '最后登录', sortValue: (r) => r.lastLoginAt ?? '', render: (r) => formatDate(r.lastLoginAt) },
    {
      key: 'actions', title: '操作', width: 200,
      render: (r) => (
        <div className="flex gap-0.5">
          {canEdit('users') && (
            <>
              <Button
                variant="ghost" size="icon" title="编辑"
                onClick={() => {
                  setEditing(r)
                  setForm({ username: r.username, password: '', name: r.name, roleId: String(r.roleId) })
                  setErrors({})
                  setDialogOpen(true)
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title={r.status === 'active' ? '禁用' : '启用'} onClick={() => toggleMutation.mutate(r.id)}>
                <Power className={`h-4 w-4 ${r.status === 'active' ? 'text-emerald-600' : 'text-muted-foreground'}`} />
              </Button>
            </>
          )}
          {canDelete('users') && r.id !== 1 && (
            <ConfirmDialog
              trigger={<Button variant="ghost" size="icon" title="删除"><Trash2 className="h-4 w-4 text-destructive" /></Button>}
              title="删除管理员"
              description={`确定删除管理员「${r.name}」（@${r.username}）吗？`}
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
        title="管理员"
        description="管理后台账号与角色分配"
        extra={canCreate('users') && (
          <Button onClick={() => { setEditing(null); setForm({ username: '', password: '', name: '', roleId: '' }); setErrors({}); setDialogOpen(true) }}>
            <Plus className="mr-1 h-4 w-4" />新增管理员
          </Button>
        )}
      />
      <DataTable columns={columns} data={users ?? []} loading={isLoading} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? '编辑管理员' : '新增管理员'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            {!editing && (
              <div className="space-y-1.5">
                <Label>登录账号</Label>
                <Input value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} />
                {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
              </div>
            )}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1"><KeyRound className="h-3.5 w-3.5" />{editing ? '重置密码（留空不修改）' : '初始密码'}</Label>
              <Input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} placeholder="至少 8 位" />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>姓名</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>角色</Label>
              <Select value={form.roleId} onValueChange={(v) => setForm((f) => ({ ...f, roleId: v }))}>
                <SelectTrigger><SelectValue placeholder="选择角色" /></SelectTrigger>
                <SelectContent>
                  {roles?.map((r) => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.roleId && <p className="text-xs text-destructive">{errors.roleId}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button disabled={saveMutation.isPending} onClick={() => validate() && saveMutation.mutate()}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
