import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Environment, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

useGLTF.preload('/astrohead.glb')

export default function App() {
  const { nodes, materials } = useGLTF('/astrohead.glb')
  console.log(nodes, materials);

  return (
    <>
      <Canvas
        style={{
          height: '100vh',
          background: '#111',
          background: 'radial-gradient( #222 20%, #111 80%)',
        }}
        gl={{
          toneMapping: THREE.LinearToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
      >
        <group
          position={[0,-0.1,0]}
        >
          <mesh>
            <bufferGeometry { ...nodes.base.geometry } />
            <meshPhysicalMaterial roughness={0.25} metalness={0.} aoMap={materials['base mat'].aoMap} color={'#333'} aoMapIntensity={1} /> :
          </mesh>
          <mesh>
            <bufferGeometry { ...nodes.glass.geometry } />
            <meshPhysicalMaterial roughness={0.1} aoMap={materials['glass mat'].aoMap} color={'#f9d6ce'} aoMapIntensity={1} /> :
          </mesh>
          <mesh>
            <bufferGeometry { ...nodes.binding.geometry } />
            <meshPhysicalMaterial roughness={0.55} metalness={0.3} aoMap={materials['binding mat'].aoMap} color={'#000'} aoMapIntensity={1} /> :
          </mesh>
          <mesh>
            <bufferGeometry { ...nodes.tubes.geometry } />
            <meshPhysicalMaterial roughness={0.1} metalness={0.3} aoMap={materials['tubes mat'].aoMap} color={'#000'} aoMapIntensity={1} /> :
          </mesh>
        </group>
        <Environment
          background={false}
          preset='forest'
        />
        <OrbitControls
          minPolarAngle={0.5}
          maxPolarAngle={1.5}
          rotateSpeed={0.6}
          autoRotate={false}
          autoRotateSpeed={0.4}
          enableDamping
          minDistance={0.3}
          maxDistance={20.5}
          enablePan={false}
        />
        <PerspectiveCamera
          name="Personal Camera"
          makeDefault={true}
          far={10000}
          near={0.1}
          fov={60}
          up={[0, 1, 0]}
          position={[0,0,0.4]}
          rotation={[-2.38, 0.86, 2.51]}
        />
        <EffectComposer>
          <DepthOfField focusDistance={0.1} focalLength={0.4} bokehScale={4} height={480} />
          {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
          <Noise opacity={0.1} />
          <Vignette eskil={false} offset={0.2} darkness={1.5} />
        </EffectComposer>
      </Canvas>
    </>
  );
}

