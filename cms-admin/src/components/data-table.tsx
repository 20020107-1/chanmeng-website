/**
 * 通用数据表格 DataTable
 * - 支持：行选择（批量操作）、列排序（当前页内）、列宽拖拽调整
 * - 加载态骨架屏、空状态
 * - 分页由调用方控制（服务端分页），本组件只渲染当前页数据
 */
import { useMemo, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { EmptyState } from './common'

export interface Column<T> {
  key: string
  title: string
  /** 自定义渲染；缺省取 row[key] */
  render?: (row: T) => ReactNode
  /** 参与排序的取值函数；设置后可点击表头排序 */
  sortValue?: (row: T) => string | number
  width?: number
  className?: string
}

interface DataTableProps<T extends { id: number }> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  /** 开启行选择 */
  selectable?: boolean
  selectedIds?: number[]
  onSelectionChange?: (ids: number[]) => void
  emptyText?: string
  rowClassName?: (row: T) => string | undefined
}

export function DataTable<T extends { id: number }>({
  columns, data, loading, selectable, selectedIds = [], onSelectionChange, emptyText, rowClassName,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null)
  const [widths, setWidths] = useState<Record<string, number>>({})
  const resizing = useRef<{ key: string; startX: number; startW: number } | null>(null)

  // 排序（仅对当前页数据生效）
  const sorted = useMemo(() => {
    if (!sort) return data
    const col = columns.find((c) => c.key === sort.key)
    if (!col?.sortValue) return data
    const get = col.sortValue
    return [...data].sort((a, b) => {
      const va = get(a)
      const vb = get(b)
      const cmp = typeof va === 'number' && typeof vb === 'number'
        ? va - vb
        : String(va).localeCompare(String(vb), 'zh')
      return sort.dir === 'asc' ? cmp : -cmp
    })
  }, [data, sort, columns])

  const allChecked = data.length > 0 && selectedIds.length === data.length
  const toggleAll = () => {
    onSelectionChange?.(allChecked ? [] : data.map((r) => r.id))
  }
  const toggleOne = (id: number) => {
    onSelectionChange?.(
      selectedIds.includes(id) ? selectedIds.filter((i) => i !== id) : [...selectedIds, id],
    )
  }

  // 列宽拖拽
  const startResize = (key: string, e: ReactMouseEvent) => {
    e.preventDefault()
    const th = (e.target as HTMLElement).closest('th')
    resizing.current = { key, startX: e.clientX, startW: th?.offsetWidth || 120 }
    const onMove = (ev: MouseEvent) => {
      if (!resizing.current) return
      const { key: k, startX, startW } = resizing.current
      setWidths((w) => ({ ...w, [k]: Math.max(60, startW + ev.clientX - startX) }))
    }
    const onUp = () => {
      resizing.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  if (loading) {
    return (
      <div className="space-y-2 rounded-md border p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="w-10">
                <Checkbox checked={allChecked} onCheckedChange={toggleAll} aria-label="全选" />
              </TableHead>
            )}
            {columns.map((col) => {
              const w = widths[col.key] ?? col.width
              const active = sort?.key === col.key
              return (
                <TableHead
                  key={col.key}
                  style={w ? { width: w, minWidth: w } : undefined}
                  className={`relative select-none ${col.sortValue ? 'cursor-pointer hover:bg-muted/60' : ''}`}
                  onClick={() => {
                    if (!col.sortValue) return
                    setSort((s) =>
                      s?.key !== col.key
                        ? { key: col.key, dir: 'asc' }
                        : s.dir === 'asc'
                          ? { key: col.key, dir: 'desc' }
                          : null,
                    )
                  }}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.title}
                    {col.sortValue && (
                      active
                        ? sort!.dir === 'asc'
                          ? <ArrowUp className="h-3.5 w-3.5" />
                          : <ArrowDown className="h-3.5 w-3.5" />
                        : <ArrowUpDown className="h-3.5 w-3.5 opacity-30" />
                    )}
                  </span>
                  {/* 列宽拖拽手柄 */}
                  <span
                    className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize hover:bg-primary/40"
                    onMouseDown={(e) => startResize(col.key, e)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (selectable ? 1 : 0)}>
                <EmptyState text={emptyText} />
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((row) => (
              <TableRow key={row.id} className={rowClassName?.(row)}>
                {selectable && (
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(row.id)}
                      onCheckedChange={() => toggleOne(row.id)}
                      aria-label="选择行"
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '-')}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

/** 简单分页条 */
export function Pager({
  page, pageSize, total, onChange,
}: {
  page: number
  pageSize: number
  total: number
  onChange: (page: number) => void
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize))
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
      <span>共 {total} 条 · 第 {page}/{pages} 页</span>
      <div className="flex gap-2">
        <button
          className="rounded-md border px-3 py-1.5 disabled:opacity-40 hover:bg-muted"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          上一页
        </button>
        <button
          className="rounded-md border px-3 py-1.5 disabled:opacity-40 hover:bg-muted"
          disabled={page >= pages}
          onClick={() => onChange(page + 1)}
        >
          下一页
        </button>
      </div>
    </div>
  )
}
