import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial color="yellow" />
      <pointLight intensity={1.5} distance={50} decay={2} />
    </mesh>
  )
}

export default Sun