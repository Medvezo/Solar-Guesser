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
      const semiMajorAxis = Math.random() * (outerRadius - innerRadius) + innerRadius;
      const eccentricity = Math.random() * 0.1; // Low eccentricity for mostly circular orbits
      const angle = Math.random() * Math.PI * 2;
      const perihelion = semiMajorAxis * (1 - eccentricity);
      const aphelion = semiMajorAxis * (1 + eccentricity);
      const y = (Math.random() - 0.5) * 1; // Further reduced vertical spread
      const size = Math.random() * 0.15 + 0.05; // Slightly smaller asteroid size
      temp.push({ 
        semiMajorAxis,
        eccentricity,
        angle,
        perihelion,
        aphelion,
        y,
        size
      });
    }
    return temp;
  }, []);

  const asteroidsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (asteroidsRef.current) {
      asteroidsRef.current.children.forEach((asteroid, index) => {
        const { semiMajorAxis, eccentricity, angle, perihelion, aphelion, y } = asteroids[index];
        
        // Calculate orbital period (in arbitrary units)
        const period = Math.sqrt(semiMajorAxis * semiMajorAxis * semiMajorAxis);
        
        // Update angle based on orbital period
        const newAngle = (angle + (2 * Math.PI / period) * delta) % (2 * Math.PI);
        asteroids[index].angle = newAngle;
        
        // Calculate radius using polar equation of an ellipse
        const radius = (semiMajorAxis * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(newAngle));
        
        // Calculate new position
        const x = Math.cos(newAngle) * radius;
        const z = Math.sin(newAngle) * radius;
        
        // Update asteroid position
        asteroid.position.set(x, y, z);
        
        // Calculate and apply scale based on distance (optional, for visual effect)
        const distanceScale = 1 - (radius - perihelion) / (aphelion - perihelion) * 0.5;
        asteroid.scale.setScalar(asteroids[index].size * distanceScale);
      });
    }
  });

  return (
    <group ref={asteroidsRef}>
      {asteroids.map((asteroid, i) => (
        <mesh key={i} position={[asteroid.perihelion, asteroid.y, 0]} scale={asteroid.size}>
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