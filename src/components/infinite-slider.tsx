'use client'

import { motion } from 'framer-motion'

interface InfiniteSliderProps {
  items: string[]
  speed?: number
  className?: string
}

export default function InfiniteSlider({ items, speed = 30, className = '' }: InfiniteSliderProps) {
  return (
    <div className={`overflow-hidden py-6 ${className}`}>
      <motion.div
        className="flex gap-10 whitespace-nowrap w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-gray-400 text-sm font-medium hover:text-blue-500 transition-colors cursor-default flex-shrink-0 px-4 py-2 rounded-full hover:bg-blue-50/50"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
