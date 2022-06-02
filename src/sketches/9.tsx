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
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.outputEncoding = THREE.sRGBEncoding
        gl.shadowMap.type = THREE.PCFShadowMap
        gl.shadowMap.enabled = true;
      }}
      shadows camera={{ position: [0, 0, 4], fov: 50 }}
    >
      <color attach="background" args={['#b3b6bb']} />
      <OrbitControls />
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
      {/* <hemisphereLight name="Default Ambient Light" intensity={2.75} color="#eaeaea" position={[0, 1, 0]} /> */}

    </Canvas>
  )
}
