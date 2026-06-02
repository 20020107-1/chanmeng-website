'use client'

import { motion } from 'framer-motion'

const LOGOS = [
  '电动自行车品牌A', '杭州家居集团B', '智能家电品牌C', '跨境服饰品牌D',
  '五金工具品牌E', '户外用品品牌F', '美妆个护品牌G', '食品品牌H',
  '宠物用品品牌I', '电子配件品牌J', '母婴品牌K', '运动器材品牌L',
]

export default function LogoWall() {
  return (
    <div className="overflow-hidden py-6">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {[...LOGOS, ...LOGOS].map((name, i) => (
          <span key={i} className="text-gray-500 text-sm font-medium hover:text-gray-300 transition-colors cursor-default flex-shrink-0">
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
