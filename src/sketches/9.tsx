import * as THREE from 'three'
import React from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
// import { LayerMaterial, Depth, Fresnel, Noise, DebugLayerMaterial } from 'lamina'

import { Sphere, Text, shaderMaterial, OrthographicCamera, PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei'
import useSpline from '@splinetool/r3f-spline'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, BrightnessContrast } from '@react-three/postprocessing';
import { Model } from './scanner_studio'
import { useControls } from 'leva'


// https://github.com/pmndrs/react-postprocessing/blob/master/api.md


// https://github.com/pmndrs/react-postprocessing

export default function App({ ...props }) {
  const { focalLength, bokehScale } = useControls({
    focalLength: {
      value: 0.0020,
      min: 0,
      max: 0.003,
      step: 0.0001,
    },
    bokehScale: {
      value: 20,
      min: 0,
      max: 50,
      step: 1,
    }
  });
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
     
      <MyCam />
      <hemisphereLight name="Default Ambient Light" intensity={2.75} color="#eaeaea" position={[0, 1, 0]} />
      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={focalLength} bokehScale={bokehScale} height={512} />
      </EffectComposer>
    </Canvas>
  )
}


const CAMvec = new THREE.Vector3(10,3,0);
let lerp = true;

const MyCam = () => {
  const ref = React.useRef();
  useFrame(() => {
    lerp && ref.current.position.lerp(CAMvec, 0.075)
  });
  React.useEffect(() => {
    setTimeout(() => {
      lerp = false;
    }, 1900)
  }, [])
  return (
    <PerspectiveCamera
      ref={ref}
      name="Personal Camera"
      makeDefault={true}
      far={100000}
      near={1}
      fov={55}
      up={[0, 1, 0]}
      position={[200,100,0]}
      rotation={[-2.38, 0.86, 2.51]}
    />
  )
}