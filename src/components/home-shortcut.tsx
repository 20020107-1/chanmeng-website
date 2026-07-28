'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function HomeShortcut() {
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <Link
      href="/"
      aria-label="回到首页"
      className="fixed bottom-6 right-6 z-40 inline-flex h-11 items-center justify-center rounded-full border border-blue-200 bg-white/95 px-5 text-sm font-medium text-blue-600 shadow-[0_8px_30px_rgba(15,23,42,0.12)] backdrop-blur transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-[0_10px_34px_rgba(37,99,235,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      回到首页
    </Link>
  )
}
