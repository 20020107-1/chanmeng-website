'use client'

import { motion } from 'framer-motion'

interface AnimatedBadgeProps {
  text: string
  className?: string
}

export default function AnimatedBadge({ text, className = '' }: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className={`group relative inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur px-4 py-1.5 text-sm font-medium text-blue-600 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 cursor-default ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
      </span>
      {text}
    </motion.div>
  )
}
