'use client'

export default function FloatingCta() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-blue-200 px-4 py-3 shadow-lg">
      <div className="flex gap-3 max-w-lg mx-auto">
        <button
          onClick={() => scrollTo('contact')}
          className="flex-1 text-center py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20"
        >
          立即咨询
        </button>
        <button
          onClick={() => scrollTo('partner')}
          className="flex-1 text-center py-3 rounded-full border border-blue-300 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition"
        >
          加入合伙人
        </button>
      </div>
    </div>
  )
}
