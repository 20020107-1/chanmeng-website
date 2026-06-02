'use client'

import { motion } from 'framer-motion'

interface HighlightTextProps {
  children: React.ReactNode
  color?: string
  className?: string
}

const COLORS: Record<string, string> = {
  blue: 'from-blue-200/60 to-blue-300/40',
  amber: 'from-amber-200/60 to-amber-300/40',
  emerald: 'from-emerald-200/60 to-emerald-300/40',
  rose: 'from-rose-200/60 to-rose-300/40',
}

export default function HighlightText({ children, color = 'blue', className = '' }: HighlightTextProps) {
  const gradient = COLORS[color] || COLORS.blue

  return (
    <span className={`relative inline ${className}`}>
      <motion.span
        initial={{ width: '0%' }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-sm`}
        style={{ top: '60%', height: '40%', zIndex: 0 }}
      />
      <span className="relative z-[1]">{children}</span>
    </span>
  )
}
