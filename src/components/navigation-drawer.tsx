'use client'

import Link from 'next/link'
import { NAV_GROUPS } from '@/data/navigation'

export default function NavigationDrawer({
  open,
  onClose,
  onPointerEnter,
  onPointerLeave,
}: {
  open: boolean
  onClose: () => void
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}) {
  return (
    <>
      <button type="button" aria-label="关闭导航遮罩" tabIndex={open ? 0 : -1} onClick={onClose}
        className={`fixed inset-0 top-[72px] z-40 bg-transparent transition-opacity duration-200 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside aria-label="全部导航" aria-hidden={!open}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        className={`fixed right-[max(8px,calc((100vw-1144px)/2))] top-[60px] z-50 w-[244px] origin-top-right overflow-y-auto rounded-[16px] border border-[#2d2926]/[0.08] bg-[#fbfaf6] px-6 py-5 shadow-[0_18px_55px_rgba(45,41,38,.16)] transition-[opacity,transform] duration-200 ease-[cubic-bezier(.22,1,.36,1)] ${open ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-1 scale-[0.985] opacity-0'}`}>
        <div className="space-y-4">
          {NAV_GROUPS.map((group) => (
            <section key={group.title} className="border-b border-[#2d2926]/12 pb-4 last:border-0 last:pb-0">
              <p className="mb-2.5 text-[13px] font-medium text-[#8b857e]">{group.title}</p>
              <div className="flex flex-col">
                {group.links.map((item) => (
                  <Link key={item.href} href={item.href} tabIndex={open ? 0 : -1} onClick={onClose}
                    className="group flex items-center justify-between py-1 font-serif text-[17px] font-normal leading-tight tracking-[-0.02em] text-[#292521]">
                    <span className="decoration-[#292521] decoration-[1px] underline-offset-[5px] group-hover:underline">{item.name}</span>
                    <span className="shrink-0 font-sans text-[12px] font-normal leading-none text-[#aaa39a] transition-colors group-hover:text-[#514a43]" aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </aside>
    </>
  )
}
