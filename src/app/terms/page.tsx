import type { Metadata } from 'next'
import Link from 'next/link'
import BrandMark from '@/components/brand-mark'
import BrandName from '@/components/brand-name'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: '服务条款',
  description: '婵梦科技服务条款 — 使用本网站及相关服务前请仔细阅读。',
  robots: { index: true, follow: true },
}

const SECTIONS = [
  {
    title: '一、服务概述',
    items: [
      '杭州婵梦传媒科技有限公司（以下简称"婵梦科技"或"我们"）通过本网站（chanmeng.com）提供企业增长服务信息展示、咨询预约、合作伙伴申请等服务。',
      '使用本网站即表示您同意遵守本服务条款。如果您不同意这些条款，请停止使用本网站。',
      '本网站展示的服务内容、价格和方案可能随时调整，最终以双方签署的书面合同为准。',
    ],
  },
  {
    title: '二、用户义务',
    items: [
      '您承诺在使用本网站时遵守所有适用的法律法规。',
      '您不得利用本网站从事任何非法或未经授权的活动，包括但不限于：发送垃圾信息、传播恶意软件、侵犯他人知识产权。',
      '您通过本网站提交的信息应当真实、准确、完整。',
    ],
  },
  {
    title: '三、知识产权',
    items: [
      '本网站所有内容（包括但不限于文字、图片、Logo、设计、代码）的知识产权归婵梦科技或其授权方所有。',
      '未经书面许可，任何单位和个人不得复制、转载、摘编或以其它方式使用本网站内容。',
      '"婵梦科技"、"婵梦"及其Logo为杭州婵梦传媒科技有限公司的商标。',
      '本网站使用的第三方商标归各自所有者所有。',
    ],
  },
  {
    title: '四、免责声明',
    items: [
      '本网站提供的服务信息和数据仅供参考，不构成任何形式的承诺或保证。具体服务内容、价格和条款以双方签署的书面协议为准。',
      '我们尽力保证网站信息的准确性和及时性，但不对信息的完整性、准确性或可靠性做任何明示或暗示的保证。',
      '在法律允许的最大范围内，婵梦科技不对因使用或无法使用本网站而导致的任何直接、间接、附带或后果性损失承担责任。',
      '本网站可能包含指向第三方网站的链接，这些链接仅供便利之用。我们对第三方网站的内容、隐私政策或实践不承担任何责任。',
    ],
  },
  {
    title: '五、服务变更与终止',
    items: [
      '我们保留随时修改或终止本网站任何部分的权利，恕不另行通知。',
      '我们保留随时更新本服务条款的权利。更新后的条款将在本页面发布，继续使用本网站即视为接受修改后的条款。',
    ],
  },
  {
    title: '六、适用法律',
    items: [
      '本服务条款受中华人民共和国法律管辖。',
      '因本条款引起的或与之相关的任何争议，双方应首先通过友好协商解决。协商不成的，任何一方可向婵梦科技所在地有管辖权的人民法院提起诉讼。',
    ],
  },
  {
    title: '七、联系我们',
    items: [
      '如果您对本服务条款有任何疑问，请通过以下方式联系我们：',
      '企微邮箱：yaoyuan@chanmengtech.cn',
      '地址：浙江省杭州市萧山区',
      '最后更新日期：2026年5月',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航条 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark />
            <BrandName />
          </Link>
          <Link href="/#contact" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            联系我们
          </Link>
        </div>
      </nav>

      {/* 内容区 */}
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">服务条款</h1>
        <p className="text-gray-500 text-sm mb-12">
          欢迎使用杭州婵梦传媒科技有限公司（以下简称"婵梦科技"或"我们"）的网站和服务。使用本网站前，请仔细阅读以下服务条款。
        </p>
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">{s.title}</h2>
              <ul className="space-y-2 text-gray-600 leading-relaxed">
                {s.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-400 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
