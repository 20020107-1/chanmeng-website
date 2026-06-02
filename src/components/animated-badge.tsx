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
      <motion.svg
        className="h-4 w-4 text-blue-400 group-hover:translate-x-0.5 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        initial={{ x: 0 }}
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </motion.svg>
    </motion.div>
  )
}
