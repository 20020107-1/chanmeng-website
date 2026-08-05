'use client'

import { useEffect, useRef } from 'react'

export default function HeroSplineParallax() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    const host = scene?.parentElement
    if (!scene || !host) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame = 0
    const updateTarget = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect()
      if (event.clientY < bounds.top || event.clientY > bounds.bottom) return
      targetX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2
      targetY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2
    }

    const resetTarget = () => {
      targetX = 0
      targetY = 0
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.07
      currentY += (targetY - currentY) * 0.07

      const x = currentX
      const y = currentY

      scene.style.setProperty('--far-x', `${x * -1.5}px`)
      scene.style.setProperty('--far-y', `${y * -1}px`)
      scene.style.setProperty('--mid-x', `${x * 2.5}px`)
      scene.style.setProperty('--mid-y', `${y * 1.5}px`)
      scene.style.setProperty('--left-x', `${x * 5}px`)
      scene.style.setProperty('--left-y', `${y * 2.5}px`)
      scene.style.setProperty('--left-rotate', `${x * 0.1}deg`)
      scene.style.setProperty('--right-x', `${x * 7}px`)
      scene.style.setProperty('--right-y', `${y * 3.5}px`)
      scene.style.setProperty('--right-rotate', `${x * -0.12}deg`)
      scene.style.setProperty('--birds-x', `${x * 9}px`)
      scene.style.setProperty('--birds-y', `${y * 4}px`)
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', updateTarget, { passive: true })
    host.addEventListener('pointerleave', resetTarget)
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', updateTarget)
      host.removeEventListener('pointerleave', resetTarget)
    }
  }, [])

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const layerPath = `${basePath}/brand/hero-layers`

  return (
    <div
      ref={sceneRef}
      className="hero-parallax-scene absolute inset-0 z-0 overflow-hidden bg-[#f8f5ed]"
      aria-hidden="true"
    >
      <div
        className="hero-parallax-layer hero-parallax-base"
        style={{ backgroundColor: "#f8f1e6" }}
      />
      <div
        className="hero-parallax-layer hero-parallax-far"
        style={{ backgroundImage: `url("${layerPath}/far-mountains.webp")` }}
      />
      <div
        className="hero-parallax-layer hero-parallax-mid"
        style={{ backgroundImage: `url("${layerPath}/gold-clouds.webp")` }}
      />
      <div
        className="hero-parallax-layer hero-parallax-left"
        style={{ backgroundImage: `url("${layerPath}/left-mountain.webp")` }}
      />
      <div
        className="hero-parallax-layer hero-parallax-right"
        style={{ backgroundImage: `url("${layerPath}/right-mountain.webp")` }}
      />
      <div
        className="hero-parallax-layer hero-parallax-birds"
        style={{ backgroundImage: `url("${layerPath}/birds.webp")` }}
      />
      <div className="hero-parallax-light" />
      <div className="hero-parallax-vignette" />
    </div>
  )
}
