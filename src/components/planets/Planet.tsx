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
  onFocus: (name: string, description: string, ref: THREE.Mesh) => void
  semiMajorAxis: number;
  eccentricity: number;
  isFocused: boolean;
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
}

const Planet = ({ name, radius, semiMajorAxis, eccentricity, rotationSpeed, orbitSpeed, orbitRadius, textureMap, isDynamic, speed, description, onFocus, isFocused, cameraRef }: PlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, textureMap)
  const [hovered, setHovered] = useState(false)
  const { camera } = useThree()

  useFrame((_, delta) => {
    if (isDynamic && planetRef.current) {
      // Rotate around its own axis
      planetRef.current.rotation.y += rotationSpeed * delta * speed

      // Calculate position on elliptical orbit
      const angle = planetRef.current.userData.angle + orbitSpeed * delta * speed
      const r = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle))
      
      // Calculate orbital velocity based on distance from Sun
      const orbitalVelocity = Math.sqrt((1 + eccentricity * Math.cos(angle)) / (1 - eccentricity * Math.cos(angle)))

      planetRef.current.position.x = r * Math.cos(angle)
      planetRef.current.position.z = r * Math.sin(angle)
      planetRef.current.userData.angle = angle

      // Apply orbital velocity to the angle change
      planetRef.current.userData.angle += orbitalVelocity * orbitSpeed * delta * speed

      // Update camera position if this planet is focused
      if (isFocused && cameraRef.current) {
        const cameraOffset = new THREE.Vector3(radius * 5, radius * 2, radius * 5)
        const newCameraPosition = planetRef.current.position.clone().add(cameraOffset)
        cameraRef.current.position.copy(newCameraPosition)
        cameraRef.current.lookAt(planetRef.current.position)
      }
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
      
      // Calculate a position slightly offset from the planet
      const cameraOffset = new THREE.Vector3(radius * 5, radius * 2, radius * 5)
      const cameraPosition = position.clone().add(cameraOffset)
      
      // Animate camera movement
      const duration = 1000; // 1 second
      const startPosition = camera.position.clone();
      const startRotation = camera.quaternion.clone();
      const endRotation = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(cameraPosition, position, new THREE.Vector3(0, 1, 0))
      );

      const animateCamera = (time: number) => {
        const alpha = Math.min(time / duration, 1);
        camera.position.lerpVectors(startPosition, cameraPosition, alpha);
        camera.quaternion.slerpQuaternions(startRotation, endRotation, alpha);
        
        if (alpha < 1) {
          requestAnimationFrame(animateCamera);
        } else {
          onFocus(name, description, planetRef.current!);
        }
      };

      requestAnimationFrame(animateCamera);
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