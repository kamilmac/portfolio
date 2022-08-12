import * as THREE from 'three'
import React from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'

import { Sphere, Text, shaderMaterial, OrthographicCamera, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import {Model} from './FeetShoe';


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
      <color attach="background" args={['#000']} />
      <group {...props} dispose={null}>
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={2500}
          shadow-camera-left={-1250}
          shadow-camera-right={1250}
          shadow-camera-top={1250}
          shadow-camera-bottom={-1250}
          position={[100 , 10, 0]}
        />
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={2500}
          shadow-camera-left={-1250}
          shadow-camera-right={1250}
          shadow-camera-top={1250}
          shadow-camera-bottom={-1250}
          position={[-100, 10 , 0]}
        />
        <Model />
        <OrthographicCamera
          name="Personal Camera"
          makeDefault={true}
          position={[3,2,-6]}
          zoom={3000}
        />
        {/* <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" position={[0, 1, 0]} /> */}
      </group>
    </Canvas>
  )
}
