// import { useRef, useMemo } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import Asteroid from './Asteroid';

// const AsteroidBelt = () => {
//   const asteroids = useMemo(() => {
//     const temp = [];
//     const numAsteroids = 200; // Reduced number for performance
//     const innerRadius = 30;
//     const outerRadius = 70;

//     for (let i = 0; i < numAsteroids; i++) {
//       const semiMajorAxis = Math.random() * (outerRadius - innerRadius) + innerRadius;
//       const eccentricity = Math.random() * 0.1;
//       const angle = Math.random() * Math.PI * 2;
//       const y = (Math.random() - 0.5) * 1;
//       const scale = Math.random() * 0.15 + 0.05;
//       temp.push({ 
//         semiMajorAxis,
//         eccentricity,
//         angle,
//         y,
//         scale
//       });
//     }
//     return temp;
//   }, []);

//   const asteroidsRef = useRef<THREE.Group>(null);

//   useFrame((_, delta) => {
//     if (asteroidsRef.current) {
//       asteroidsRef.current.children.forEach((asteroid, index) => {
//         const { semiMajorAxis, eccentricity, angle } = asteroids[index];
        
//         const period = Math.sqrt(semiMajorAxis * semiMajorAxis * semiMajorAxis);
//         const newAngle = (angle + (2 * Math.PI / period) * delta) % (2 * Math.PI);
//         asteroids[index].angle = newAngle;
        
//         const radius = (semiMajorAxis * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(newAngle));
        
//         const x = Math.cos(newAngle) * radius;
//         const z = Math.sin(newAngle) * radius;
        
//         asteroid.position.set(x, asteroids[index].y, z);
//       });
//     }
//   });

//   return (
//     <group ref={asteroidsRef}>
//       {asteroids.map((asteroid, i) => (
//         <Asteroid
//           key={i}
//           position={[asteroid.semiMajorAxis, asteroid.y, 0]}
//           rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
//           scale={asteroid.scale}
//           speed={Math.random() * 0.5 + 0.5}
//         />
//       ))}
//     </group>
//   );
// };

// export default AsteroidBelt;