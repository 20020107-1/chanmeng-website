const DEMO_LOGOS = [
  { name: 'Alibaba.com', subtitle: '阿里巴巴国际站', color: 'text-[#ff6a00]' },
  { name: 'Shopify', subtitle: 'Commerce Platform', color: 'text-[#008060]' },
  { name: 'EMMAS AI', subtitle: 'AI Technology', color: 'text-[#155eef]', image: '/emmasai-logo.webp' },
  { name: 'Google', subtitle: 'Digital Growth', color: 'text-[#4285f4]' },
  { name: 'Meta', subtitle: 'Business', color: 'text-[#0866ff]' },
]

function LogoCard({ logo }: { logo: (typeof DEMO_LOGOS)[number] }) {
  return (
    <div className="group flex h-28 w-[230px] shrink-0 items-center justify-center rounded-[22px] border border-black/[0.05] bg-white px-6 shadow-[0_8px_30px_rgba(15,23,42,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_38px_rgba(15,23,42,.10)]">
      <div className="flex items-center gap-3">
        {logo.image ? (
          <img src={logo.image} alt="" className="h-11 w-11 rounded-xl object-contain" />
        ) : (
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-current/5 text-lg font-semibold ${logo.color}`}>
            {logo.name.slice(0, 1)}
          </span>
        )}
        <div>
          <p className={`text-xl font-semibold tracking-[-0.035em] ${logo.color}`}>{logo.name}</p>
          <p className="mt-1 text-xs text-slate-400">{logo.subtitle}</p>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const logos = reverse ? [...DEMO_LOGOS].reverse() : DEMO_LOGOS

  return (
    <div className="partner-marquee relative overflow-hidden py-2">
      <div className={`partner-marquee-track ${reverse ? 'partner-marquee-track-reverse' : ''}`}>
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 gap-5 pr-5" aria-hidden={group === 1}>
            {logos.map((logo) => <LogoCard key={`${group}-${logo.name}`} logo={logo} />)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PartnerLogoMarquee() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f5f5f7] to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f5f5f7] to-transparent md:w-32" />
      <div className="space-y-4">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </div>
  )
}
