import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import React from 'react'
import { Environment, meshBounds, MeshReflectorMaterial, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Clock, Group, Side, TextureLoader, Vector3 } from 'three'
import { Physics, useBox, Debug } from '@react-three/cannon'

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
        {/* <Atom /> */}
        <Physics
          gravity={[0,-8.4,0]}
        >
          <Debug color="black" scale={1.1}>
            <Letter
              letter={'A'}
            />
            <Letter
              letter={'D'}
              offset={4}
            />
            <Letter
              letter={'A'}
              offset={8}
            />
            <Letter
              letter={'M'}
              offset={12}
            />
            {/* <Boxes
              size={1}
              number={100}
            /> */}
          </Debug>
        </Physics>
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
        <ambientLight intensity={0} />

        <OrbitControls
          minPolarAngle={0.5}
          maxPolarAngle={1.5}
          rotateSpeed={0.6}
          autoRotate
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
          position={[30, 0, 30]}
          rotation={[-2.38, 0.86, 2.51]}
        />
      </Canvas>
    </>
  );
};

const Letter = ({letter, offset}) => {  
  const LETTERS = {
    'A': [
      3, 1, 2, 0,
      1, 0, 1, 0,
      1, 1, 1, 0,
      1, 0, 1, 0,
    ],
    'B': [
      1, 1, 2, 0,
      1, 3, 4, 0,
      1, 5, 2, 0,
      1, 1, 4, 0,
    ],
    'C': [
      3, 1, 2, 0,
      4, 0, 0, 0,
      2, 0, 0, 0,
      5, 1, 4, 0,
    ],
    'D': [
      1, 1, 2, 0,
      1, 0, 1, 0,
      1, 0, 1, 0,
      1, 1, 4, 0,
    ],
    'E': [
      1, 1, 2, 0,
      1, 2, 0, 0,
      1, 0, 0, 0,
      1, 1, 1, 0,
    ],
    'F': [
      1, 1, 1, 0,
      1, 0, 0, 0,
      1, 1, 0, 0,
      1, 0, 0, 0,
    ],
    'M': [
      1, 2, 3, 1,
      1, 5, 4, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
    ],
  };

  const positionsX = [
    0, 1, 2, 3,
    0, 1, 2, 3,
    0, 1, 2, 3,
    0, 1, 2, 3,
  ];

  const positionsY = [
    3, 3, 3, 3,
    2, 2, 2, 2,
    1, 1, 1, 1,
    0, 0, 0, 0,
  ];

  const select = (num, i) => {
    switch (num) {
      case 1:
        return (
          <group>
            <mesh position={[positionsX[i], positionsY[i], 0]}>
              <Atom />
            </mesh>
            <mesh position={[positionsX[i]+1, positionsY[i]+1, 0]} rotation={[0,0,Math.PI]}>
              <Atom />
            </mesh>
          </group>
        );
      case 2:
        return (
          <group>
            <mesh position={[positionsX[i], positionsY[i], 0]}>
              <Atom />
            </mesh>
            <mesh position={[positionsX[i]+1, positionsY[i]+1, 0]} rotation={[0,0,Math.PI]}>
              <Atom empty/>
            </mesh>
          </group>
        );
      case 3:
        return (
          <group>
            <mesh position={[positionsX[i]+1, positionsY[i], 0]} rotation={[0,0,Math.PI/2]}>
              <Atom />
            </mesh>
            <mesh position={[positionsX[i], positionsY[i]+1, 0]} rotation={[0,0,-Math.PI/2]}>
              <Atom empty/>
            </mesh>
         </group>
        );
      case 4:
        return (
          <group>
            <mesh position={[positionsX[i], positionsY[i]+1, 0]} rotation={[0,0,-Math.PI/2]}>
              <Atom />
            </mesh>
            <mesh position={[positionsX[i]+1, positionsY[i], 0]} rotation={[0,0,Math.PI/2]}>
              <Atom empty/>
            </mesh>
          </group>
        );
      case 5:
        return (
        <group>
          <mesh position={[positionsX[i]+1, positionsY[i]+1, 0]} rotation={[0,0,-Math.PI]}>
            <Atom />
          </mesh>
          <mesh position={[positionsX[i], positionsY[i], 0]}>
            <Atom empty/>
          </mesh>
        </group>
        );
      default: return (
        <group>
          <mesh position={[positionsX[i], positionsY[i], 0]}>
            <Atom empty/>
          </mesh>
          <mesh position={[positionsX[i]+1, positionsY[i]+1, 0]} rotation={[0,0,Math.PI]}>
            <Atom empty/>
          </mesh>
        </group>
      );
    }
  };

  return (
    <group
      position={[offset ? offset : 0,0,0]}
    >
      {LETTERS[letter].map((p, i) =>
        select(p, i)
      )}
    </group>
  );
}

const Atom = ({ empty }) => {
  const [hovered, setHover] = React.useState(false)
  const [ref, api] = useBox(() => ({ mass: 100, args: [1,1,1]  }))

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

  if (empty) { return null}
  return (
    <mesh
      rotation={[0,hovered ? Math.PI/4 : Math.PI/2,0]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setTimeout(() => setHover(false), 800)}
      scale={hovered ? 0.66 : 0.95}
      ref={ref}
    >
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
      <meshBasicMaterial attach="material" color={empty ? 'hotpink' : '#ededed'} side={THREE.DoubleSide} />
    </mesh>
  );
}

const Boxes = ({ number, size }) => {
  const args= [size, size, size]
  const [ref, { at }] = useBox(
    () => ({
      args,
      mass: 1,
      // position: [Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5],
    }),
    React.useRef(null),
  )
  // useFrame(() => at(Math.floor(Math.random() * number)).position.set(0, Math.random() * 2, 0))
  return (
    <instancedMesh receiveShadow castShadow ref={ref} args={[undefined, undefined, number]}>
      <boxBufferGeometry args={args}>
      </boxBufferGeometry>
      <meshLambertMaterial vertexColors />
    </instancedMesh>
  )
}