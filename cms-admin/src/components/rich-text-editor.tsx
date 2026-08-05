/**
 * 轻量富文本编辑器（基于 contentEditable + document.execCommand）
 * 支持：标题、加粗、斜体、下划线、列表、链接、图片、清除格式、源码查看
 * 演示环境零依赖；生产可替换为 TipTap / Quill
 */
import { useRef, useState } from 'react'
import type { ComponentType } from 'react'
import {
  Bold, Italic, Underline, List, ListOrdered, Link2, ImagePlus, Code, Heading2, Heading3, RemoveFormatting,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function RichTextEditor({
  value, onChange, placeholder = '请输入正文…', className,
}: {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [sourceMode, setSourceMode] = useState(false)

  const exec = (command: string, arg?: string) => {
    ref.current?.focus()
    document.execCommand(command, false, arg)
    onChange(ref.current?.innerHTML ?? '')
  }

  const insertLink = () => {
    const url = window.prompt('请输入链接地址：', 'https://')
    if (url) exec('createLink', url)
  }

  const insertImage = () => {
    const url = window.prompt('请输入图片地址：', 'https://')
    if (url) exec('insertImage', url)
  }

  const tools: { icon: ComponentType<{ className?: string }>; title: string; action: () => void }[] = [
    { icon: Heading2, title: '二级标题', action: () => exec('formatBlock', '<h2>') },
    { icon: Heading3, title: '三级标题', action: () => exec('formatBlock', '<h3>') },
    { icon: Bold, title: '加粗', action: () => exec('bold') },
    { icon: Italic, title: '斜体', action: () => exec('italic') },
    { icon: Underline, title: '下划线', action: () => exec('underline') },
    { icon: List, title: '无序列表', action: () => exec('insertUnorderedList') },
    { icon: ListOrdered, title: '有序列表', action: () => exec('insertOrderedList') },
    { icon: Link2, title: '插入链接', action: insertLink },
    { icon: ImagePlus, title: '插入图片', action: insertImage },
    { icon: RemoveFormatting, title: '清除格式', action: () => exec('removeFormat') },
  ]

  return (
    <div className={cn('rounded-md border bg-background', className)}>
      <div className="flex flex-wrap items-center gap-0.5 border-b p-1.5">
        {tools.map((t) => (
          <Button key={t.title} type="button" variant="ghost" size="icon" className="h-8 w-8" title={t.title} onClick={t.action}>
            <t.icon className="h-4 w-4" />
          </Button>
        ))}
        <Button
          type="button" variant="ghost" size="icon"
          className={cn('ml-auto h-8 w-8', sourceMode && 'bg-muted')}
          title="查看源码"
          onClick={() => setSourceMode((s) => !s)}
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>
      {sourceMode ? (
        <Textarea
          className="min-h-[320px] rounded-none border-0 font-mono text-xs focus-visible:ring-0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          className="rte-content min-h-[320px] p-4 text-sm leading-7 outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
          dangerouslySetInnerHTML={{ __html: value }}
          onInput={() => onChange(ref.current?.innerHTML ?? '')}
        />
      )}
    </div>
  )
}
