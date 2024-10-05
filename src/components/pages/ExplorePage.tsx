import { useState, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from 'three';
import ZoomControls from '../ui/ZoomControls';
import Asteroid from "../planets/Asteroid";
import Planet from "../planets/Planet";
import Sun from "../planets/Sun";
import OrbitLine from "../view/OrbitLine";
import Controls from "../ui/TimeControls";
import PlanetInfo from "../ui/PlanetInfo";
import LayersFilter from "../ui/LayersFilter";
import { planets, orbitColors } from '../../lib/const';

function ExplorePage() {
    const [isDynamic, setIsDynamic] = useState(true);
    const [speed, setSpeed] = useState(0.00002);
    const [focusedObject, setFocusedObject] = useState<typeof planets[0] | { name: string } | null>(null);
    const controlsRef = useRef(null);
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
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/textures/stars_milky_way.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1
                }}
            />
            <Canvas style={{ height: "100vh" }}>
                <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 30, 50]} fov={75} />
                <OrbitControls ref={controlsRef} />
                <ambientLight intensity={0.5} />
                <Stars radius={600} depth={600} count={5000} factor={1} saturation={3} fade />

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
                        color={orbitColors[index]}
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

export default ExplorePage;