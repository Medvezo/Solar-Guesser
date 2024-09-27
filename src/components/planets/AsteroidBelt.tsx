import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AsteroidBelt = () => {
  const asteroids = useMemo(() => {
    const temp = [];
    const numAsteroids = 2000;
    const innerRadius = 30; // Increased from Mars' orbit
    const outerRadius = 70; // Decreased from Jupiter's orbit

    for (let i = 0; i < numAsteroids; i++) {
      const radius = Math.random() * (outerRadius - innerRadius) + innerRadius;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 1; // Further reduced vertical spread
      const size = Math.random() * 0.15 + 0.05; // Slightly smaller asteroid size
      temp.push({ position: new THREE.Vector3(x, y, z), size, speed: Math.random() * 0.0001 + 0.00005 });
    }
    return temp;
  }, []);

  const asteroidsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (asteroidsRef.current) {
      asteroidsRef.current.children.forEach((asteroid, index) => {
        const { position, speed } = asteroids[index];
        const angle = Math.atan2(position.z, position.x) + speed * delta;
        const radius = position.length();
        asteroid.position.x = Math.cos(angle) * radius;
        asteroid.position.z = Math.sin(angle) * radius;
      });
    }
  });

  return (
    <group ref={asteroidsRef}>
      {asteroids.map((asteroid, i) => (
        <mesh key={i} position={asteroid.position} scale={asteroid.size}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#888888" 
            emissive="#444444"
            emissiveIntensity={0.5}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

export default AsteroidBelt;