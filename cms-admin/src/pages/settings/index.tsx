/**
 * 系统设置：网站基础信息 / SEO / 安全 / 数据备份（Tab 分区）
 */
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { DatabaseBackup, Save } from 'lucide-react'
import { backupApi, settingApi } from '@/services'
import { usePermission } from '@/hooks'
import { ConfirmDialog, PageHeader } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { resetDb } from '@/mock/db'
import { downloadFile, formatDate } from '@/utils'
import type { SystemSettings } from '@/types'

export default function SettingsPage() {
  const queryClient = useQueryClient()
  const { canEdit } = usePermission()
  const editable = canEdit('settings')
  const [form, setForm] = useState<SystemSettings | null>(null)

  const { data, isLoading } = useQuery({ queryKey: ['settings'], queryFn: settingApi.get })

  useEffect(() => {
    if (data) setForm(JSON.parse(JSON.stringify(data)) as SystemSettings)
  }, [data])

  const saveMutation = useMutation({
    mutationFn: () => settingApi.save(form!),
    onSuccess: () => {
      toast.success('设置已保存')
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })

  /** 一键导出全站数据（JSON 备份） */
  const backupMutation = useMutation({
    mutationFn: backupApi.exportAll,
    onSuccess: (db) => {
      downloadFile(
        `chanmeng-cms-backup-${formatDate(new Date().toISOString(), false)}.json`,
        JSON.stringify(db, null, 2),
        'application/json',
      )
      toast.success('备份文件已下载')
    },
  })

  if (isLoading || !form) return <Skeleton className="h-96 w-full" />

  const patchSite = (patch: Partial<SystemSettings['site']>) =>
    setForm((f) => f && { ...f, site: { ...f.site, ...patch } })
  const patchSeo = (patch: Partial<SystemSettings['seo']>) =>
    setForm((f) => f && { ...f, seo: { ...f.seo, ...patch } })
  const patchSecurity = (patch: Partial<SystemSettings['security']>) =>
    setForm((f) => f && { ...f, security: { ...f.security, ...patch } })

  const SaveBar = () =>
    editable ? (
      <div className="mt-6 flex justify-end">
        <Button disabled={saveMutation.isPending} onClick={() => saveMutation.mutate()}>
          <Save className="mr-1 h-4 w-4" />保存设置
        </Button>
      </div>
    ) : null

  return (
    <div>
      <PageHeader title="系统设置" description="站点信息、SEO、安全与数据备份" />

      <Tabs defaultValue="site">
        <TabsList>
          <TabsTrigger value="site">基础信息</TabsTrigger>
          <TabsTrigger value="seo">SEO 设置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="backup">数据备份</TabsTrigger>
        </TabsList>

        {/* 基础信息 */}
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">网站基础信息</CardTitle>
              <CardDescription>展示在官网页脚与联系区域的信息</CardDescription>
            </CardHeader>
            <CardContent className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>站点名称</Label>
                <Input value={form.site.siteName} disabled={!editable} onChange={(e) => patchSite({ siteName: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Logo 地址</Label>
                <Input value={form.site.logo} disabled={!editable} onChange={(e) => patchSite({ logo: e.target.value })} placeholder="https://…/logo.png" />
              </div>
              <div className="space-y-1.5">
                <Label>ICP 备案号</Label>
                <Input value={form.site.icp} disabled={!editable} onChange={(e) => patchSite({ icp: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>版权信息</Label>
                <Input value={form.site.copyright} disabled={!editable} onChange={(e) => patchSite({ copyright: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>客服电话</Label>
                <Input value={form.site.contactPhone} disabled={!editable} onChange={(e) => patchSite({ contactPhone: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>客服邮箱</Label>
                <Input value={form.site.contactEmail} disabled={!editable} onChange={(e) => patchSite({ contactEmail: e.target.value })} />
              </div>
            </CardContent>
          </Card>
          <SaveBar />
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">全站 SEO 设置</CardTitle>
              <CardDescription>作用于所有页面的默认 SEO 信息</CardDescription>
            </CardHeader>
            <CardContent className="max-w-2xl space-y-4">
              <div className="space-y-1.5">
                <Label>标题后缀</Label>
                <Input value={form.seo.titleSuffix} disabled={!editable} onChange={(e) => patchSeo({ titleSuffix: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>全站关键词</Label>
                <Input value={form.seo.keywords} disabled={!editable} onChange={(e) => patchSeo({ keywords: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>全站描述</Label>
                <Textarea value={form.seo.description} disabled={!editable} onChange={(e) => patchSeo({ description: e.target.value })} rows={3} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>开启 Sitemap</Label>
                  <p className="text-xs text-muted-foreground">自动生成 sitemap.xml 提交搜索引擎</p>
                </div>
                <Switch checked={form.seo.sitemapEnabled} disabled={!editable} onCheckedChange={(v) => patchSeo({ sitemapEnabled: v })} />
              </div>
            </CardContent>
          </Card>
          <SaveBar />
        </TabsContent>

        {/* 安全 */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">安全设置</CardTitle>
              <CardDescription>登录保护与密码策略</CardDescription>
            </CardHeader>
            <CardContent className="max-w-2xl space-y-5">
              <div className="space-y-1.5">
                <Label>登录失败锁定次数</Label>
                <Input
                  type="number" min={1} max={10} value={form.security.maxLoginFails} disabled={!editable}
                  onChange={(e) => patchSecurity({ maxLoginFails: Number(e.target.value) || 5 })}
                />
                <p className="text-xs text-muted-foreground">连续失败超过该次数后锁定账号 10 分钟</p>
              </div>
              <div className="space-y-1.5">
                <Label>密码最小长度</Label>
                <Input
                  type="number" min={6} max={32} value={form.security.passwordMinLength} disabled={!editable}
                  onChange={(e) => patchSecurity({ passwordMinLength: Number(e.target.value) || 8 })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>密码必须包含大小写字母与数字</Label>
                  <p className="text-xs text-muted-foreground">提高密码强度要求</p>
                </div>
                <Switch checked={form.security.passwordRequireMixed} disabled={!editable} onCheckedChange={(v) => patchSecurity({ passwordRequireMixed: v })} />
              </div>
            </CardContent>
          </Card>
          <SaveBar />
        </TabsContent>

        {/* 备份 */}
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">数据备份</CardTitle>
              <CardDescription>导出全站内容数据（JSON 格式），或恢复出厂演示数据</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button disabled={backupMutation.isPending} onClick={() => backupMutation.mutate()}>
                <DatabaseBackup className="mr-1 h-4 w-4" />
                {backupMutation.isPending ? '导出中…' : '一键导出全部数据'}
              </Button>
              {editable && (
                <ConfirmDialog
                  trigger={<Button variant="destructive">恢复出厂数据</Button>}
                  title="恢复出厂数据"
                  description="将清空当前所有修改并恢复为初始演示数据，确定继续吗？"
                  onConfirm={() => {
                    resetDb()
                    toast.success('已恢复出厂数据')
                    queryClient.invalidateQueries()
                  }}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
