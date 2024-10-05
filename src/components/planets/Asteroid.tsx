import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, Line } from '@react-three/drei';

interface AsteroidProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color?: string;
  speed: number;
  semiMajorAxis: number;
  eccentricity: number;
  orbitAngle: number;
  onFocus: (name: string, description: string, ref: THREE.Mesh) => void;
  isFocused: boolean;
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
}

const Asteroid: React.FC<AsteroidProps> = ({ 
  position, 
  rotation, 
  scale, 
  color = '#8B7D6B', 
  speed, 
  semiMajorAxis, 
  eccentricity, 
  orbitAngle,
  onFocus,
  isFocused,
  cameraRef
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.orbitAngle = orbitAngle;
    }
  }, [orbitAngle]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Rotate the asteroid
      meshRef.current.rotation.x += 0.01 * speed * delta;
      meshRef.current.rotation.y += 0.005 * speed * delta;
      meshRef.current.rotation.z += 0.007 * speed * delta;

      // Update orbital position
      const angle = (meshRef.current.userData.angle || 0) + speed * delta * 0.1;
      meshRef.current.userData.angle = angle % (Math.PI * 2);

      const r = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle));
      
      // Calculate position with Z dimension movement and apply the orbit angle
      const zAmplitude = semiMajorAxis * 0.1;
      const x = r * Math.cos(angle);
      const y = zAmplitude * Math.sin(angle * 2);
      const z = r * Math.sin(angle);

      // Apply the same rotation as the orbit line
      const rotationMatrix = new THREE.Matrix4().makeRotationX(meshRef.current.userData.orbitAngle || 0);
      const position = new THREE.Vector3(x, y, z).applyMatrix4(rotationMatrix);

      meshRef.current.position.copy(position);

      // Update asteroid's rotation
      meshRef.current.rotation.y = angle;

      // Update camera if focused
      if (isFocused && cameraRef.current) {
        const cameraOffset = new THREE.Vector3(scale * 50, scale * 20, scale * 50);
        const newCameraPosition = meshRef.current.position.clone().add(cameraOffset);
        cameraRef.current.position.copy(newCameraPosition);
        cameraRef.current.lookAt(meshRef.current.position);
      }
    }
  });

  const handleClick = () => {
    if (meshRef.current) {
      const position = new THREE.Vector3();
      meshRef.current.getWorldPosition(position);
      
      const cameraOffset = new THREE.Vector3(scale * 50, scale * 20, scale * 50);
      const cameraPosition = position.clone().add(cameraOffset);
      
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
          onFocus("Asteroid", "A small rocky body orbiting the sun", meshRef.current!);
        }
      };

      requestAnimationFrame(animateCamera);
    }
  };

  // Generate orbit line points with angle
  const orbitPoints = useMemo(() => {
    const points = [];
    const segments = 64;
    const angle = Math.random() * Math.PI * 0.2; // Random angle up to 36 degrees
    const rotationMatrix = new THREE.Matrix4().makeRotationX(angle);

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const r = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(t));
      const x = r * Math.cos(t);
      const z = r * Math.sin(t);
      const point = new THREE.Vector3(x, 0, z).applyMatrix4(rotationMatrix);
      points.push(point);
    }
    return points;
  }, [semiMajorAxis, eccentricity]);

  return (
    <>
      <Line points={orbitPoints} color="white" opacity={0.1} transparent lineWidth={0.5} /> {/* Thinner and more transparent line */}
      <mesh 
        ref={meshRef} 
        position={position} 
        rotation={rotation} 
        scale={[scale, scale, scale]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />
        {hovered && (
          <Html distanceFactor={10}>
            <div className="bg-black bg-opacity-50 text-white p-2 rounded">
              Asteroid
            </div>
          </Html>
        )}
      </mesh>
    </>
  );
};

export default Asteroid;