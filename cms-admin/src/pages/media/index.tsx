/**
 * 媒体库：文件夹分类 + 拖拽上传 + 预览 / 复制 URL / 删除
 */
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Copy, FileIcon, FolderPlus, Folder, Search, Trash2 } from 'lucide-react'
import { mediaApi } from '@/services'
import { useDebounce, usePermission } from '@/hooks'
import { ConfirmDialog, PageHeader } from '@/components/common'
import { UploadZone } from '@/components/upload-zone'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { copyText, formatDate, formatSize } from '@/utils'
import { cn } from '@/lib/utils'

export default function MediaPage() {
  const queryClient = useQueryClient()
  const { canCreate, canDelete } = usePermission()
  /** 当前文件夹：undefined=全部，null=未分类，number=具体文件夹 */
  const [folderId, setFolderId] = useState<number | null | undefined>(undefined)
  const [keyword, setKeyword] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [folderDialog, setFolderDialog] = useState(false)
  const [folderName, setFolderName] = useState('')
  const debouncedKeyword = useDebounce(keyword)

  const { data: folders } = useQuery({ queryKey: ['media-folders'], queryFn: mediaApi.folders })
  const { data: files, isLoading } = useQuery({
    queryKey: ['media-files', folderId, debouncedKeyword],
    queryFn: () =>
      mediaApi.files({
        folderId: folderId === undefined ? undefined : folderId === null ? 'null' : String(folderId),
        keyword: debouncedKeyword || undefined,
      }),
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['media-files'] })

  const uploadMutation = useMutation({
    mutationFn: mediaApi.upload,
    onSuccess: (created) => { toast.success(`已上传 ${created.length} 个文件`); invalidate() },
  })
  const removeMutation = useMutation({
    mutationFn: mediaApi.removeFile,
    onSuccess: () => { toast.success('已删除'); invalidate() },
  })
  const createFolderMutation = useMutation({
    mutationFn: mediaApi.createFolder,
    onSuccess: () => {
      toast.success('文件夹已创建')
      setFolderDialog(false)
      setFolderName('')
      queryClient.invalidateQueries({ queryKey: ['media-folders'] })
    },
  })

  const sidebarItems: { label: string; value: number | null | undefined }[] = [
    { label: '全部文件', value: undefined },
    { label: '未分类', value: null },
    ...(folders ?? []).map((f) => ({ label: f.name, value: f.id as number })),
  ]

  return (
    <div>
      <PageHeader title="媒体库" description="图片与文件的统一管理" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        {/* 文件夹侧栏 */}
        <div className="md:col-span-1">
          <div className="space-y-1 rounded-lg border bg-card p-2">
            {sidebarItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setFolderId(item.value)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                  folderId === item.value ? 'bg-primary/10 font-medium text-primary' : 'hover:bg-muted',
                )}
              >
                <Folder className="h-4 w-4" />
                {item.label}
              </button>
            ))}
            {canCreate('media') && (
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setFolderDialog(true)}>
                <FolderPlus className="mr-2 h-4 w-4" />新建文件夹
              </Button>
            )}
          </div>
        </div>

        {/* 文件区 */}
        <div className="space-y-4 md:col-span-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="w-56 pl-8" placeholder="搜索文件名…" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            </div>
          </div>

          {canCreate('media') && (
            <UploadZone
              onUploaded={(items) =>
                uploadMutation.mutate(items.map((f) => ({ ...f, folderId: typeof folderId === 'number' ? folderId : null })))
              }
            />
          )}

          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
            </div>
          ) : files?.length === 0 ? (
            <p className="py-14 text-center text-sm text-muted-foreground">该文件夹暂无文件</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {files?.map((f) => (
                <div key={f.id} className="group overflow-hidden rounded-lg border bg-card">
                  <button className="block h-32 w-full bg-muted" onClick={() => f.mime.startsWith('image/') && setPreview(f.url)}>
                    {f.mime.startsWith('image/') ? (
                      <img src={f.url} alt={f.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    ) : (
                      <span className="flex h-full items-center justify-center"><FileIcon className="h-10 w-10 text-muted-foreground" /></span>
                    )}
                  </button>
                  <div className="p-2.5">
                    <p className="line-clamp-1 text-sm font-medium" title={f.name}>{f.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{formatSize(f.size)} · {formatDate(f.createdAt, false)}</p>
                    <div className="mt-2 flex gap-1">
                      <Button
                        variant="outline" size="sm" className="h-7 flex-1 text-xs"
                        onClick={async () => {
                          const okCopy = await copyText(f.url)
                          if (okCopy) toast.success('URL 已复制')
                          else toast.error('复制失败')
                        }}
                      >
                        <Copy className="mr-1 h-3 w-3" />复制 URL
                      </Button>
                      {canDelete('media') && (
                        <ConfirmDialog
                          trigger={<Button variant="outline" size="sm" className="h-7 px-2"><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>}
                          title="删除文件"
                          description={`确定删除「${f.name}」吗？`}
                          onConfirm={() => removeMutation.mutate(f.id)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 图片预览 */}
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader><DialogTitle>图片预览</DialogTitle></DialogHeader>
          {preview && <img src={preview} alt="预览" className="max-h-[70vh] w-full rounded-md object-contain" />}
        </DialogContent>
      </Dialog>

      {/* 新建文件夹 */}
      <Dialog open={folderDialog} onOpenChange={setFolderDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>新建文件夹</DialogTitle></DialogHeader>
          <Input value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="文件夹名称" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setFolderDialog(false)}>取消</Button>
            <Button disabled={!folderName.trim() || createFolderMutation.isPending} onClick={() => createFolderMutation.mutate(folderName.trim())}>创建</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
