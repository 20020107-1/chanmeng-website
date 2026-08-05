'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function createMountainGeometry(width: number, depth: number, offset: number, seed: number) {
  const xSegments = 72
  const zSegments = 24
  const vertices: number[] = []
  const indices: number[] = []

  for (let zi = 0; zi <= zSegments; zi++) {
    const z = (zi / zSegments - 0.5) * depth
    const depthFade = Math.pow(1 - Math.abs(z / (depth * 0.58)), 1.45)
    for (let xi = 0; xi <= xSegments; xi++) {
      const x = (xi / xSegments - 0.5) * width
      const peakA = Math.exp(-Math.pow((x + 2.3 + offset) / 1.5, 2)) * 2.5
      const peakB = Math.exp(-Math.pow((x - 1.6 + offset * 0.4) / 1.25, 2)) * 3.5
      const peakC = Math.exp(-Math.pow((x - 4.6 - offset) / 1.8, 2)) * 1.65
      const brush = Math.sin(x * 2.15 + seed) * 0.12 + Math.sin(x * 5.1 - seed) * 0.045
      const y = -1.7 + Math.max(0, peakA + peakB + peakC + brush) * Math.max(0.05, depthFade)
      vertices.push(x, y, z)
    }
  }

  for (let zi = 0; zi < zSegments; zi++) {
    for (let xi = 0; xi < xSegments; xi++) {
      const a = zi * (xSegments + 1) + xi
      const b = a + 1
      const c = a + xSegments + 1
      const d = c + 1
      indices.push(a, c, b, b, c, d)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function Mountain({ z, opacity, color, offset, seed, scale = 1 }: {
  z: number
  opacity: number
  color: string
  offset: number
  seed: number
  scale?: number
}) {
  const geometry = useMemo(() => createMountainGeometry(16, 4.8, offset, seed), [offset, seed])
  return (
    <mesh geometry={geometry} position={[0, -0.35, z]} scale={scale}>
      <meshStandardMaterial
        color={color}
        roughness={1}
        metalness={0}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function Mist() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const values = new Float32Array(150 * 3)
    for (let i = 0; i < 150; i++) {
      values[i * 3] = (Math.random() - 0.5) * 17
      values[i * 3 + 1] = -1.2 + Math.random() * 2.7
      values[i * 3 + 2] = (Math.random() - 0.5) * 7
    }
    return values
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.06) * 0.035
    ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.09) * 0.18
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c8b89b" size={0.11} opacity={0.16} transparent depthWrite={false} />
    </points>
  )
}

function InkLandscape() {
  const group = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const { camera } = useThree()

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state) => {
    if (!group.current) return
    current.current.x += (target.current.x - current.current.x) * 0.025
    current.current.y += (target.current.y - current.current.y) * 0.025
    group.current.rotation.y = current.current.x * 0.055
    group.current.rotation.x = -current.current.y * 0.018
    group.current.position.x = current.current.x * 0.2
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.14) * 0.035
    camera.position.x = current.current.x * 0.18
    camera.position.y = 2.1 - current.current.y * 0.1
    camera.lookAt(0, -0.2, 0)
  })

  return (
    <>
      <fog attach="fog" args={['#f8f5ed', 7.5, 15]} />
      <ambientLight intensity={2.15} color="#fff9ec" />
      <directionalLight position={[-4, 7, 6]} intensity={2.1} color="#f1d5a4" />
      <directionalLight position={[5, 3, 2]} intensity={1.1} color="#c7b69a" />
      <group ref={group} position={[2.7, 0.1, 0]}>
        <Mountain z={-3.3} opacity={0.08} color="#afa596" offset={1.8} seed={1} scale={1.15} />
        <Mountain z={-1.6} opacity={0.18} color="#82796d" offset={-1.1} seed={2.5} scale={1.05} />
        <Mountain z={0.15} opacity={0.48} color="#3d3933" offset={0} seed={4.2} />
        <Mist />
        <mesh position={[1.3, 1.45, -0.8]} rotation={[0, 0, -0.12]}>
          <torusGeometry args={[2.35, 0.085, 12, 100, Math.PI * 1.55]} />
          <meshStandardMaterial color="#b58a4a" roughness={0.7} transparent opacity={0.72} />
        </mesh>
      </group>
    </>
  )
}

export default function ParticleCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2.1, 9], fov: 42 }}
      aria-hidden="true"
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <InkLandscape />
    </Canvas>
  )
}
