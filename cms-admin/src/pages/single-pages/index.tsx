/**
 * 单页管理：关于我们 / 联系我们 等独立页面的内容编辑
 */
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Save } from 'lucide-react'
import { pageApi } from '@/services'
import { usePermission } from '@/hooks'
import { PageHeader } from '@/components/common'
import { RichTextEditor } from '@/components/rich-text-editor'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/utils'
import { cn } from '@/lib/utils'

export default function SinglePagesPage() {
  const queryClient = useQueryClient()
  const { canEdit } = usePermission()
  const { data: pages, isLoading } = useQuery({ queryKey: ['single-pages'], queryFn: pageApi.list })
  const [activeId, setActiveId] = useState<number | null>(null)
  const [content, setContent] = useState('')

  const active = pages?.find((p) => p.id === activeId) ?? pages?.[0]

  useEffect(() => {
    if (active) {
      setActiveId(active.id)
      setContent(active.content)
    }
    // 仅在切换页面时回填
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.id])

  const saveMutation = useMutation({
    mutationFn: () => pageApi.update(active!.id, { content }),
    onSuccess: () => {
      toast.success(`「${active!.name}」已保存`)
      queryClient.invalidateQueries({ queryKey: ['single-pages'] })
    },
  })

  if (isLoading) return <Skeleton className="h-96 w-full" />

  return (
    <div>
      <PageHeader
        title="单页管理"
        description="维护官网独立页面的内容"
        extra={canEdit('pages') && active && (
          <Button disabled={saveMutation.isPending} onClick={() => saveMutation.mutate()}>
            <Save className="mr-1 h-4 w-4" />保存「{active.name}」
          </Button>
        )}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* 页面列表 */}
        <Card className="h-fit md:col-span-1">
          <CardContent className="p-2">
            {pages?.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={cn(
                  'flex w-full flex-col rounded-md px-3 py-2.5 text-left transition-colors',
                  p.id === active?.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
                )}
              >
                <span className="text-sm font-medium">{p.name}</span>
                <span className="text-xs text-muted-foreground">/{p.slug} · 更新于 {formatDate(p.updatedAt, false)}</span>
              </button>
            ))}
          </CardContent>
        </Card>
        {/* 编辑器 */}
        <div className="md:col-span-3">
          {active && (
            <RichTextEditor value={content} onChange={setContent} className="bg-card" />
          )}
          {!canEdit('pages') && (
            <p className="mt-3 text-sm text-muted-foreground">当前角色只有查看权限，无法保存修改。</p>
          )}
        </div>
      </div>
    </div>
  )
}
