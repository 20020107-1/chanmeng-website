import Link from 'next/link'
import BrandMark from '@/components/brand-mark'
import BrandName from '@/components/brand-name'
import type { Metadata } from 'next'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: '页面未找到',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 导航条 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <BrandMark />
            <BrandName />
          </Link>
        </div>
      </nav>

      {/* 内容区 */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* 大数字 */}
          <div className="text-8xl md:text-9xl font-bold text-blue-100 mb-4">404</div>

          {/* 标题 */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            页面未找到
          </h1>

          {/* 说明 */}
          <p className="text-gray-500 leading-relaxed mb-8">
            您访问的页面可能已被移除、更名或暂时不可用。<br />
            请检查网址是否拼写正确，或返回首页继续浏览。
          </p>

          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all"
            >
              返回首页
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-3.5 rounded-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold transition-all"
            >
              联系我们
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
