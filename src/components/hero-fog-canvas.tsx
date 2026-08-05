'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type FogLayer = {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
  speed: number
  range: number
  originX: number
  originY: number
  originZ: number
  baseScale: number
  phase: number
}

function createFogTexture(seed: number) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 320
  const context = canvas.getContext('2d')
  if (!context) return new THREE.CanvasTexture(canvas)

  context.clearRect(0, 0, canvas.width, canvas.height)
  const clouds = [
    [0.12, 0.56, 0.34, 0.34], [0.31, 0.48, 0.3, 0.28],
    [0.52, 0.6, 0.4, 0.34], [0.73, 0.47, 0.33, 0.3],
    [0.91, 0.59, 0.3, 0.34],
  ]
  clouds.forEach(([x, y, radius, alpha], index) => {
    const wobble = Math.sin(seed * 2.17 + index * 1.71) * 0.045
    const gradient = context.createRadialGradient(
      (x + wobble) * canvas.width,
      (y - wobble) * canvas.height,
      0,
      (x + wobble) * canvas.width,
      (y - wobble) * canvas.height,
      radius * canvas.width,
    )
    gradient.addColorStop(0, `rgba(255,253,247,${alpha})`)
    gradient.addColorStop(0.38, `rgba(247,243,234,${alpha * 0.82})`)
    gradient.addColorStop(0.7, `rgba(176,165,146,${alpha * 0.16})`)
    gradient.addColorStop(1, 'rgba(250,246,237,0)')
    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)
  })
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  return texture
}

export default function HeroFogCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1600)
    camera.position.z = 500
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 1.35))

    const geometry = new THREE.PlaneGeometry(1380, 400)
    const configs = [
      { z: -145, y: -132, opacity: 0.68, speed: 3.1, range: 18, scale: 1.12 },
      { z: -55, y: -154, opacity: 0.52, speed: -2.6, range: 30, scale: 1.06 },
      { z: 48, y: -180, opacity: 0.38, speed: 2.1, range: 42, scale: 1 },
      { z: 132, y: -204, opacity: 0.25, speed: -1.7, range: 56, scale: 0.94 },
    ]
    const textures: THREE.CanvasTexture[] = []
    const layers: FogLayer[] = configs.map((config, index) => {
      const texture = createFogTexture(index + 1)
      textures.push(texture)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: config.opacity,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(index % 2 ? 24 : -22, config.y, config.z)
      mesh.scale.setScalar(config.scale)
      scene.add(mesh)
      return {
        mesh,
        speed: config.speed,
        range: config.range,
        originX: mesh.position.x,
        originY: config.y,
        originZ: config.z,
        baseScale: config.scale,
        phase: index * 1.37,
      }
    })

    function resize() {
      const width = host.clientWidth
      const height = host.clientHeight
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }
    resize()

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let visible = true
    let frame = 0
    let previous = 0
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0.02 })
    observer.observe(host)

    function animate(time: number) {
      frame = requestAnimationFrame(animate)
      if (!visible || time - previous < 42) return
      previous = time
      const seconds = time * 0.001
      if (!prefersReducedMotion) {
        layers.forEach((layer) => {
          const wave = Math.sin(seconds * Math.abs(layer.speed) * 0.12 + layer.phase)
          layer.mesh.position.x = layer.originX + Math.sin(seconds * layer.speed * 0.09 + layer.phase) * layer.range
          layer.mesh.position.y = layer.originY + Math.cos(seconds * 0.11 + layer.phase) * 3.5
          layer.mesh.position.z = layer.originZ + wave * 9
          const breathing = layer.baseScale * (1 + wave * 0.008)
          layer.mesh.scale.setScalar(breathing)
        })
      }
      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(animate)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      layers.forEach(({ mesh }) => mesh.material.dispose())
      textures.forEach((texture) => texture.dispose())
      geometry.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-90 [filter:contrast(1.06)_saturate(.82)] [mask-image:linear-gradient(to_bottom,transparent_20%,black_54%,black_100%)]" aria-hidden="true" />
}
