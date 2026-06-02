'use client'

import { useState, useEffect, useRef } from 'react'

interface ScrollCountUpProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export default function ScrollCountUp({ end, suffix = '', duration = 1.5, className = '' }: ScrollCountUpProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  )
}
