import * as THREE from 'three'
import { Line } from '@react-three/drei'

interface OrbitLineProps {
  semiMajorAxis: number
  eccentricity: number
}

const OrbitLine = ({ semiMajorAxis, eccentricity }: OrbitLineProps) => {
  const points = []
  const segments = 64

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const r = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle))
    points.push(new THREE.Vector3(r * Math.cos(angle), 0, r * Math.sin(angle)))
  }

  return (
    <Line points={points} color="white" opacity={0.2} transparent />
  )
}

export default OrbitLine