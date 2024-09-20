import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { useState } from "react";

// Components
import Planet from "./components/planets/Planet";
import Sun from "./components/planets/Sun";
import OrbitLine from "./components/view/OrbitLine";
import Controls from "./components/view/Controls";

// TODO: Add texture maps to planets
const planets = [
	{ name: "Mercury", radius: 0.383, orbitRadius: 5, rotationSpeed: 0.01, orbitSpeed: 0.04, textureMap: "/textures/mercury.jpg" },
	{ name: "Venus", radius: 0.949, orbitRadius: 9, rotationSpeed: 0.004, orbitSpeed: 0.015, textureMap: "/textures/venus.jpg" },
	{ name: "Earth", radius: 1, orbitRadius: 13, rotationSpeed: 0.01, orbitSpeed: 0.01, textureMap: "/textures/earth_daymap.jpg" },
	{ name: "Mars", radius: 0.532, orbitRadius: 20, rotationSpeed: 0.01, orbitSpeed: 0.008, textureMap: "/textures/mars.jpg" },
	{ name: "Jupiter", radius: 11.21, orbitRadius: 68, rotationSpeed: 0.02, orbitSpeed: 0.002, textureMap: "/textures/jupiter.jpg" },
	{ name: "Saturn", radius: 9.45, orbitRadius: 125, rotationSpeed: 0.018, orbitSpeed: 0.0009, textureMap: "/textures/saturn.jpg" },
	{ name: "Uranus", radius: 4, orbitRadius: 250, rotationSpeed: 0.012, orbitSpeed: 0.0004, textureMap: "/textures/uranus.jpg" },
	{ name: "Neptune", radius: 3.88, orbitRadius: 390, rotationSpeed: 0.014, orbitSpeed: 0.0001, textureMap: "/textures/neptune.jpg" },
];

function App() {
	const [isDynamic, setIsDynamic] = useState(true);
	const [speed, setSpeed] = useState(1);

	return (
		<>
			<Canvas style={{ height: "100vh" }}>
				<PerspectiveCamera makeDefault position={[0, 30, 50]} fov={75} />
				<OrbitControls />
				<ambientLight intensity={0.1} />
				<Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />

				<Sun />
				{planets.map((planet) => (
					<Planet key={planet.name} {...planet} isDynamic={isDynamic} speed={speed} />
				))}
				{planets.map((planet) => (
					<OrbitLine key={planet.name} radius={planet.orbitRadius} />
				))}
			</Canvas>
			<Controls
				isDynamic={isDynamic}
				setIsDynamic={setIsDynamic}
				speed={speed}
				setSpeed={setSpeed}
			/>
		</>
	);
}

export default App;
