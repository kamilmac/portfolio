import * as THREE from 'three'
import React from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
// import { LayerMaterial, Depth, Fresnel, Noise, DebugLayerMaterial } from 'lamina'

import { Sphere, Text, shaderMaterial, OrthographicCamera, PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei'
import useSpline from '@splinetool/r3f-spline'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, BrightnessContrast } from '@react-three/postprocessing';
import { Model } from './scanner_studio'


// https://github.com/pmndrs/react-postprocessing/blob/master/api.md


// https://github.com/pmndrs/react-postprocessing

export default function App({ ...props }) {
  // const { nodes, materials } = useSpline('https://prod.spline.design/8ojcY6ILxrKjzDdd/scene.splinecode')
  // console.log({materials, nodes})
  return (
    <Canvas
      style={{
        height: '100vh',
      }}
      gl={{
        toneMapping: THREE.LinearToneMapping,
        outputEncoding: THREE.sRGBEncoding,
      }}
    >
      <color attach="background" args={['#b3b6bb']} />
      <OrbitControls
        target={[4.5,0.3,0]}
      />
      {/* <pointLight
        name="Point Light"
        castShadow
        intensity={7.8}
        distance={20}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={100}
        shadow-camera-far={2500}
        color="#fed79d"
        position={[292.92, 305.86, 0]}
      /> */}
      <Model />
      <pointLight
        name="Point Light"
        intensity={4}
        distance={2000}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={100}
        shadow-camera-far={2500}
        color="#fff"
        position={[633.46, 351.86, -930.44]}
      />
     
      <PerspectiveCamera
        name="Personal Camera"
        makeDefault={true}
        far={100000}
        near={1}
        fov={45}
        up={[0, 1, 0]}
        position={[15,5,0]}
        rotation={[-2.38, 0.86, 2.51]}
      />
      <hemisphereLight name="Default Ambient Light" intensity={2.75} color="#eaeaea" position={[0, 1, 0]} />
    </Canvas>
  )
}
