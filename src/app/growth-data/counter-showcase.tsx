'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './growth-data.module.css'

const SOURCE_URL = '/growth-data-showcase.html'

type ListenerRecord = {
  target: Window
  type: string
  listener: EventListenerOrEventListenerObject
  options?: boolean | AddEventListenerOptions
}

function scopeStyles(css: string) {
  return css
    .replace(/:root\b/g, ':host')
    .replace(/\bhtml\b/g, ':host')
    .replace(/\bbody\b/g, '.showcaseBody')
    .replace(/:host\.is-embedded/g, ':host(.is-embedded)')
    .replace(/\.showcaseBody\.embedded-page/g, '.showcaseBody.embedded-page')
}

export default function CounterShowcase() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const controller = new AbortController()
    const listeners: ListenerRecord[] = []
    let resizeObserver: ResizeObserver | null = null
    let shadow = host.shadowRoot
    if (!shadow) shadow = host.attachShadow({ mode: 'open' })

    async function mountShowcase() {
      const response = await fetch(SOURCE_URL, { signal: controller.signal })
      if (!response.ok) throw new Error(`展示内容加载失败：${response.status}`)

      const source = await response.text()
      if (controller.signal.aborted || !shadow) return

      const parsed = new DOMParser().parseFromString(source, 'text/html')
      const styleText = [...parsed.querySelectorAll('style')]
        .map((style) => style.textContent || '')
        .join('\n')
      const scripts = [...parsed.querySelectorAll('script')]
        .filter((script) => !script.src)
        .map((script) => script.textContent || '')

      parsed.querySelectorAll('script').forEach((script) => script.remove())

      const style = document.createElement('style')
      style.textContent = `${scopeStyles(styleText)}
        :host{display:block;width:100%;background:#0b0c0e;color:#f3f1eb}
        .showcaseBody{width:100%;overflow:clip}

        /* Restore the original orange interaction feedback after the showcase is
           mounted inside a shadow root. Keep these selectors deliberately more
           specific than the embedded-page visibility overrides above. */
        .showcaseBody .project-card .project-meta h3 {
          transition: color .28s cubic-bezier(.22, 1, .36, 1);
        }
        .showcaseBody .project-card:hover .project-meta h3,
        .showcaseBody .project-card.is-hovered .project-meta h3,
        .showcaseBody .project-card:focus-visible .project-meta h3 {
          color: #ff5a36;
        }
        .showcaseBody .service-item .service-cta {
          transition:
            grid-template-columns .45s cubic-bezier(.22, 1, .36, 1),
            opacity .3s ease,
            background-color .28s ease,
            color .28s ease;
        }
        .showcaseBody .service-item:hover .service-cta,
        .showcaseBody .service-item:focus-visible .service-cta,
        .showcaseBody .service-item.is-active .service-cta {
          background: #ff5a36;
          color: #111;
        }
        .showcaseBody .service-item .service-cta:hover,
        .showcaseBody .service-item .service-cta:focus-visible {
          background: #f3f1eb;
          color: #111;
          transform: translateY(-2px);
        }
      `

      const body = document.createElement('div')
      body.className = `showcaseBody embedded-page ${parsed.body.className || ''}`.trim()
      body.innerHTML = parsed.body.innerHTML

      host.classList.add('is-embedded')

      shadow.replaceChildren(style, body)

      host.style.setProperty('--showcase-height', `${Math.max(body.scrollHeight, body.offsetHeight, host.scrollHeight, 720)}px`)

      const documentProxy = new Proxy(document, {
        get(target, property) {
          if (property === 'body') return body
          if (property === 'documentElement') return host
          if (property === 'querySelector') return shadow?.querySelector.bind(shadow)
          if (property === 'querySelectorAll') return shadow?.querySelectorAll.bind(shadow)
          if (property === 'getElementById') {
            return (id: string) => shadow?.querySelector(`#${CSS.escape(id)}`) || null
          }
          const value = Reflect.get(target, property)
          return typeof value === 'function' ? value.bind(target) : value
        },
      })

      const windowProxy = new Proxy(window, {
        get(target, property, receiver) {
          if (property === 'parent' || property === 'top') return target
          if (property === 'self') return receiver
          if (property === 'addEventListener') {
            return (
              type: string,
              listener: EventListenerOrEventListenerObject,
              options?: boolean | AddEventListenerOptions,
            ) => {
              if (type === 'load') {
                if (typeof listener === 'function') listener.call(target, new Event('load'))
                else listener.handleEvent(new Event('load'))
                return
              }
              listeners.push({ target, type, listener, options })
              target.addEventListener(type, listener, options)
            }
          }
          const value = Reflect.get(target, property)
          return typeof value === 'function' ? value.bind(target) : value
        },
      })

      scripts.forEach((script) => {
        const run = new Function('document', 'window', script)
        run(documentProxy, windowProxy)
      })

      shadow.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
        card.addEventListener('pointerenter', () => card.classList.add('is-hovered'))
        card.addEventListener('pointerleave', () => card.classList.remove('is-hovered'))
        card.addEventListener('focusin', () => card.classList.add('is-hovered'))
        card.addEventListener('focusout', () => card.classList.remove('is-hovered'))
      })

      const updateEmbeddedHeight = () => {
        host.style.setProperty('--showcase-height', `${Math.max(body.scrollHeight, body.offsetHeight, host.scrollHeight, 720)}px`)
      }

      resizeObserver = new ResizeObserver(updateEmbeddedHeight)
      resizeObserver.observe(body)
      listeners.push({
        target: window,
        type: 'resize',
        listener: updateEmbeddedHeight,
        options: { passive: true },
      })
      window.addEventListener('resize', updateEmbeddedHeight, { passive: true })
      requestAnimationFrame(updateEmbeddedHeight)

      setReady(true)
    }

    mountShowcase().catch((error) => {
      if (!controller.signal.aborted) console.error(error)
    })

    return () => {
      controller.abort()
      host.classList.remove('is-embedded')
      resizeObserver?.disconnect()
      listeners.forEach(({ target, type, listener, options }) => {
        target.removeEventListener(type, listener, options)
      })
      shadow?.replaceChildren()
    }
  }, [])

  return (
    <section
      className={`${styles.showcase} ${ready ? styles.loaded : ''}`}
      aria-label="完整数据与品牌动效展示"
    >
      <div ref={hostRef} className={styles.directContent} />
    </section>
  )
}



