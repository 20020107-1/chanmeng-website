'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'challenge', label: '商业挑战' },
  { id: 'transformation', label: '解决策略' },
  { id: 'results', label: '项目结果' },
  { id: 'background', label: '项目背景' },
]

export default function CaseSectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-18% 0px -60% 0px', threshold: [0.05, 0.25, 0.5] },
    )
    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav aria-label="案例章节" className="border-l border-gray-300">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`relative block px-4 py-3 text-sm transition-colors ${
            active === section.id ? 'font-medium text-[#1d1d1f]' : 'text-gray-500 hover:text-[#1d1d1f]'
          }`}
        >
          {active === section.id && <span className="absolute -left-px inset-y-0 w-[3px] bg-blue-600" />}
          {section.label}
        </a>
      ))}
    </nav>
  )
}
