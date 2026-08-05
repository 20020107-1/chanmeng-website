/**
 * 文章管理：列表 + 搜索 + 状态/栏目筛选 + 分页 + 批量删除 + 置顶
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Pin, PinOff, Plus, Search, Trash2 } from 'lucide-react'
import { articleApi, categoryApi } from '@/services'
import { useDebounce, usePermission } from '@/hooks'
import { ArticleStatusBadge, ConfirmDialog, PageHeader } from '@/components/common'
import { DataTable, Pager, type Column } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import type { Article } from '@/types'
import { formatDate } from '@/utils'

export default function ArticleListPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { canCreate, canEdit, canDelete } = usePermission()

  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState('all')
  const [categoryId, setCategoryId] = useState('all')
  const [selected, setSelected] = useState<number[]>([])
  const debouncedKeyword = useDebounce(keyword)

  const { data, isLoading } = useQuery({
    queryKey: ['articles', page, debouncedKeyword, status, categoryId],
    queryFn: () =>
      articleApi.list({
        page,
        pageSize: 10,
        keyword: debouncedKeyword || undefined,
        status: status === 'all' ? undefined : status,
        categoryId: categoryId === 'all' ? undefined : categoryId,
      }),
  })
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: categoryApi.list })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['articles'] })

  const removeMutation = useMutation({
    mutationFn: articleApi.remove,
    onSuccess: () => { toast.success('已删除'); invalidate() },
  })
  const batchRemoveMutation = useMutation({
    mutationFn: articleApi.batchRemove,
    onSuccess: () => { toast.success('批量删除成功'); setSelected([]); invalidate() },
  })
  const topMutation = useMutation({
    mutationFn: articleApi.toggleTop,
    onSuccess: (a) => { toast.success(a.isTop ? '已置顶' : '已取消置顶'); invalidate() },
  })

  const categoryName = (id: number | null) => categories?.find((c) => c.id === id)?.name ?? '未分类'

  const columns: Column<Article>[] = [
    {
      key: 'title', title: '标题', width: 300, sortValue: (r) => r.title,
      render: (r) => (
        <div className="flex items-center gap-2">
          {r.isTop && <Pin className="h-3.5 w-3.5 shrink-0 text-orange-500" />}
          <button
            className="line-clamp-1 text-left font-medium hover:text-primary hover:underline"
            onClick={() => navigate(`/articles/${r.id}/edit`)}
          >
            {r.title}
          </button>
        </div>
      ),
    },
    { key: 'categoryId', title: '栏目', render: (r) => categoryName(r.categoryId) },
    { key: 'status', title: '状态', render: (r) => <ArticleStatusBadge status={r.status} /> },
    { key: 'views', title: '浏览量', sortValue: (r) => r.views, render: (r) => r.views.toLocaleString() },
    { key: 'author', title: '作者' },
    { key: 'updatedAt', title: '更新时间', sortValue: (r) => r.updatedAt, render: (r) => formatDate(r.updatedAt) },
    {
      key: 'actions', title: '操作', width: 190,
      render: (r) => (
        <div className="flex gap-1">
          {canEdit('articles') && (
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/articles/${r.id}/edit`}>编辑</Link>
            </Button>
          )}
          {canEdit('articles') && (
            <Button variant="ghost" size="icon" title={r.isTop ? '取消置顶' : '置顶'} onClick={() => topMutation.mutate(r.id)}>
              {r.isTop ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
            </Button>
          )}
          {canDelete('articles') && (
            <ConfirmDialog
              trigger={<Button variant="ghost" size="icon" title="删除"><Trash2 className="h-4 w-4 text-destructive" /></Button>}
              title="删除文章"
              description={`确定删除《${r.title}》吗？此操作不可恢复。`}
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
        title="文章管理"
        description="发布与维护官网新闻、案例等内容"
        extra={canCreate('articles') && (
          <Button asChild><Link to="/articles/new"><Plus className="mr-1 h-4 w-4" />发布文章</Link></Button>
        )}
      />

      {/* 筛选栏 */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="w-64 pl-8" placeholder="搜索标题…" value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setPage(1) }}
          />
        </div>
        <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1) }}>
          <SelectTrigger className="w-32"><SelectValue placeholder="状态" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="draft">草稿</SelectItem>
            <SelectItem value="published">已发布</SelectItem>
            <SelectItem value="scheduled">定时发布</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryId} onValueChange={(v) => { setCategoryId(v); setPage(1) }}>
          <SelectTrigger className="w-36"><SelectValue placeholder="栏目" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部栏目</SelectItem>
            {categories?.map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        {selected.length > 0 && canDelete('articles') && (
          <ConfirmDialog
            trigger={<Button variant="destructive" size="sm"><Trash2 className="mr-1 h-4 w-4" />删除所选（{selected.length}）</Button>}
            title="批量删除"
            description={`确定删除选中的 ${selected.length} 篇文章吗？此操作不可恢复。`}
            onConfirm={() => batchRemoveMutation.mutate(selected)}
          />
        )}
      </div>

      <DataTable
        columns={columns}
        data={data?.list ?? []}
        loading={isLoading}
        selectable={canDelete('articles')}
        selectedIds={selected}
        onSelectionChange={setSelected}
        emptyText="暂无文章，点击右上角发布第一篇"
      />
      <Pager page={page} pageSize={10} total={data?.total ?? 0} onChange={setPage} />
    </div>
  )
}
