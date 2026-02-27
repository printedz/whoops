import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingParticles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      sizes[i] = Math.random() * 3 + 1
    }
    return { positions, sizes }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    mesh.current.rotation.y = time * 0.02
    mesh.current.rotation.x = Math.sin(time * 0.01) * 0.1
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posArray[i3 + 1] += Math.sin(time * 0.5 + i * 0.1) * 0.002
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particles.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c8956c"
        size={0.06}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function GlowingSphere() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    mesh.current.scale.setScalar(1 + Math.sin(time * 0.8) * 0.05)
    mesh.current.rotation.y = time * 0.1
  })

  return (
    <mesh ref={mesh} position={[0, 0, -3]}>
      <icosahedronGeometry args={[2.5, 1]} />
      <meshBasicMaterial
        color="#2a5a6a"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  )
}

function FloatingRings() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const time = state.clock.elapsedTime
    group.current.rotation.z = time * 0.05
    group.current.rotation.x = Math.sin(time * 0.3) * 0.2
  })

  return (
    <group ref={group} position={[0, 0, -2]}>
      {[1.8, 2.4, 3.0].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI * 0.3 * i, 0, 0]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshBasicMaterial
            color="#c8956c"
            transparent
            opacity={0.2 - i * 0.05}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <FloatingParticles />
      <GlowingSphere />
      <FloatingRings />
    </Canvas>
  )
}
