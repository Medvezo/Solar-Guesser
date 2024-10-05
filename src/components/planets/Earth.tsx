import { forwardRef, useRef, useImperativeHandle, useEffect, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from '@react-three/drei';

interface EarthProps {
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
}

const Earth = forwardRef<THREE.Mesh, EarthProps>(
	({ name, radius, semiMajorAxis, eccentricity, rotationSpeed, orbitRadius, isDynamic, speed, description, onFocus, isFocused, cameraRef }, ref) => {
		const earthRef = useRef<THREE.Mesh>(null);
		const cloudsRef = useRef<THREE.Mesh>(null);
		const [hovered, setHovered] = useState(false);
		const { camera } = useThree();

		useImperativeHandle(ref, () => earthRef.current!);

		const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(THREE.TextureLoader, [
			"/textures/earth_daymap.jpg",
			"/textures/earth_normal_map.jpg",
			"/textures/earth_specular_map.jpg",
			"/textures/earth_clouds.jpg",
		]);

		useEffect(() => {
			if (earthRef.current) {
				earthRef.current.userData.angle = Math.random() * Math.PI * 2; // Random starting position
			}
		}, []);

		useFrame((_, delta) => {
			if (isDynamic && earthRef.current) {
				// Rotate around its own axis
				earthRef.current.rotation.y += rotationSpeed * delta * speed;

				// Calculate orbital period using a simplified version of Kepler's Third Law
				const orbitalPeriod = Math.sqrt(semiMajorAxis * semiMajorAxis * semiMajorAxis) * 10;

				// Calculate current true anomaly (angle from perihelion)
				const meanAnomaly = (earthRef.current.userData.angle + delta * speed * 2 * Math.PI / orbitalPeriod) % (2 * Math.PI);
				
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
				earthRef.current.position.x = r * Math.cos(trueAnomaly);
				earthRef.current.position.z = r * Math.sin(trueAnomaly);

				// Update angle for next frame
				earthRef.current.userData.angle = meanAnomaly;

				// Update clouds position and rotation
				if (cloudsRef.current) {
					cloudsRef.current.rotation.y += delta * speed * 0.75;
					cloudsRef.current.position.copy(earthRef.current.position);
				}

				// Update camera position if this planet is focused
				if (isFocused && cameraRef.current) {
					// Calculate the direction from the Sun to Earth
					const sunToEarth = earthRef.current.position.clone().normalize()
					
					// Calculate the camera position opposite to the Sun
					const cameraDistance = radius * 5 // Adjust this multiplier to change how close the camera is
					const cameraPosition = earthRef.current.position.clone().add(sunToEarth.multiplyScalar(cameraDistance))

					// Set camera position and make it look at Earth
					cameraRef.current.position.copy(cameraPosition)
					cameraRef.current.lookAt(earthRef.current.position)

					// Rotate the camera around Earth
					const time = Date.now() * 0.001 // Current time in seconds
					const rotationSpeed = 0.5 // Adjust this value to change the rotation speed
					const rotationRadius = radius * 1.5 // Adjust this value to change the rotation radius

					cameraRef.current.position.x += Math.cos(time * rotationSpeed) * rotationRadius
					cameraRef.current.position.z += Math.sin(time * rotationSpeed) * rotationRadius

					// Ensure the camera always looks at Earth
					cameraRef.current.lookAt(earthRef.current.position)
				}
			}
		});

		const handleClick = () => {
			if (earthRef.current) {
				const position = new THREE.Vector3();
				earthRef.current.getWorldPosition(position);
				
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
						onFocus(name, description, earthRef.current!);
					}
				};

				requestAnimationFrame(animateCamera);
			}
		};

		return (
			<group>
				<mesh 
					ref={earthRef}
					position={[orbitRadius, 0, 0]}
					onPointerOver={() => setHovered(true)}
					onPointerOut={() => setHovered(false)}
					onClick={handleClick}
				>
					<sphereGeometry args={[radius, 64, 64]} />
					<meshPhongMaterial
						map={colorMap}
						normalMap={normalMap}
						specularMap={specularMap}
						shininess={5}
					/>
				</mesh>
				<mesh ref={cloudsRef} position={[orbitRadius, 0, 0]}>
					<sphereGeometry args={[radius * 1.02, 64, 64]} />
					<meshPhongMaterial
						map={cloudsMap}
						transparent={true}
						opacity={0.8}
						depthWrite={false}
						side={THREE.DoubleSide}
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

export default Earth;
