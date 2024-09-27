import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { useState } from "react";

// Components
import Planet from "./components/planets/Planet";
import Sun from "./components/planets/Sun";
import OrbitLine from "./components/view/OrbitLine";
import Controls from "./components/view/Controls";
import PlanetInfo from "./components/view/PlanetInfo";

// TODO: Add texture maps to planets
const planets = [
	{ name: "Mercury", radius: 0.383, semiMajorAxis: 5.7, eccentricity: 0.206, rotationSpeed: 0.01, orbitSpeed: 0.04, textureMap: "/textures/mercury.jpg", description: "Mercury is the smallest planet in the Solar System and the closest to the Sun." },
	{ name: "Venus", radius: 0.949, semiMajorAxis: 10.8, eccentricity: 0.007, rotationSpeed: 0.004, orbitSpeed: 0.015, textureMap: "/textures/venus.jpg", description: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor." },
	{ name: "Earth", radius: 1, semiMajorAxis: 15, eccentricity: 0.017, rotationSpeed: 0.01, orbitSpeed: 0.01, textureMap: "/textures/earth_daymap.jpg", description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life." },
	{ name: "Mars", radius: 0.532, semiMajorAxis: 22.8, eccentricity: 0.093, rotationSpeed: 0.01, orbitSpeed: 0.008, textureMap: "/textures/mars.jpg", description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System." },
	{ name: "Jupiter", radius: 11.21, semiMajorAxis: 77.8, eccentricity: 0.048, rotationSpeed: 0.02, orbitSpeed: 0.002, textureMap: "/textures/jupiter.jpg", description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System." },
	{ name: "Saturn", radius: 9.45, semiMajorAxis: 143, eccentricity: 0.054, rotationSpeed: 0.018, orbitSpeed: 0.0009, textureMap: "/textures/saturn.jpg", description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System." },
	{ name: "Uranus", radius: 4, semiMajorAxis: 287, eccentricity: 0.047, rotationSpeed: 0.012, orbitSpeed: 0.0004, textureMap: "/textures/uranus.jpg", description: "Uranus is the seventh planet from the Sun and has the third-largest diameter in our solar system." },
	{ name: "Neptune", radius: 3.88, semiMajorAxis: 450, eccentricity: 0.009, rotationSpeed: 0.014, orbitSpeed: 0.0001, textureMap: "/textures/neptune.jpg", description: "Neptune is the eighth and farthest-known Solar planet from the Sun." },
];

function App() {
	const [isDynamic, setIsDynamic] = useState(true);
	const [speed, setSpeed] = useState(1);
	const [focusedPlanet, setFocusedPlanet] = useState<{ name: string; description: string } | null>(null);

	const handlePlanetFocus = (name: string, description: string) => {
		setFocusedPlanet({ name, description });
	};

	return (
		<>
			<Canvas style={{ height: "100vh" }}>
				<PerspectiveCamera makeDefault position={[0, 30, 50]} fov={75} />
				<OrbitControls />
				<ambientLight intensity={0.1} />
				<Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />

				<Sun />
				{planets.map((planet) => (
					<Planet 
						key={planet.name} 
						{...planet} 
						orbitRadius={planet.semiMajorAxis} 
						isDynamic={isDynamic} 
						speed={speed} 
						onFocus={handlePlanetFocus} 
					/>
				))}
				{planets.map((planet) => (
					<OrbitLine key={planet.name} semiMajorAxis={planet.semiMajorAxis} eccentricity={planet.eccentricity} />
				))}
			</Canvas>
			<Controls
				isDynamic={isDynamic}
				setIsDynamic={setIsDynamic}
				speed={speed}
				setSpeed={setSpeed}
			/>
			{focusedPlanet && <PlanetInfo planet={focusedPlanet} onClose={() => setFocusedPlanet(null)} />}
		</>
	);
}

export default App;
