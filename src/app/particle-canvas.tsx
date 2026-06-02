'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 200
const CONNECT_DIST = 2.2
const TOTAL_AREA = 12

function ParticleWeb() {
  const meshRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * TOTAL_AREA
      pos[i3 + 1] = (Math.random() - 0.5) * TOTAL_AREA * 0.7
      pos[i3 + 2] = (Math.random() - 0.5) * 5
      vel[i3] = (Math.random() - 0.5) * 0.003
      vel[i3 + 1] = (Math.random() - 0.5) * 0.003
      vel[i3 + 2] = (Math.random() - 0.5) * 0.001
    }
    return { positions: pos, velocities: vel }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    mouse.current.x += (target.current.x - mouse.current.x) * 0.03
    mouse.current.y += (target.current.y - mouse.current.y) * 0.03

    if (!meshRef.current || !linesRef.current) return

    const posAttr = meshRef.current.geometry.attributes.position
    const posArr = posAttr.array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      posArr[i3] += velocities[i3]
      posArr[i3 + 1] += velocities[i3 + 1]
      posArr[i3 + 2] += velocities[i3 + 2]

      const bx = TOTAL_AREA / 2
      const by = TOTAL_AREA * 0.7 / 2
      if (Math.abs(posArr[i3]) > bx) velocities[i3] *= -1
      if (Math.abs(posArr[i3 + 1]) > by) velocities[i3 + 1] *= -1
      if (Math.abs(posArr[i3 + 2]) > 2.5) velocities[i3 + 2] *= -1
    }
    posAttr.needsUpdate = true

    const linePositions: number[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const j3 = j * 3
        const dx = posArr[i3] - posArr[j3]
        const dy = posArr[i3 + 1] - posArr[j3 + 1]
        const dz = posArr[i3 + 2] - posArr[j3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < CONNECT_DIST) {
          linePositions.push(posArr[i3], posArr[i3 + 1], posArr[i3 + 2])
          linePositions.push(posArr[j3], posArr[j3 + 1], posArr[j3 + 2])
        }
      }
    }

    const lineGeom = linesRef.current.geometry
    lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    lineGeom.setDrawRange(0, linePositions.length / 3)

    meshRef.current.rotation.y = Math.sin(t * 0.12) * 0.15 + mouse.current.x * 0.25
    meshRef.current.rotation.x = Math.cos(t * 0.15) * 0.08 + mouse.current.y * 0.15
    linesRef.current.rotation.y = meshRef.current.rotation.y
    linesRef.current.rotation.x = meshRef.current.rotation.x
  })

  const dotMaterial = useMemo(() => (
    <pointsMaterial
      color="#3b82f6"
      size={0.1}
      sizeAttenuation
      depthWrite={false}
      blending={THREE.NormalBlending}
      opacity={0.7}
      transparent
    />
  ), [])

  const lineMaterial = useMemo(() => (
    <lineBasicMaterial
      color="#93c5fd"
      depthWrite={false}
      blending={THREE.NormalBlending}
      opacity={0.35}
      transparent
    />
  ), [])

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        {dotMaterial}
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        {lineMaterial}
      </lineSegments>
    </>
  )
}

export default function ParticleCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6] }}
      aria-hidden="true"
      gl={{ alpha: true }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <ParticleWeb />
    </Canvas>
  )
}
