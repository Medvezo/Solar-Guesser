import * as THREE from 'three'
import { Line } from '@react-three/drei'

const OrbitLine = () => {
  const points = []
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * 10, 0, Math.sin(angle) * 10))
  }

  return (
    <Line points={points} color="white" opacity={0.5} transparent />
  )
}

export default OrbitLine