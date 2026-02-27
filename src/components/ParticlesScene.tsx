import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function RisingParticles({ count = 80 }) {
  const mesh = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posArray[i3 + 1] += 0.005
      posArray[i3] += Math.sin(time + i) * 0.002
      if (posArray[i3 + 1] > 4) posArray[i3 + 1] = -4
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function ParticlesScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <RisingParticles />
    </Canvas>
  )
}
