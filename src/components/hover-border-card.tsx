'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

interface HoverBorderCardProps {
  children: React.ReactNode
  className?: string
  gradientFrom?: string
  gradientTo?: string
}

export default function HoverBorderCard({
  children,
  className = '',
  gradientFrom = '#3b82f6',
  gradientTo = '#06b6d4',
}: HoverBorderCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      className={`group relative rounded-xl bg-white p-[1px] shadow-sm transition-shadow duration-300 hover:shadow-lg ${className}`}
      whileHover={{ y: -2 }}
    >
      {/* 渐变边框 — 默认透明，hover 可见 */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo}, ${gradientFrom})`,
          backgroundSize: '200% 200%',
          animation: 'border-rotate 3s linear infinite',
        }}
      />
      {/* 内部白色内容区 */}
      <div className="relative rounded-xl bg-white p-[calc(theme(spacing.5)-1px)] h-full">
        {children}
      </div>
    </motion.div>
  )
}
