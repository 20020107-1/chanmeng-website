'use client'

import Link from 'next/link'

export default function FloatingCta() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="mobile-floating-cta md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fbf8f1]/95 backdrop-blur-lg border-t border-[#d9cebb] px-3 pt-2 shadow-[0_-8px_30px_rgba(57,43,24,.08)]">
      <div className="flex gap-2.5 max-w-lg mx-auto">
        <Link
          href="/contact"
          className="flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#25211c] text-center text-sm font-semibold text-white shadow-[0_8px_20px_rgba(44,36,26,.14)]"
        >
          预约诊断
        </Link>
        <button
          onClick={() => scrollTo('partner')}
          className="flex min-h-11 flex-1 items-center justify-center rounded-full border border-[#c9aa76] bg-white/70 text-center text-sm font-semibold text-[#795a2e] transition hover:bg-[#f4e9d7]"
        >
          加入合伙人
        </button>
      </div>
    </div>
  )
}
