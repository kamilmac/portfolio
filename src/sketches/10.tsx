import * as THREE from 'three'
import React from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'

import { Sphere, Text, RoundedBox, OrthographicCamera, Environment, OrbitControls, CameraShake} from '@react-three/drei'
import {Model} from './FeetShoe';
import { LayerMaterial, Depth, Noise } from 'lamina'


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
        <ambientLight intensity={0.25} />
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
        <Environment preset="warehouse" />
        {/* <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" position={[0, 1, 0]} /> */}
      </group>
       {/* <Text
        receiveShadow castShadow
        position={[0.1, 0.2, -0.2]}
        rotation={[0,Math.PI,0]}
        lineHeight={0.8}
        fontSize={ 0.04}
        material-toneMapped={false}
        anchorX="center"
        maxWidth={0.3}
        anchorY="middle">
        Why Volumental?
Because it just works. We can geek out about why our computer vision and software programming expertise makes our 3D scanning technology the world’s best, both in-store and online. We can describe precisely how our 30 million (and counting) foot scans matched to retail purchases drives our blazing-fast and hyper-accurate AI recommendation algorithms.
      </Text> */}
    </Canvas>
  )
}

