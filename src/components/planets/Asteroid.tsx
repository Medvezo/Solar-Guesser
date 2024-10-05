/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  semiMajorAxis: number;
  eccentricity: number;
  orbitAngle: number;
  onFocus: (name: string) => void;
  isFocused: boolean;
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
}

const Asteroid: React.FC<AsteroidProps> = ({ 
  position, 
  rotation, 
  scale, 
  speed, 
  semiMajorAxis, 
  eccentricity, 
  orbitAngle, 
  onFocus,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

   speed = speed/100000;
  useFrame((_, delta) => {
    if (meshRef.current) {
      const time = Date.now() * speed;
      const x = semiMajorAxis * Math.cos(time) * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(time));
      const z = semiMajorAxis * Math.sin(time) * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(time));
      meshRef.current.position.set(
        x * Math.cos(orbitAngle) - z * Math.sin(orbitAngle),
        position[1],
        x * Math.sin(orbitAngle) + z * Math.cos(orbitAngle)
      );
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
      onClick={() => onFocus('Asteroid')}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#8B4513" roughness={0.8} />
    </mesh>
  );
};

export default Asteroid;