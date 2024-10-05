/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import noise from '../../shaders/noise.glsl'

const SunMaterial = shaderMaterial(
  { emissiveIntensity: 1.0, time: 0 },
  // Vertex Shader
  `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float time;
  uniform float emissiveIntensity;
  varying vec2 vUv;
  varying vec3 vPosition;

  ${noise}

  float turbulence(vec3 p) {
    float w = 100.0;
    float t = -.5;
    for (float f = 1.0 ; f <= 10.0 ; f++ ){
      float power = pow(2.0, f);
      t += abs(noise(vec3(power * p)) / power);
    }
    return t;
  }

  void main() {
    float noiseValue = turbulence(vPosition + time * 0.1);

    vec3 color1 = vec3(1.0, 0.5, 0.0); // Orange
    vec3 color2 = vec3(1.0, 0.9, 0.0); // Yellow
    vec3 finalColor = mix(color1, color2, noiseValue);
    
    float intensity = 1.0 + noiseValue * 0.5;
    
    // Add glow
    float glow = max(0.0, 1.0 - length(vUv - 0.5) * 2.0);
    finalColor += vec3(1.0, 0.6, 0.3) * glow * 0.6;

    gl_FragColor = vec4(finalColor * intensity * emissiveIntensity, 1.0);
  }
  `
)

extend({ SunMaterial })

const Sun = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
    if (lightRef.current) {
      // Further reduce base intensity and fluctuation
      lightRef.current.intensity = 15000 + Math.sin(clock.elapsedTime * 0.5) * 1000
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[3, 128, 128]} />
        {/* @ts-expect-error */}
        <sunMaterial ref={materialRef} />
      </mesh>
      <pointLight 
        ref={lightRef} 
        position={[0, 0, 0]} 
        intensity={1500} 
        color={'rgba(100, 100, 100)'} // White color with 50% opacity
        distance={15000} // Increase distance for light falloff
        decay={1.5} // Slightly increase decay for faster falloff
      />
    </group>
  )
}

export default Sun