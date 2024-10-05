import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface AsteroidProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color?: string;
  speed?: number;
  semiMajorAxis: number;
  eccentricity: number;
  onFocus: (name: string, description: string, ref: THREE.Mesh) => void;
  isFocused: boolean;
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
}

const Asteroid: React.FC<AsteroidProps> = ({ 
  position, 
  rotation, 
  scale, 
  color = '#8B7D6B', 
  speed = 1, 
  semiMajorAxis, 
  eccentricity, 
  onFocus,
  isFocused,
  cameraRef
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  // Set initial orbit angle
  const orbitAngle = useMemo(() => Math.random() * Math.PI * 0.2, []); // Random angle up to 36 degrees

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

  // Create a reference for the thrust particles
  const particlesRef = useRef<THREE.Points>(null);

  // Generate particles for the thrust effect
  const particles = useMemo(() => {
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 0.5;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i3 + 2] = Math.random() * -2 - 1; // Extend behind the asteroid

      colors[i3] = 1;
      colors[i3 + 1] = 0.5 + Math.random() * 0.5;
      colors[i3 + 2] = 0;
    }

    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Update thrust particles
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 2] += delta * speed * 2;
          if (positions[i + 2] > 0) {
            positions[i + 2] = -2 - Math.random();
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
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

  const prevPosition = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());

  // Create a reference for the backthrust particles
  const backThrustRef = useRef<THREE.Points>(null);

  // Generate particles for the backthrust effect
  const backThrustParticles = useMemo(() => {
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 0.5;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i3 + 2] = Math.random() * -2 - 1; // Extend behind the asteroid

      // Set all color components to 1 (white)
      colors[i3] = 1;
      colors[i3 + 1] = 1;
      colors[i3 + 2] = 1;
    }

    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current && backThrustRef.current) {
      // Update asteroid position and rotation
      // ... existing asteroid update code ...

      // Calculate velocity
      velocity.current.subVectors(meshRef.current.position, prevPosition.current);
      velocity.current.multiplyScalar(1 / delta);

      // Update prevPosition for next frame
      prevPosition.current.copy(meshRef.current.position);

      // Update backthrust effect
      backThrustRef.current.position.copy(meshRef.current.position);
      
      // Align backthrust with opposite of velocity direction
      if (velocity.current.lengthSq() > 0.0001) {
        backThrustRef.current.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 0, -1),
          velocity.current.clone().negate().normalize()
        );
      }

      // Scale backthrust based on velocity magnitude
      const speed = velocity.current.length();
      const maxSpeed = 10; // Adjust this value based on your asteroid's typical speed
      const scale = THREE.MathUtils.clamp(speed / maxSpeed, 0.1, 1);
      backThrustRef.current.scale.set(scale, scale, scale);

      // Update particle positions
      const positions = backThrustRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += delta * speed * 2;
        if (positions[i + 2] > 0) {
          positions[i + 2] = -2 - Math.random();
        }
      }
      backThrustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
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
      <points ref={particlesRef} scale={scale}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <points ref={backThrustRef} scale={scale}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={backThrustParticles.positions.length / 3}
            array={backThrustParticles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={backThrustParticles.colors.length / 3}
            array={backThrustParticles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          color="white"
        />
      </points>
    </>
  );
  
};

export default Asteroid;