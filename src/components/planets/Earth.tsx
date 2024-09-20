import { forwardRef, useRef, useImperativeHandle } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface EarthProps {
	isDynamic: boolean;
	speed: number;
}

const Earth = forwardRef<THREE.Mesh, EarthProps>(
	({ isDynamic, speed }, ref) => {
		const earthRef = useRef<THREE.Mesh>(null);

		useImperativeHandle(ref, () => earthRef.current!);

		const [colorMap, normalMap, specularMap] = useLoader(THREE.TextureLoader, [
			"/textures/earth_daymap.jpg",
			"/textures/earth_normal_map.jpg",
			"/textures/earth_specular_map.jpg",
		]);

		useFrame((_, delta) => {
			if (isDynamic && earthRef.current) {
				earthRef.current.rotation.y += delta * speed * 0.5;
				earthRef.current.position.x =
					Math.cos(earthRef.current.rotation.y) * 10;
				earthRef.current.position.z =
					Math.sin(earthRef.current.rotation.y) * 10;
			}
		});

		return (
			<mesh ref={earthRef} position={[10, 0, 0]}>
				<sphereGeometry args={[1, 32, 32]} />
				<meshPhongMaterial
					map={colorMap}
					normalMap={normalMap}
					specularMap={specularMap}
					shininess={5}
				/>
			</mesh>
		);
	}
);

export default Earth;
