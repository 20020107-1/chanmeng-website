/**
 * 文章新增 / 编辑：基础信息 + 富文本正文 + 发布设置（状态/置顶/定时）+ SEO（TDK）
 */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ArrowLeft, Save, Send } from 'lucide-react'
import { articleApi, categoryApi } from '@/services'
import { PageHeader } from '@/components/common'
import { RichTextEditor } from '@/components/rich-text-editor'
import { UploadZone } from '@/components/upload-zone'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import type { Article, ArticleStatus } from '@/types'

/** 表单即时校验 */
interface FormState {
  title: string
  categoryId: string
  summary: string
  content: string
  cover: string
  status: ArticleStatus
  isTop: boolean
  publishAt: string
  seoTitle: string
  seoKeywords: string
  seoDescription: string
}

const initialForm: FormState = {
  title: '', categoryId: '', summary: '', content: '', cover: '',
  status: 'draft', isTop: false, publishAt: '',
  seoTitle: '', seoKeywords: '', seoDescription: '',
}

export default function ArticleEditPage() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: categoryApi.list })
  const { data: detail, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => articleApi.detail(Number(id)),
    enabled: !isNew,
  })

  // 编辑模式：回填数据
  useEffect(() => {
    if (detail) {
      setForm({
        title: detail.title,
        categoryId: detail.categoryId ? String(detail.categoryId) : '',
        summary: detail.summary,
        content: detail.content,
        cover: detail.cover,
        status: detail.status,
        isTop: detail.isTop,
        publishAt: detail.publishAt ? detail.publishAt.slice(0, 16) : '',
        seoTitle: detail.seoTitle,
        seoKeywords: detail.seoKeywords,
        seoDescription: detail.seoDescription,
      })
    }
  }, [detail])

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.title.trim()) e.title = '请输入标题'
    if (form.title.length > 80) e.title = '标题不能超过 80 字'
    if (!form.categoryId) e.categoryId = '请选择栏目'
    if (!form.content.trim() || form.content === '<br>') e.content = '正文不能为空'
    if (form.status === 'scheduled' && !form.publishAt) e.publishAt = '定时发布需要选择发布时间'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const saveMutation = useMutation({
    mutationFn: (payload: Partial<Article>) =>
      isNew ? articleApi.create(payload) : articleApi.update(Number(id), payload),
    onSuccess: (a) => {
      toast.success(a.status === 'draft' ? '草稿已保存' : '发布成功')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      navigate('/articles')
    },
  })

  const submit = (targetStatus?: ArticleStatus) => {
    const status = targetStatus ?? form.status
    const payload: Partial<Article> = {
      title: form.title.trim(),
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      summary: form.summary,
      content: form.content,
      cover: form.cover,
      status,
      isTop: form.isTop,
      publishAt: status === 'scheduled' && form.publishAt ? new Date(form.publishAt).toISOString() : status === 'published' ? new Date().toISOString() : null,
      seoTitle: form.seoTitle,
      seoKeywords: form.seoKeywords,
      seoDescription: form.seoDescription,
    }
    if (!validate()) {
      toast.error('请先完善表单中标红的内容')
      return
    }
    saveMutation.mutate(payload)
  }

  if (!isNew && isLoading) {
    return <div className="space-y-4"><Skeleton className="h-10 w-1/3" /><Skeleton className="h-96 w-full" /></div>
  }

  return (
    <div>
      <PageHeader
        title={isNew ? '发布文章' : '编辑文章'}
        extra={
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-1 h-4 w-4" />返回
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* 左侧：正文 */}
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="space-y-1.5">
                <Label>标题 <span className="text-destructive">*</span></Label>
                <Input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="请输入文章标题" />
                {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>摘要</Label>
                <Textarea
                  value={form.summary} onChange={(e) => set('summary', e.target.value)}
                  placeholder="一句话概括文章内容，用于列表展示与分享" rows={2}
                />
              </div>
              <div className="space-y-1.5">
                <Label>正文 <span className="text-destructive">*</span></Label>
                <RichTextEditor value={form.content} onChange={(v) => set('content', v)} />
                {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
              </div>
            </CardContent>
          </Card>

          {/* SEO 设置 */}
          <Card>
            <CardHeader><CardTitle className="text-base">SEO 设置（TDK）</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>SEO 标题（Title）</Label>
                <Input value={form.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} placeholder="留空则使用文章标题" />
              </div>
              <div className="space-y-1.5">
                <Label>关键词（Keywords）</Label>
                <Input value={form.seoKeywords} onChange={(e) => set('seoKeywords', e.target.value)} placeholder="多个关键词用英文逗号分隔" />
              </div>
              <div className="space-y-1.5">
                <Label>描述（Description）</Label>
                <Textarea value={form.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} rows={2} placeholder="搜索引擎结果中展示的摘要，建议 80 字以内" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：发布设置 */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">发布设置</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>所属栏目 <span className="text-destructive">*</span></Label>
                <Select value={form.categoryId} onValueChange={(v) => set('categoryId', v)}>
                  <SelectTrigger><SelectValue placeholder="选择栏目" /></SelectTrigger>
                  <SelectContent>
                    {categories?.map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.categoryId && <p className="text-xs text-destructive">{errors.categoryId}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>发布状态</Label>
                <Select value={form.status} onValueChange={(v) => set('status', v as ArticleStatus)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">草稿</SelectItem>
                    <SelectItem value="published">立即发布</SelectItem>
                    <SelectItem value="scheduled">定时发布</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {form.status === 'scheduled' && (
                <div className="space-y-1.5">
                  <Label>发布时间</Label>
                  <Input
                    type="datetime-local" value={form.publishAt}
                    onChange={(e) => set('publishAt', e.target.value)}
                  />
                  {errors.publishAt && <p className="text-xs text-destructive">{errors.publishAt}</p>}
                </div>
              )}
              <div className="flex items-center justify-between">
                <Label htmlFor="isTop">置顶显示</Label>
                <Switch id="isTop" checked={form.isTop} onCheckedChange={(v) => set('isTop', v)} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" disabled={saveMutation.isPending} onClick={() => submit('draft')}>
                  <Save className="mr-1 h-4 w-4" />存草稿
                </Button>
                <Button className="flex-1" disabled={saveMutation.isPending} onClick={() => submit(form.status === 'draft' ? 'published' : undefined)}>
                  <Send className="mr-1 h-4 w-4" />{form.status === 'scheduled' ? '定时发布' : '发布'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 封面图 */}
          <Card>
            <CardHeader><CardTitle className="text-base">封面图</CardTitle></CardHeader>
            <CardContent>
              {form.cover && (
                <div className="relative mb-3">
                  <img src={form.cover} alt="封面" className="h-36 w-full rounded-md object-cover" />
                  <Button
                    variant="destructive" size="sm" className="absolute right-2 top-2"
                    onClick={() => set('cover', '')}
                  >
                    移除
                  </Button>
                </div>
              )}
              <UploadZone
                multiple={false}
                hint="上传一张封面图"
                onUploaded={(files) => files[0] && set('cover', files[0].url)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
