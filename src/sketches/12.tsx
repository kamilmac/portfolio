import * as THREE from 'three'
import React from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Sphere, Text, shaderMaterial, OrthographicCamera, PerspectiveCamera, OrbitControls } from '@react-three/drei'


const fragmentShader = `
varying vec2 vUv;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(0.000,0.777,0.052);

void main() {
  // "Normalizing" with an arbitrary value
  // We'll see a cleaner technique later :)   
  vec2 normalizedPixel = gl_FragCoord.xy/600.0;
  vec3 color = mix(colorA, colorB, normalizedPixel.x);

  gl_FragColor = vec4(color,1.0);
}
`;

const vertexShader = `
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.y += sin(modelPosition.x * 4.0) * 0.2;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;

const Cube = () => {
  const mesh = React.useRef();
  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        wireframe
      />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      style={{
        height: '100vh',
      }}
      onCreated={state => {
        state.gl.toneMapping =  THREE.ACESFilmicToneMapping;
        console.log({state})
      }}
      shadows
      flat
      linear
    >
      <Cube />
      <OrbitControls />
    </Canvas>
  );
}
   