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

const Planet = ({ name, radius, semiMajorAxis, eccentricity, rotationSpeed, orbitRadius, textureMap, isDynamic, speed, description, onFocus, isFocused, cameraRef }: PlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, textureMap)
  const [hovered, setHovered] = useState(false)
  const { camera } = useThree()

  // Add a ref to store the last logged time
  const lastLogTime = useRef(0)

  useFrame((_, delta) => {
    if (isDynamic && planetRef.current) {
      // Rotate around its own axis
      planetRef.current.rotation.y += rotationSpeed * delta * speed

      // Calculate orbital period using a simplified version of Kepler's Third Law
      const orbitalPeriod = Math.sqrt(semiMajorAxis * semiMajorAxis * semiMajorAxis) * 10

      // Calculate current true anomaly (angle from perihelion)
      const meanAnomaly = (planetRef.current.userData.angle + delta * speed * 2 * Math.PI / orbitalPeriod) % (2 * Math.PI)
      
      // Solve Kepler's equation to get eccentric anomaly (simplified approximation)
      let E = meanAnomaly
      for (let i = 0; i < 5; i++) {
        E = meanAnomaly + eccentricity * Math.sin(E)
      }

      // Calculate true anomaly
      const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(E / 2))

      // Calculate radius using the polar equation of an ellipse
      const r = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(trueAnomaly))

      // Calculate new position
      planetRef.current.position.x = r * Math.cos(trueAnomaly)
      planetRef.current.position.z = r * Math.sin(trueAnomaly)

      // Calculate orbital velocity
      const orbitalVelocity = Math.sqrt(2 / r - 1 / semiMajorAxis)

      // Log orbital speed only for Mercury every 2 seconds
      if (name === 'Mercury' && Date.now() - lastLogTime.current > 2000) {
        console.log(`Mercury orbital speed: ${orbitalVelocity.toFixed(4)}`)
        lastLogTime.current = Date.now()
      }

      // Update angle for next frame
      planetRef.current.userData.angle = meanAnomaly

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