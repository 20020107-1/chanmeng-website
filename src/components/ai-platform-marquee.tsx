const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const AI_PLATFORMS = [
  { name: 'DeepSeek', icon: `${BASE_PATH}/platform-icons/deepseek.ico`, note: '智能搜索与推理', url: 'https://chat.deepseek.com/' },
  { name: '豆包', icon: `${BASE_PATH}/platform-icons/doubao.png`, note: 'AI搜索与智能问答', url: 'https://www.doubao.com/' },
  { name: '腾讯元宝', icon: `${BASE_PATH}/platform-icons/yuanbao.png`, note: '联网搜索与智能问答', url: 'https://yuanbao.tencent.com/' },
  { name: '通义千问', icon: `${BASE_PATH}/platform-icons/qianwen.png`, note: '大模型与智能搜索', url: 'https://www.qianwen.com/' },
  { name: '文心一言', icon: `${BASE_PATH}/platform-icons/wenxin.ico`, note: '生成式搜索与问答', url: 'https://wenxin.baidu.com/' },
  { name: 'Kimi', icon: `${BASE_PATH}/platform-icons/kimi.ico`, note: '长文本与联网搜索', url: 'https://www.kimi.com/' },
  { name: '纳米AI搜索', icon: `${BASE_PATH}/platform-icons/nami.svg`, note: '多模型智能搜索', url: 'https://www.n.cn/' },
  { name: '秘塔AI搜索', icon: `${BASE_PATH}/platform-icons/metaso.png`, note: '无广告智能搜索', url: 'https://metaso.cn/' },
]

function PlatformCard({ platform }: { platform: (typeof AI_PLATFORMS)[number] }) {
  return (
    <a href={platform.url} target="_blank" rel="noreferrer" aria-label={`访问${platform.name}官方网站`} className="flex h-28 w-[260px] shrink-0 items-center rounded-[22px] border border-black/[0.06] bg-white px-6 shadow-[0_8px_30px_rgba(15,23,42,.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_42px_rgba(15,23,42,.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
      <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[16px] border border-black/[0.06] bg-white shadow-[0_4px_16px_rgba(15,23,42,.08)]">
        <img src={platform.icon} alt="" className="h-full w-full object-cover" />
      </span>
      <div className="ml-4">
        <p className="text-lg font-semibold tracking-[-0.025em] text-slate-900">{platform.name}</p>
        <p className="mt-1 text-xs text-slate-400">{platform.note}</p>
      </div>
    </a>
  )
}

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...AI_PLATFORMS].reverse() : AI_PLATFORMS
  return (
    <div className="partner-marquee overflow-hidden py-2">
      <div className={`partner-marquee-track ${reverse ? 'partner-marquee-track-reverse' : ''}`}>
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 gap-5 pr-5" aria-hidden={group === 1}>
            {items.map((platform) => <PlatformCard key={`${group}-${platform.name}`} platform={platform} />)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AiPlatformMarquee() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f5f5f7] to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f5f5f7] to-transparent md:w-32" />
      <div className="space-y-4"><Row /><Row reverse /></div>
    </div>
  )
}

export { AI_PLATFORMS }
