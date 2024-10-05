import { useState, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from 'three';
import ZoomControls from './components/ui/ZoomControls';
import Asteroid from "./components/planets/Asteroid";

// Components
import Planet from "./components/planets/Planet";
import Sun from "./components/planets/Sun";
import OrbitLine from "./components/view/OrbitLine";
import Controls from "./components/ui/TimeControls";

import PlanetInfo from "./components/ui/PlanetInfo";
import Earth from "./components/planets/Earth";
import Saturn from "./components/planets/Saturn";
import LayersFilter from "./components/ui/LayersFilter";
import Header from './components/ui/Header';

// TODO: Add texture maps to planets
const planets = [
	{ name: "Mercury", radius: 0.383, semiMajorAxis: 5.7, eccentricity: 0.206, rotationSpeed: 0.01, orbitSpeed: 0.04, textureMap: "/textures/mercury.jpg", description: "Mercury is the smallest planet in the Solar System and the closest to the Sun.", type: "TERRESTRIAL", moons: "None", gravity: "3.7 m/s2", dayLength: "58d 15h 30m", radiusInKm: "2,439.7 km", orbitalPeriod: "88 days", distanceFromSun: "57.9 million km", coordinates: "RA 2h 15m 36s" },
	{ name: "Venus", radius: 0.949, semiMajorAxis: 10.8, eccentricity: 0.007, rotationSpeed: 0.004, orbitSpeed: 0.015, textureMap: "/textures/venus.jpg", description: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor.", type: "TERRESTRIAL", moons: "None", gravity: "8.87 m/s2", dayLength: "116d 18h 0m", radiusInKm: "6,051.8 km", orbitalPeriod: "225 days", distanceFromSun: "108.2 million km", coordinates: "RA 3h 20m 54s" },
	{ name: "Earth", component: Earth, radius: 1, semiMajorAxis: 15, eccentricity: 0.017, rotationSpeed: 0.01, orbitSpeed: 0.01, textureMap: "/textures/earth_daymap.jpg", description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life.", type: "TERRESTRIAL", moons: "Moon", gravity: "9.81 m/s2", dayLength: "23h 56m 4s", radiusInKm: "6,371 km", orbitalPeriod: "365.25 days", distanceFromSun: "149.6 million km", coordinates: "RA 4h 26m 12s" },
	{ name: "Mars", radius: 0.532, semiMajorAxis: 22.8, eccentricity: 0.093, rotationSpeed: 0.01, orbitSpeed: 0.008, textureMap: "/textures/mars.jpg", description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.", type: "TERRESTRIAL", moons: "Phobos, Deimos", gravity: "3.71 m/s2", dayLength: "1d 0h 37m", radiusInKm: "3,389.5 km", orbitalPeriod: "687 days", distanceFromSun: "227.9 million km", coordinates: "RA 7h 9m 42s" },
	{ name: "Jupiter", radius: 11.21, semiMajorAxis: 77.8, eccentricity: 0.048, rotationSpeed: 0.02, orbitSpeed: 0.002, textureMap: "/textures/jupiter.jpg", description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System.", type: "GAS GIANT", moons: "79 known moons", gravity: "24.79 m/s2", dayLength: "9h 56m", radiusInKm: "69,911 km", orbitalPeriod: "11.86 years", distanceFromSun: "778.5 million km", coordinates: "RA 11h 15m 30s" },
	{ name: "Saturn", component: Saturn, radius: 9.14, semiMajorAxis: 143, eccentricity: 0.0565, rotationSpeed: 0.034, orbitSpeed: 0.001, textureMap: "/textures/saturn.jpg", ringTexture: "/textures/saturn_ring.png", description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, known for its prominent ring system.", type: "GAS GIANT", moons: "82 known moons", gravity: "10.44 m/s2", dayLength: "10h 42m", radiusInKm: "58,232 km", orbitalPeriod: "29.45 years", distanceFromSun: "1.43 billion km", coordinates: "RA 15h 21m 48s" },
	{ name: "Uranus", radius: 4, semiMajorAxis: 287, eccentricity: 0.047, rotationSpeed: 0.012, orbitSpeed: 0.0004, textureMap: "/textures/uranus.jpg", description: "Uranus is the seventh planet from the Sun and has the third-largest diameter in our solar system.", type: "ICE GIANT", moons: "27 known moons", gravity: "8.69 m/s2", dayLength: "17h 14m", radiusInKm: "25,362 km", orbitalPeriod: "84 years", distanceFromSun: "2.87 billion km", coordinates: "RA 19h 28m 6s" },
	{ name: "Neptune", radius: 3.88, semiMajorAxis: 450, eccentricity: 0.009, rotationSpeed: 0.014, orbitSpeed: 0.0001, textureMap: "/textures/neptune.jpg", description: "Neptune is the eighth and farthest-known Solar planet from the Sun.", type: "ICE GIANT", moons: "14 known moons", gravity: "11.15 m/s2", dayLength: "16h 6m", radiusInKm: "24,622 km", orbitalPeriod: "164.79 years", distanceFromSun: "4.5 billion km", coordinates: "RA 23h 39m 54s" },
];

// Add this array of colors for orbit lines
const orbitColors = [
  "#FF6B6B", // Mercury
  "#4ECDC4", // Venus
  "#45B7D1", // Earth
  "#FF8C42", // Mars
  "#98D8C8", // Jupiter
  "#F3B562", // Saturn
  "#6A0572", // Uranus
  "#1A5F7A", // Neptune
];

function App() {
	const [isDynamic, setIsDynamic] = useState(true);
	const [speed, setSpeed] = useState(0.00002);
	const [focusedObject, setFocusedObject] = useState<typeof planets[0] | { name: string } | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const controlsRef = useRef<any>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera>(null);

	const [visibleLayers, setVisibleLayers] = useState({
		Planets: true,
		Asteroids: false,
		Comets: false,
		Spacecrafts: false,
		'User Interface': true,
		Labels: true,
		Icons: true,
		Orbits: true,
		Trails: false,
	});


	const handleLayerToggle = (layer: string, isVisible: boolean) => {
		setVisibleLayers(prev => ({ ...prev, [layer]: isVisible }));
	};

	const handleObjectFocus = (name: string) => {
		const object = planets.find(p => p.name === name) || { name };
		setFocusedObject(object);
		if (controlsRef.current) {
			controlsRef.current.enabled = false;
		}
	};

	const handleCloseObjectInfo = () => {
		setFocusedObject(null);
		if (controlsRef.current) {
			controlsRef.current.enabled = true;
		}
	};

	const handleZoomIn = () => {
		if (cameraRef.current) {
			cameraRef.current.position.multiplyScalar(0.9);
		}
	};

	const handleZoomOut = () => {
		if (cameraRef.current) {
			cameraRef.current.position.multiplyScalar(1.1);
		}
	};

	const handleResetZoom = () => {
		if (cameraRef.current) {
			cameraRef.current.position.set(0, 30, 50);
			cameraRef.current.lookAt(0, 0, 0);
		}
	};

	

	return (
		<>
			<Header />
			<Canvas style={{ height: "100vh" }}>
				<PerspectiveCamera ref={cameraRef} makeDefault position={[0, 30, 50]} fov={75} />
				<OrbitControls ref={controlsRef} />
				<ambientLight intensity={0.5} />
				<Stars radius={500} depth={60} count={20000} factor={7} saturation={0} fade />

				<Sun />
				{visibleLayers.Asteroids && (
					<Asteroid
						position={[30, 0, 0]}
						rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
						scale={0.5}
						speed={speed}
						semiMajorAxis={30}
						eccentricity={0.1}
						orbitAngle={Math.random() * Math.PI * 0.2}
						onFocus={handleObjectFocus}
						isFocused={focusedObject?.name === "Asteroid"}
						cameraRef={cameraRef}
					/>
				)}
				{visibleLayers.Planets && planets.map((planet) => 
					planet.component ? (
						<planet.component
							key={planet.name}
							{...planet}
							orbitRadius={planet.semiMajorAxis}
							isDynamic={isDynamic}
							speed={speed}
							onFocus={handleObjectFocus}
							isFocused={focusedObject?.name === planet.name}
							cameraRef={cameraRef}
							ringTexture={planet.ringTexture || ''}
						/>
					) : (
						<Planet 
							key={planet.name} 
							{...planet} 
							orbitRadius={planet.semiMajorAxis} 
							isDynamic={isDynamic} 
							speed={speed}
							onFocus={handleObjectFocus} 
							isFocused={focusedObject?.name === planet.name}
							cameraRef={cameraRef}
						/>
					)
				)}
				{visibleLayers.Orbits && planets.map((planet, index) => (
					<OrbitLine 
						key={planet.name} 
						semiMajorAxis={planet.semiMajorAxis} 
						eccentricity={planet.eccentricity} 
						color={orbitColors[index] }
					/>
				))}
			</Canvas>
			{visibleLayers['User Interface'] && (
				<>
					<Controls
						isDynamic={isDynamic}
						setIsDynamic={setIsDynamic}
						speed={speed}
						setSpeed={setSpeed}
					/>
					{focusedObject && (
						<PlanetInfo
							planet={focusedObject as typeof planets[0]}
							onClose={handleCloseObjectInfo}
						/>
					)}
					<LayersFilter onLayerToggle={handleLayerToggle} isPlanetFocused={focusedObject !== null} />
					<ZoomControls
						onZoomIn={handleZoomIn}
						onZoomOut={handleZoomOut}
						onReset={handleResetZoom}
					/>
				</>
			)}
		</>
	);
}

export default App;