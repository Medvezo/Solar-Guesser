import { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from '@react-three/drei';

interface SaturnProps {
	name: string;
	radius: number;
	semiMajorAxis: number;
	eccentricity: number;
	rotationSpeed: number;
	orbitRadius: number;
	isDynamic: boolean;
	speed: number;
	description: string;
	onFocus: (name: string, description: string, ref: THREE.Mesh) => void;
	isFocused: boolean;
	cameraRef: React.RefObject<THREE.PerspectiveCamera>;
	textureMap: string;
	ringTexture: string;
}

const Saturn = forwardRef<THREE.Mesh, SaturnProps>(
	({ name, radius, semiMajorAxis, eccentricity, rotationSpeed, orbitRadius, isDynamic, speed, description, onFocus, isFocused, cameraRef, textureMap, ringTexture }, ref) => {
		const saturnRef = useRef<THREE.Mesh>(null);
		const ringRef = useRef<THREE.Mesh>(null);
		const [hovered, setHovered] = useState(false);
		const { camera } = useThree();

		useImperativeHandle(ref, () => saturnRef.current!);

		const [saturnTexture, saturnRingTexture] = useLoader(THREE.TextureLoader, [textureMap, ringTexture]);

		useEffect(() => {
			if (saturnRef.current) {
				saturnRef.current.userData.angle = Math.random() * Math.PI * 2; // Random starting position
			}
		}, []);

		useFrame((_, delta) => {
			if (isDynamic && saturnRef.current && ringRef.current) {
				// Rotate Saturn around its own axis
				saturnRef.current.rotation.y += rotationSpeed * delta * speed;

				// Calculate orbital period using a simplified version of Kepler's Third Law
				const orbitalPeriod = Math.sqrt(semiMajorAxis * semiMajorAxis * semiMajorAxis) * 10;

				// Calculate current true anomaly (angle from perihelion)
				const meanAnomaly = (saturnRef.current.userData.angle + delta * speed * 2 * Math.PI / orbitalPeriod) % (2 * Math.PI);
				
				// Solve Kepler's equation to get eccentric anomaly (simplified approximation)
				let E = meanAnomaly;
				for (let i = 0; i < 5; i++) {
					E = meanAnomaly + eccentricity * Math.sin(E);
				}

				// Calculate true anomaly
				const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(E / 2));

				// Calculate radius using the polar equation of an ellipse
				const r = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(trueAnomaly));

				// Calculate new position
				saturnRef.current.position.x = r * Math.cos(trueAnomaly);
				saturnRef.current.position.z = r * Math.sin(trueAnomaly);

				// Update angle for next frame
				saturnRef.current.userData.angle = meanAnomaly;

				// Update ring position and rotation
				ringRef.current.position.copy(saturnRef.current.position);
				// Remove the rotation of the ring
				// ringRef.current.rotation.y += rotationSpeed * delta * speed * 0.75;

				// Update camera position if this planet is focused
				if (isFocused && cameraRef.current) {
					// Calculate the direction from the Sun to Saturn
					const sunToSaturn = saturnRef.current.position.clone().normalize()
					
					// Calculate the camera position opposite to the Sun
					const cameraDistance = radius * 5 // Adjust this multiplier to change how close the camera is
					const cameraPosition = saturnRef.current.position.clone().add(sunToSaturn.multiplyScalar(cameraDistance))
					
					// Set camera position and make it look at Saturn
					cameraRef.current.position.copy(cameraPosition)
					cameraRef.current.lookAt(saturnRef.current.position)
					
					// Rotate the camera around Saturn
					const time = Date.now() * 0.001 // Current time in seconds
					const rotationSpeed = 0.2 // Adjust this value to change the rotation speed
					const rotationRadius = radius * 1.5 // Adjust this value to change the rotation radius

					cameraRef.current.position.x += Math.cos(time * rotationSpeed) * rotationRadius
					cameraRef.current.position.z += Math.sin(time * rotationSpeed) * rotationRadius

					// Ensure the camera always looks at Saturn
					cameraRef.current.lookAt(saturnRef.current.position)
				}
			}
		});

		const handleClick = () => {
			if (saturnRef.current) {
				const position = new THREE.Vector3();
				saturnRef.current.getWorldPosition(position);
				
				// Calculate a position slightly offset from the planet
				const cameraOffset = new THREE.Vector3(radius * 5, radius * 2, radius * 5);
				const cameraPosition = position.clone().add(cameraOffset);
				
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
						onFocus(name, description, saturnRef.current!);
					}
				};

				requestAnimationFrame(animateCamera);
			}
		};

		return (
			<group>
				<mesh 
					ref={saturnRef}
					position={[orbitRadius, 0, 0]}
					onPointerOver={() => setHovered(true)}
					onPointerOut={() => setHovered(false)}
					onClick={handleClick}
				>
					<sphereGeometry args={[radius, 64, 64]} />
					<meshStandardMaterial map={saturnTexture} />
				</mesh>
				<mesh ref={ringRef} position={[orbitRadius, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
					<ringGeometry args={[radius * 1.2, radius * 2, 64]} />
					<meshStandardMaterial 
						map={saturnRingTexture} 
						side={THREE.DoubleSide}
						transparent={true}
						opacity={0.8}
					/>
				</mesh>
				{hovered && (
					<Html distanceFactor={10}>
						<div className="bg-black bg-opacity-50 text-white p-2 rounded">
							{name}
						</div>
					</Html>
				)}
			</group>
		);
	}
);

export default Saturn;