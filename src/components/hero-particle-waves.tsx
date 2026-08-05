'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  attribute float scale;
  varying float vDepth;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDepth = clamp((-mvPosition.z - 260.0) / 1100.0, 0.0, 1.0);
    gl_PointSize = scale * (260.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform vec3 color;
  uniform float opacity;
  varying float vDepth;

  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    if (distanceToCenter > 0.5) discard;
    float softEdge = 1.0 - smoothstep(0.26, 0.5, distanceToCenter);
    float depthFade = mix(0.92, 0.3, vDepth);
    gl_FragColor = vec4(color, opacity * softEdge * depthFade);
  }
`

export default function HeroParticleWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return

    const isCompact = window.innerWidth < 768
    const amountX = isCompact ? 28 : 44
    const amountZ = isCompact ? 24 : 36
    const separation = isCompact ? 43 : 38
    const pointCount = amountX * amountZ
    const positions = new Float32Array(pointCount * 3)
    const scales = new Float32Array(pointCount)

    let positionIndex = 0
    let scaleIndex = 0
    for (let x = 0; x < amountX; x += 1) {
      for (let z = 0; z < amountZ; z += 1) {
        positions[positionIndex] = x * separation - (amountX * separation) / 2
        positions[positionIndex + 1] = 0
        positions[positionIndex + 2] = z * separation - (amountZ * separation) / 2
        scales[scaleIndex] = 8
        positionIndex += 3
        scaleIndex += 1
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color('#a97836') },
        opacity: { value: isCompact ? 0.36 : 0.48 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })

    const scene = new THREE.Scene()
    const particles = new THREE.Points(geometry, material)
    particles.position.y = isCompact ? -180 : -155
    particles.rotation.y = -0.08
    scene.add(particles)

    const camera = new THREE.PerspectiveCamera(54, 1, 1, 3000)
    camera.position.set(0, isCompact ? 235 : 270, isCompact ? 820 : 900)
    camera.lookAt(0, -75, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isCompact ? 1 : 1.5))

    const pointer = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 1
    let height = 1
    let visible = true
    let frame = 0
    let previous = 0

    function resize() {
      width = Math.max(host.clientWidth, 1)
      height = Math.max(host.clientHeight, 1)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    function onPointerMove(event: PointerEvent) {
      const bounds = host.getBoundingClientRect()
      pointer.x = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2
      pointer.y = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2
    }

    function onPointerLeave() {
      pointer.x = 0
      pointer.y = 0
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    }, { threshold: 0.02 })
    observer.observe(host)

    function animate(time: number) {
      frame = requestAnimationFrame(animate)
      if (!visible || time - previous < (isCompact ? 50 : 32)) return
      previous = time

      current.x += (pointer.x - current.x) * 0.035
      current.y += (pointer.y - current.y) * 0.035
      camera.position.x = current.x * (isCompact ? 22 : 58)
      camera.position.y = (isCompact ? 235 : 270) - current.y * (isCompact ? 12 : 28)
      camera.lookAt(current.x * 10, -75, 0)

      const phase = prefersReducedMotion ? 0.4 : time * 0.00042
      const positionAttribute = geometry.attributes.position as THREE.BufferAttribute
      const scaleAttribute = geometry.attributes.scale as THREE.BufferAttribute
      let p = 0
      let s = 0

      for (let x = 0; x < amountX; x += 1) {
        for (let z = 0; z < amountZ; z += 1) {
          const xWave = Math.sin((x + phase * 8) * 0.34)
          const zWave = Math.sin((z + phase * 6) * 0.46)
          positions[p + 1] = (xWave + zWave) * (isCompact ? 11 : 16)
          scales[s] = 7.5 + (xWave + 1) * 2.2 + (zWave + 1) * 1.6
          p += 3
          s += 1
        }
      }

      positionAttribute.needsUpdate = true
      scaleAttribute.needsUpdate = true
      renderer.render(scene, camera)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    host.addEventListener('pointermove', onPointerMove, { passive: true })
    host.addEventListener('pointerleave', onPointerLeave)
    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full opacity-90 [mask-image:linear-gradient(to_bottom,transparent_12%,black_42%,black_92%,transparent_100%)]"
      aria-hidden="true"
    />
  )
}
