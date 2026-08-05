'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * 以 iframe 形式嵌入 public/ 下的独立展示页（pricing.html）。
 * 高度优先取内页 postMessage 同步值，同源测量作为兜底。
 * 注意：iframe 的 load 事件可能早于 React 水合完成，
 * 因此测量在挂载后即启动并多次重试，不能仅依赖 onLoad。
 */
export default function ShowcaseFrame({ src, title }: { src: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(760)

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      const data = event.data as { type?: string; height?: number } | null
      if (data?.type === 'growth-data-showcase:height' && typeof data.height === 'number') {
        setHeight(data.height)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    let observer: ResizeObserver | null = null

    const measure = () => {
      const doc = frame.contentDocument
      if (!doc?.body) return
      const h = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight)
      // 上限保护：内页若存在 vh 布局可能引发高度反馈，异常时不追高
      if (h > 0 && h < 5000) setHeight(h)
      if (!observer) {
        observer = new ResizeObserver(measure)
        observer.observe(doc.body)
        observer.observe(doc.documentElement)
      }
    }

    frame.addEventListener('load', measure)
    // load 可能早于水合，挂载后多次重测兜底
    const timers = [0, 300, 1000, 2500].map((t) => window.setTimeout(measure, t))

    return () => {
      frame.removeEventListener('load', measure)
      timers.forEach((t) => window.clearTimeout(t))
      observer?.disconnect()
    }
  }, [])

  return (
    <iframe
      ref={frameRef}
      src={src}
      title={title}
      scrolling="auto"
      style={{ width: '100%', height, border: 'none', display: 'block', background: '#fbf7ef' }}
    />
  )
}
