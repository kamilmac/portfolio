import * as THREE from 'three'
import React from 'react'
import { Sphere, Text, shaderMaterial, PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei'
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Depth, Fresnel, LayerMaterial, Noise } from 'lamina'

const fragmentShader = `
varying vec2 vUv;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);

void main() {
  vec3 color = mix(colorA, colorB, vUv.y);

  gl_FragColor = vec4(color,1.0);
}
`;

const vertexShader = `
uniform float u_time;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  modelPosition.y += sin(modelPosition.x * 5.0 + u_time * 3.0) * 0.1;
  modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}

`;

const Cube = () => {
  const mesh = React.useRef();
  const uniforms = {
    u_time: {
      value: 1.0,
    },
  };
  
  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1, 16 ,16 ,16]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
      {/* <meshStandardMaterial color="red" /> */}
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas
      // gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      style={{
        height: '100vh',
        background: 'black'
      }}
      onCreated={state => {
        console.log({state})
      }}
      shadows
      linear
    >
      <ambientLight />
      <Cube />
      <orthographicCamera position={[3,3,3]}/>
      <OrbitControls />
    </Canvas>
  );
}
   