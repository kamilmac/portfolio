import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import React from 'react'
import { Environment, MeshReflectorMaterial, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { Clock, Side, TextureLoader, Vector3 } from 'three'

export default function App() {
  return (
    <>
      <Canvas
        style={{
          height: '100vh',
          background: 'radial-gradient( #1d1d1d 20%, #111 80%)',
        }}
        gl={{
          antialias: false,
          toneMapping: THREE.LinearToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
        dpr={window.devicePixelRatio}
      >
        <Atom />
        <Environment
          // background={true}
          preset='forest'
        />
        {/* <spotLight
          color={'blue'}
          intensity={1}
          angle={0.6}
          position={[-4, 5, 15]}
        />
        <spotLight
          color={'red'}
          intensity={1}
          angle={0.6}
          position={[-4, 5, -15]}
        /> */}
        <ambientLight intensity={1} />

        <OrbitControls
          minPolarAngle={0.5}
          maxPolarAngle={1.5}
          rotateSpeed={0.6}
          autoRotate={true}
          autoRotateSpeed={0.3}
          enableDamping
        />
        <PerspectiveCamera
          name="Personal Camera"
          makeDefault={true}
          far={100000}
          near={1}
          fov={60}
          up={[0, 1, 0]}
          position={[4, 3, 3]}
          rotation={[-2.38, 0.86, 2.51]}
        />
      </Canvas>
    </>
  );
};

const Atom = () => {
  // const geometry = new THREE.BufferGeometry();
  // create a simple square shape. We duplicate the top left and bottom right
  // vertices because each vertex needs to appear once per triangle.
  const vertices = new Float32Array( [
    0, 0, 0,
    0, 0, 1,
    0, 1, 0,

    -1, 0, 0,
    -1, 0, 1,
    -1, 1, 0,

    0, 0, 0,
    0, 0, 1,
    -1, 0, 0,

    -1, 0, 0,
    -1, 0, 1,
    0, 0, 1,

    0, 0, 0,
    -1, 0, 0,
    0, 1, 0,

    0, 1, 0,
    -1, 1, 0,
    -1, 0, 0,

    0, 0, 1,
    -1, 0, 1,
    -1, 1, 0,

    -1, 1, 0,
    0, 1, 0,
    0, 0, 1,
  ] );

  // itemSize = 3 because there are 3 values (components) per vertex
  // geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
  // const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  // const mesh = new THREE.Mesh( geometry, material );
  return (
    <mesh>
      <bufferGeometry 
        attach="geometry"
      >
        <bufferAttribute
          attach="attributes-position" 
          count={vertices.length / 3}
          array={vertices}
          itemSize={3}
        />
      </bufferGeometry>
      {/* <boxGeometry args={[1, 1, 1]} /> */}
      <meshBasicMaterial attach="material" color="red" side={THREE.DoubleSide} />
    </mesh>
  );
}