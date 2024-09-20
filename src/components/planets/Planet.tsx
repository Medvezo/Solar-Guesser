import { useRef, useEffect, useState } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'

export interface PlanetProps {
  name: string
  radius: number
  orbitRadius: number
  rotationSpeed: number
  orbitSpeed: number
  textureMap: string
  isDynamic: boolean
  speed: number
  description: string
  onFocus: (name: string, description: string) => void
}

const Planet = ({ name, radius, orbitRadius, rotationSpeed, orbitSpeed, textureMap, isDynamic, speed, description, onFocus }: PlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, textureMap)
  const [hovered, setHovered] = useState(false)
  const { camera } = useThree()

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

  const handleClick = () => {
    if (planetRef.current) {
      const position = new THREE.Vector3()
      planetRef.current.getWorldPosition(position)
      camera.position.set(position.x, position.y + radius * 2, position.z + radius * 5)
      camera.lookAt(position)
      onFocus(name, description)
    }
  }

  return (
    <mesh 
      ref={planetRef} 
      position={[orbitRadius, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={texture} />
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black bg-opacity-50 text-white p-2 rounded">
            {name}
          </div>
        </Html>
      )}
    </mesh>
  )
}

export default Planet