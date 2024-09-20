import { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

export interface PlanetProps {
  name: string
  radius: number
  orbitRadius: number
  rotationSpeed: number
  orbitSpeed: number
  textureMap: string
  isDynamic: boolean
  speed: number
}

const Planet = ({  radius, orbitRadius, rotationSpeed, orbitSpeed, textureMap, isDynamic, speed }: PlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, textureMap)

  useFrame((_, delta) => {
    if (isDynamic && planetRef.current) {
      // Rotate around its own axis
      planetRef.current.rotation.y += rotationSpeed * delta * speed

      // Orbit around the sun
      const angle = planetRef.current.userData.angle + orbitSpeed * delta * speed
      planetRef.current.position.x = Math.cos(angle) * orbitRadius
      planetRef.current.position.z = Math.sin(angle) * orbitRadius
      planetRef.current.userData.angle = angle
    }
  })

  useEffect(() => {
    if (planetRef.current) {
      planetRef.current.userData.angle = Math.random() * Math.PI * 2 // Random starting position
    }
  }, [])

  return (
    <mesh ref={planetRef} position={[orbitRadius, 0, 0]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default Planet