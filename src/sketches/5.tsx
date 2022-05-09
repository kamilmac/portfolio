import * as THREE from 'three'
import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { LayerMaterial, Depth, Fresnel, Noise, DebugLayerMaterial } from 'lamina'

import { Sphere, Text } from '@react-three/drei'


const App: React.FC = () => {
  return (
    <Canvas
      // gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      style={{
        height: '100vh',
      }}
      // onCreated={state => {
      //   state.gl.toneMapping =  THREE.ACESFilmicToneMapping;
      }}
    >
      <mesh>
        <planeGeometry args={[30,30]} />
        <meshPhongMaterial color="#333"/>
      </mesh>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <LayerMaterial
          color={'#718EFF'} lighting={'physical'} envMapIntensity={0.3}
          roughness={0.01}
          thickness={0.4}
        >
          <Depth near={1.14} far={0.5} origin={[0, -0.43700000000000017, 0]} colorA={'#7d97fe'} colorB={'#ebebeb'} />
          <Depth far={1.7} origin={[0, 1, 0]} colorA={'#5688ee'} colorB={'#fefefe'} alpha={0.7} mode={'multiply'} />
          <Depth
            near={1.14}
            far={0.9449999999999992}
            origin={[0.5200000000000002, -0.2900000000000002, -0.18999999999999995]}
            colorA={'#f1f1f1'}
            colorB={'#fe7ef5'}
            alpha={0.7}
            mode={'darken'}
          />
          <Fresnel color={'#f77f7f'} mode={'screen'} />
          <Noise
            colorA={'#fefefe'}
            colorB={'#a8a8a8'}
            colorC={'#fefefe'}
            colorD={'#fefefe'}
            alpha={0.59}
            scale={1}
            offset={[0, 0, 0]}
            name={'noise'}
            mode={'subtract'}
          />
        </LayerMaterial>
      </mesh>
      <Text
        fontSize={0.4}
        letterSpacing={0.075}
        lineHeight={0.8}
        position={[0, 0, 2]}
        strokeWidth={'4.5%'}
        strokeColor="#ffffff"
      >
        Lamina #1
      </Text>
      <pointLight position={[10, 10, 20]} />

    </Canvas>
  );
}


export default App;
