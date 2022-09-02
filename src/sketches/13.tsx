import * as THREE from 'three'
import React from 'react'
import { Sphere, Text, shaderMaterial, PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei'
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Depth, Fresnel, LayerMaterial, Noise } from 'lamina'

// const Cube = () => {
//   const mesh = React.useRef();
//   return (
//     <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//       <planeGeometry args={[1, 1, 32, 32]} />
//       <shaderMaterial
//         fragmentShader={fragmentShader}
//         vertexShader={vertexShader}
//         wireframe
//       />
//     </mesh>
//   );
// }

const HDRI = 'royal_esplanade_1k.hdr'

const Material = () => 
  // <meshPhysicalMaterial attach="material" color={"white"} side={THREE.DoubleSide}
  //   roughness={0.15}
  //   thickness={0}
  //   flatShading={false}
  // />
  <LayerMaterial
    color="white"
    lighting="physical"
    roughness={0.1}
    transmission={0.2}
  >
  </LayerMaterial>

const Floor = () => {
  const ref = React.useRef();
  const ref2 = React.useRef();

  useFrame(({ clock }) => {
    ref2.current.scale = (Math.sin(clock.elapsedTime)+ 4) * 20;
  })

  return (
    <LayerMaterial
      color="#222"
      lighting="physical"
      roughness={0.4}
      transmission={0}
    >
      <Noise
        ref={ref2}
        colorA={'red'}
        colorB={'hotpink'}
        colorC={'black'}
        colorD={'black'}
        alpha={0.14}
        // scale={1000}
        offset={[0, 0, 0]}
        name={'perlin'}
        mode={'lighten'}
        type={'cell'}
      />
    </LayerMaterial>
  )
}
  

export default function App() {
  const scene = React.useRef();
  const oleft= useLoader(OBJLoader, '/scan/left.obj');
  const oright = useLoader(OBJLoader, '/scan/right.obj');

  const geoLeft = React.useMemo(() => {
    let g = [];
    oleft.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g.push(_c.geometry);
      }
    });
    return g;
  }, [oleft]);
  
  const geoRight = React.useMemo(() => {
    let g = [];
    oright.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g.push(_c.geometry);
      }
    });
    return g;
  }, [oright]);

  return (
    <Canvas
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      style={{
        height: '100vh',
        background: 'black'
      }}
      onCreated={state => {
        state.gl.toneMapping =  THREE.ACESFilmicToneMapping;
        console.log({state})
      }}
      shadows
      linear
    >
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
        position={[-.06,-.06,1]}
      />
        {/* <ambientLight intensity={0.5} /> */}
        <PerspectiveCamera
          makeDefault
          aspect={1200 / 600}
          fov={60}
          position={[0,1, -0.6, 1]}
        />
        {
          geoLeft.map(g => 
            <mesh geometry={g} position={[-.06,-.06,.1]} rotation={[-Math.PI/2, 0, 0]} receiveShadow castShadow>
              <Material />
            </mesh>
          )
        }
        {
          geoRight.map(g => 
            <mesh 
              geometry={g} position={[.06,-.06,.1]} rotation={[-Math.PI/2, 0, 0]} receiveShadow castShadow>
              <Material/>
            </mesh>
          )
        }
      <Environment 
        background={false} // Whether to affect scene.background
        files={HDRI}
        path={'/'}
      />
      <mesh >
        <sphereBufferGeometry args={[0.03, 30, 30 ]} attach="geometry" />
        <meshBasicMaterial color="red" attach="material" />
      </mesh>
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0,-.06,0.00]} receiveShadow castShadow>
        <circleGeometry args={[0.5, 64]} attach="geometry" />
        <Floor/>
      </mesh>
      <OrbitControls
        maxPolarAngle={Math.PI/2}
      />
    </Canvas>
  );
}
   