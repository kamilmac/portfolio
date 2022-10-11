import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React from 'react'
import { Environment, MeshReflectorMaterial, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

useGLTF.preload('/astrohead.glb')

export default function App() {
  const { nodes, materials } = useGLTF('/astrohead.glb')

  return (
    <>
      <Canvas
        style={{
          height: '100vh',
          background: '#111',
          background: 'radial-gradient( #1d1d1d 20%, #111 80%)',
        }}
        gl={{
          antialias: false,
          toneMapping: THREE.LinearToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
      >
        <group
          position={[0,-0.1,0]}
        >
          <mesh>
            <bufferGeometry { ...nodes.base.geometry } />
            <meshStandardMaterial roughness={0.25} metalness={0.3} aoMap={materials['base mat'].aoMap} color={'#333'} aoMapIntensity={1} /> :
          </mesh>
          <mesh>
            <bufferGeometry { ...nodes.glass.geometry } />
            <meshStandardMaterial
              toneMapped={false} fog={false} 
              roughness={0.1} aoMap={materials['glass mat'].aoMap} color={'#f9d6ce'} aoMapIntensity={1} /> :
          </mesh>
          <mesh>
            <bufferGeometry { ...nodes.binding.geometry } />
            <meshStandardMaterial roughness={0.55} metalness={0.3} aoMap={materials['binding mat'].aoMap} color={'#000'} aoMapIntensity={1} /> :
          </mesh>
          <mesh>
            <bufferGeometry { ...nodes.tubes.geometry } />
            <meshStandardMaterial roughness={0.1} metalness={0.3} aoMap={materials['tubes mat'].aoMap} color={'#000'} aoMapIntensity={1} /> :
          </mesh>
          <mesh
            position={[0,0.15,0.14]}
          >
            <sphereBufferGeometry args={[0.005, 32, 32]} />
            <meshStandardMaterial emissive={'hotpink'} color={'black'} roughness={1} emissiveIntensity={1}/>
            <pointLight color={'hotpink'} intensity={0.2}/>
          </mesh>
        </group>
        <mesh position={[0, 0, -0.3]} rotation={[0 , 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color="#151515"
            metalness={0.1}
            roughness={0.5}
          />
        </mesh>
        <fog attach="fog" args={['#17171b', -1, 1]} />
        <color attach="background" args={['#17171b']} />
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
          far={3}
          near={0.1}
          fov={60}
          up={[0, 1, 0]}
          position={[0,0,0.4]}
          rotation={[-2.38, 0.86, 2.51]}
        />
        <EffectComposer>
          {/* <DepthOfField focusDistance={0.5} focalLength={1.0} bokehScale={4} height={480} /> */}
          <Noise opacity={0.2} />
        </EffectComposer>
        {/* <fog attach="fog" args={['#17171b', 30, 40]} /> */}

      </Canvas>
    </>
  );
}

const Stuff = () => {
  const { scene } = useThree();
  scene.fog = new THREE.FogExp2('hotpink', 1)
  return (
    <>

    </>
  );
};
