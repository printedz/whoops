import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingParticles({ count = 300, mouse }: { count?: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.Points>(null)

  const { positions, basePositions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const basePositions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 8
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      basePositions[i * 3] = positions[i * 3]
      basePositions[i * 3 + 1] = positions[i * 3 + 1]
      basePositions[i * 3 + 2] = positions[i * 3 + 2]
      speeds[i] = 0.2 + Math.random() * 0.8
    }
    return { positions, basePositions, speeds }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    const mx = mouse.current.x * 0.5
    const my = mouse.current.y * 0.5
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const speed = speeds[i]
      posArray[i3] = basePositions[i3] + Math.sin(time * 0.3 * speed + i) * 0.4 + mx * 0.3
      posArray[i3 + 1] = basePositions[i3 + 1] + Math.cos(time * 0.2 * speed + i * 0.5) * 0.4 + my * 0.3
      posArray[i3 + 2] = basePositions[i3 + 2] + Math.sin(time * 0.15 * speed + i * 0.3) * 0.3
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = time * 0.015 + mx * 0.1
    mesh.current.rotation.x = my * 0.1
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d4a373"
        size={0.045}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function CoreSphere({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    mesh.current.rotation.x = time * 0.08 + mouse.current.y * 0.2
    mesh.current.rotation.y = time * 0.12 + mouse.current.x * 0.2
    mesh.current.scale.setScalar(1 + Math.sin(time * 0.6) * 0.04)
  })

  return (
    <mesh ref={mesh} position={[0, 0, -1]}>
      <icosahedronGeometry args={[2.2, 2]} />
      <meshBasicMaterial
        color="#4a90a8"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  )
}

function OrbitalRings({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const time = state.clock.elapsedTime
    group.current.rotation.z = time * 0.03
    group.current.rotation.x = 0.4 + Math.sin(time * 0.2) * 0.1 + mouse.current.y * 0.15
    group.current.rotation.y = mouse.current.x * 0.15
  })

  return (
    <group ref={group} position={[0, 0, -1]}>
      {[2.0, 2.8, 3.6].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI * 0.2 * i, Math.PI * 0.15 * i, 0]}>
          <torusGeometry args={[radius, 0.008, 16, 120]} />
          <meshBasicMaterial
            color={i === 1 ? '#d4a373' : '#6ab0c8'}
            transparent
            opacity={0.18 - i * 0.04}
          />
        </mesh>
      ))}
    </group>
  )
}

function InnerGlow() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    mesh.current.scale.setScalar(1 + Math.sin(time * 0.4) * 0.15)
    const mat = mesh.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.03 + Math.sin(time * 0.5) * 0.015
  })

  return (
    <mesh ref={mesh} position={[0, 0, -2]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#d4a373" transparent opacity={0.04} />
    </mesh>
  )
}

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <FloatingParticles mouse={mouse} />
      <CoreSphere mouse={mouse} />
      <OrbitalRings mouse={mouse} />
      <InnerGlow />
    </>
  )
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
  }, [])

  return (
    <div onMouseMove={handleMouseMove} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}
