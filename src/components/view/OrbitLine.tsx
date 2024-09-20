import * as THREE from 'three'
import { Line } from '@react-three/drei'

interface OrbitLineProps {
  radius: number
}

const OrbitLine = ({ radius }: OrbitLineProps) => {
  const points = []
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
  }

  return (
    <Line points={points} color="white" opacity={0.2} transparent />
  )
}

export default OrbitLine