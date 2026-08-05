/**
 * 拖拽上传组件：
 * - 支持点击选择 / 拖拽文件
 * - 模拟上传进度条
 * - 图片小于 300KB 存为 dataURL（可持久预览），否则使用占位图 URL
 */
import { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export interface UploadedItem {
  name: string
  url: string
  size: number
  mime: string
}

export function UploadZone({
  onUploaded, accept = 'image/*', multiple = true, hint,
}: {
  onUploaded: (files: UploadedItem[]) => void
  accept?: string
  multiple?: boolean
  hint?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)

  const processFiles = async (files: FileList | File[]) => {
    const list = Array.from(files)
    if (list.length === 0) return
    // 模拟上传进度
    setProgress(0)
    for (let p = 10; p <= 90; p += 20) {
      await new Promise((r) => setTimeout(r, 120))
      setProgress(p)
    }
    const items: UploadedItem[] = await Promise.all(
      list.map(
        (f) =>
          new Promise<UploadedItem>((resolve) => {
            const finish = (url: string) =>
              resolve({ name: f.name, url, size: f.size, mime: f.type || 'application/octet-stream' })
            if (f.type.startsWith('image/') && f.size < 300 * 1024) {
              const reader = new FileReader()
              reader.onload = () => finish(String(reader.result))
              reader.onerror = () => finish(`https://picsum.photos/seed/${encodeURIComponent(f.name)}/800/500`)
              reader.readAsDataURL(f)
            } else {
              finish(`https://picsum.photos/seed/${encodeURIComponent(f.name)}/800/500`)
            }
          }),
      ),
    )
    setProgress(100)
    onUploaded(items)
    setTimeout(() => setProgress(null), 400)
  }

  return (
    <div>
      <div
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors',
          dragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/40',
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          processFiles(e.dataTransfer.files)
        }}
      >
        <UploadCloud className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium">点击或拖拽文件到此处上传</p>
        <p className="text-xs text-muted-foreground">{hint ?? '支持图片与常见文档；演示环境大于 300KB 的图片将使用占位图'}</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) processFiles(e.target.files)
          e.target.value = ''
        }}
      />
      {progress !== null && (
        <div className="mt-3 space-y-1">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">上传中… {progress}%</p>
        </div>
      )}
    </div>
  )
}
