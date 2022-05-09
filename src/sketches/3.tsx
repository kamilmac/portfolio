import * as THREE from 'three'
import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { LayerMaterial, Depth, Noise } from 'lamina'

import { MeshWobbleMaterial, MeshReflectorMaterial, Torus, Text } from '@react-three/drei'

const COLORS = [
  '#9B2915',
  '#E9B44C',
  '#E4D6A7',
  '#1C110A',
  '#50A2A7'
];

const NUM_OF_BOXES = 100;
const MAX_POSITION_DEVIATION = 10;

const boxes = [...Array(NUM_OF_BOXES).fill({})]
  .map(b => ({
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    position: [
      Math.random() * (MAX_POSITION_DEVIATION*2) - MAX_POSITION_DEVIATION,
      Math.random() * (MAX_POSITION_DEVIATION*2) - MAX_POSITION_DEVIATION,
      Math.random() * (MAX_POSITION_DEVIATION*2) - MAX_POSITION_DEVIATION,
    ],
  }));

const Box: React.FC<JSX.IntrinsicElements['mesh']> = (props) => {
  const ref = React.useRef()
  const [hovered, hover] = React.useState(false)
  const [clicked, click] = React.useState(false)

  useFrame((state, delta) => {
    ref.current.rotation.x += props.position[2] / 1000
    ref.current.rotation.y += props.position[2] / 1000
  })

  return (
    <Torus ref={ref} args={[2, props.position[2] / 80, 50, 128]}>
      <MeshWobbleMaterial attach="material" factor={1} speed={1} color={props.color} />
    </Torus>
  )
}

const App: React.FC = () => {
  return (
    <div>
      <Canvas
        style={{
          height: '100vh',
        }}
      >
        <Light />
        {
          boxes.map(b => (
            <Box position={b.position} color={b.color}/>
          ))
        }
        <Camera />
        <Bg />
        {/* <Text
          glyphGeometryDetail={32}
          fontSize={2}
          letterSpacing={-0.075}
          lineHeight={0.8}
          position={[0, 0, 3]}>
          {'3'}
          <MeshWobbleMaterial attach="material" color="black" factor={1} />
        </Text> */}
      </Canvas>
    </div>
  );
}

const Camera: React.FC = () => {
  const ref = React.useRef()
  const v = new THREE.Vector3()
  useFrame((state, delta) => {
    state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 6), delta)
  })

  return (
    <camera
      ref={ref}
      position={[10, 10,10]}
    />
  )
}

const Light = () => {
  const ref = React.useRef()
 
  return (
    <pointLight ref={ref} position={[-1, 10, 10]} color="red" intensity={86}/>
  )
}

function Bg() {
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth colorB={COLORS[3]} colorA={COLORS[4]} alpha={1} mode="normal" near={100} far={200} origin={[-100, 100, -100]} />
        <Noise mapping="local" type="white" scale={100} colorA="white" colorB="black" mode="subtract" alpha={0.2} />
      </LayerMaterial>
    </mesh>
  )
}

export default App;