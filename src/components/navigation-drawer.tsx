'use client'

import Link from 'next/link'
import { NAV_GROUPS } from '@/data/navigation'

export default function NavigationDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <button type="button" aria-label="关闭导航遮罩" tabIndex={open ? 0 : -1} onClick={onClose}
        className={`fixed inset-0 top-[49px] z-40 bg-black/10 transition-opacity duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside aria-label="全部导航" aria-hidden={!open}
        className={`fixed bottom-0 right-0 top-[49px] z-50 w-[min(420px,100vw)] overflow-y-auto border-l border-black/5 bg-white/98 px-8 py-9 shadow-[-24px_0_70px_rgba(0,0,0,.10)] transition-transform duration-300 ease-[cubic-bezier(.32,.72,0,1)] md:px-10 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <p className="mb-8 text-[11px] font-medium tracking-[0.14em] text-gray-400">全部导航</p>
        <div className="space-y-9">
          {NAV_GROUPS.map((group) => (
            <section key={group.title} className="border-b border-gray-100 pb-8 last:border-0">
              <p className="mb-3 text-xs font-medium text-gray-400">{group.title}</p>
              <div className="flex flex-col">
                {group.links.map((item) => (
                  <Link key={item.href} href={item.href} tabIndex={open ? 0 : -1} onClick={onClose}
                    className={`group flex items-center justify-between py-2.5 text-xl font-medium tracking-[-0.03em] transition-colors ${item.href === '/contact' ? 'text-blue-600 hover:text-blue-700' : 'text-gray-900 hover:text-blue-600'}`}>
                    {item.name}
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
