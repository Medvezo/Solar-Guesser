import React, { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from 'three';

// Components
import Planet from "./components/planets/Planet";
import Sun from "./components/planets/Sun";
import OrbitLine from "./components/view/OrbitLine";
import Controls from "./components/ui/Controls";
import PlanetInfo from "./components/ui/PlanetInfo";
import AsteroidBelt from "./components/planets/AsteroidBelt";
import Earth from "./components/planets/Earth";
import Saturn from "./components/planets/Saturn";
import LayersFilter from "./components/ui/LayersFilter";

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

function App() {
	const [isDynamic, setIsDynamic] = useState(true);
	const [speed, setSpeed] = useState(1);
	const [focusedPlanet, setFocusedPlanet] = useState<typeof planets[0] | null>(null);
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

	const handlePlanetFocus = (name: string) => {
		const planet = planets.find(p => p.name === name);
		if (planet) {
			setFocusedPlanet(planet);
			if (controlsRef.current) {
				controlsRef.current.enabled = false;
			}
		}
	};

	const handleClosePlanetInfo = () => {
		setFocusedPlanet(null);
		if (controlsRef.current) {
			controlsRef.current.enabled = true;
		}
	};

	return (
		<>
			<Canvas style={{ height: "100vh" }}>
				<PerspectiveCamera ref={cameraRef} makeDefault position={[0, 30, 50]} fov={75} />
				<OrbitControls ref={controlsRef} />
				<ambientLight intensity={0.1} />
				<Stars radius={500} depth={60} count={20000} factor={7} saturation={0} fade />

				<Sun />
				{visibleLayers.Asteroids && <AsteroidBelt />}
				{visibleLayers.Planets && planets.map((planet) => 
					planet.component ? (
						<planet.component
							key={planet.name}
							{...planet}
							orbitRadius={planet.semiMajorAxis}
							isDynamic={isDynamic}
							speed={speed}
							onFocus={handlePlanetFocus}
							isFocused={focusedPlanet?.name === planet.name}
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
							onFocus={handlePlanetFocus} 
							isFocused={focusedPlanet?.name === planet.name}
							cameraRef={cameraRef}
						/>
					)
				)}
				{visibleLayers.Orbits && planets.map((planet) => (
					<OrbitLine key={planet.name} semiMajorAxis={planet.semiMajorAxis} eccentricity={planet.eccentricity} />
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
					{focusedPlanet && <PlanetInfo planet={focusedPlanet} onClose={handleClosePlanetInfo} />}
					<LayersFilter onLayerToggle={handleLayerToggle} />
				</>
			)}
		</>
	);
}

export default App;