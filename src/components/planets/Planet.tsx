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

const Planet = ({ name, radius, semiMajorAxis, eccentricity, rotationSpeed, orbitSpeed, textureMap, isDynamic, speed, description, onFocus, isFocused, cameraRef, orbitRadius }: PlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, textureMap)
  const [hovered, setHovered] = useState(false)
  const { camera } = useThree()

  // Add a ref to store the last logged time
  const lastLogTime = useRef(0)

  useFrame((_, delta) => {
    if (planetRef.current) {
      // Always rotate the planet, regardless of focus state
      planetRef.current.rotation.y += rotationSpeed * delta * speed

      if (isDynamic) {
        // Rotate around its own axis
        planetRef.current.rotation.y += rotationSpeed * delta * speed

        // Use orbitSpeed to calculate the change in angle
        const angleChange = orbitSpeed * delta * speed

        // Update the current angle
        planetRef.current.userData.angle = (planetRef.current.userData.angle + angleChange) % (2 * Math.PI)

        // Calculate new position using the updated angle
        const r = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(planetRef.current.userData.angle))
        planetRef.current.position.x = r * Math.cos(planetRef.current.userData.angle)
        planetRef.current.position.z = r * Math.sin(planetRef.current.userData.angle)

        // Calculate orbital velocity (you may want to adjust this calculation)
        const orbitalVelocity = orbitSpeed * semiMajorAxis

        // Log orbital speed only for Mercury every 2 seconds
        if (Date.now() - lastLogTime.current > 2000) {
          console.log(`${name} orbital speed:`, orbitalVelocity.toFixed(4))
          lastLogTime.current = Date.now()
        }

        // Update camera position if this planet is focused
        if (isFocused && cameraRef.current) {
          // Calculate the direction from the Sun to the planet
          const sunToPlanet = planetRef.current.position.clone().normalize()
          
          // Calculate the camera position opposite to the Sun
          const cameraDistance = radius * 3 // Adjust this multiplier to change how close the camera is
          const cameraPosition = planetRef.current.position.clone().add(sunToPlanet.multiplyScalar(cameraDistance))

          // Set camera position and make it look at the planet
          cameraRef.current.position.copy(cameraPosition)
          cameraRef.current.lookAt(planetRef.current.position)

          // Rotate the camera around the planet
          const time = Date.now() * 0.001 // Current time in seconds
          const rotationSpeed = 0.5 // Adjust this value to change the rotation speed
          const rotationRadius = radius * 5 // Adjust this value to change the rotation radius

          cameraRef.current.position.x += Math.cos(time * rotationSpeed) * rotationRadius
          cameraRef.current.position.z += Math.sin(time * rotationSpeed) * rotationRadius

          // Ensure the camera always looks at the planet
          cameraRef.current.lookAt(planetRef.current.position)
        }
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