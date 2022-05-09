import * as THREE from 'three'
import React from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { LayerMaterial, Depth, Fresnel, Noise, DebugLayerMaterial } from 'lamina'

import { Sphere, Text, shaderMaterial } from '@react-three/drei'


// https://www.youtube.com/watch?v=kxXaIHi1j4w

const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTime: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);  
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColor;
    uniform float uTime;

    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(sin(vUv.x + uTime) * uColor, 1.0); 
    }
  `
);

extend({ WaveShaderMaterial });

const Plane = () => {
  const ref = React.useRef();
  useFrame(({clock}) => {
    ref.current.uTime = clock.getElapsedTime();
  })
  return (
    <mesh>
      <planeBufferGeometry args={[20,20.6,16,16]} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref}/>
    </mesh>
  );
}

const App: React.FC = () => {
  return (
    <Canvas
      // gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      style={{
        height: '100vh',
      }}
      // onCreated={state => {
      //   state.gl.toneMapping =  THREE.ACESFilmicToneMapping;
      //   console.log({state})
      // }}
    >
      <Plane />
      <Text
        fontSize={0.2}
        letterSpacing={0.075}
        lineHeight={0.8}
        position={[0, 0, 2]}
      >
        Shader gradient
      </Text>
      <pointLight position={[0, 0, 100]} />

    </Canvas>
  );
}


export default App;
