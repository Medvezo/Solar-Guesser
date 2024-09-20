import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";

// Components
import Earth from "./components/planets/Earth";
import Sun from "./components/planets/Sun";
import OrbitLine from "./components/view/OrbitLine";
import Controls from "./components/view/Controls";

function App() {
	const [isDynamic, setIsDynamic] = useState(true);
	const [speed, setSpeed] = useState(1);
	const earthRef = useRef<THREE.Mesh>(null);

	return (
		<>
			<Canvas style={{ height: "100vh" }}>
				<PerspectiveCamera makeDefault position={[0, 10, 20]} fov={75} />
				<OrbitControls />
				<ambientLight intensity={0.1} />
				<Stars
					radius={100}
					depth={50}
					count={5000}
					factor={4}
					saturation={0}
					fade
				/>

				<Sun />
				<Earth ref={earthRef} isDynamic={isDynamic} speed={speed} />
				<OrbitLine />
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
