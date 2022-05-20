import * as THREE from 'three'
import React from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
// import { LayerMaterial, Depth, Fresnel, Noise, DebugLayerMaterial } from 'lamina'

import { Sphere, Text, shaderMaterial, OrthographicCamera, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import useSpline from '@splinetool/r3f-spline'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import {Model} from './Monkeygltf';

// https://github.com/pmndrs/react-postprocessing/blob/master/api.md


// https://github.com/pmndrs/react-postprocessing

export default function App({ ...props }) {
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
      <OrbitControls />
      <color attach="background" args={['#e3e3e3']} />
      <group {...props} dispose={null}>
        <pointLight
          name="Point Light"
          castShadow
          intensity={1.8}
          distance={20}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={100}
          shadow-camera-far={2500}
          color="#fed79d"
          position={[292.92, 305.86, 0]}
        />
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={0.7}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={2500}
          shadow-camera-left={-1250}
          shadow-camera-right={1250}
          shadow-camera-top={1250}
          shadow-camera-bottom={-1250}
          position={[-443.35, 275.13, 338.6]}
        />
        <Model />
        <OrthographicCamera
          name="Personal Camera"
          makeDefault={true}
          position={[-1,2,3]}
          rotation={[-2.52,- 1.38, 2.53]}
          zoom={300}
        />
        <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" position={[0, 1, 0]} />
      </group>
      <EffectComposer>
        {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
        <Noise opacity={0.3} />
       
      </EffectComposer>
    </Canvas>
  )
}
