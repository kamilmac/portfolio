import * as THREE from 'three'
import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { LayerMaterial, Depth, Noise } from 'lamina'

const COLORS = [
  '#9B2915',
  '#E9B44C',
  '#E4D6A7',
  '#1C110A',
  '#50A2A7'
];

const NUM_OF_BOXES = 100;
const MAX_POSITION_DEVIATION = 2;

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
    ref.current.rotation.x += 0.001
    ref.current.rotation.y += 0.001
  })

  return (
    <>
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <boxGeometry args={props.position} />
        <meshBasicMaterial color={props.color} />
      </mesh>
    </>
  )
}

const App: React.FC = () => {
  return (
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
    </Canvas>
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
  useFrame((state, delta) => {
    if (ref?.current) {
      ref.current.intensity += 10;
    }
  })
  return (
    <pointLight ref={ref} position={[-1, 10, 10]} color="red" intensity={4}/>
  )
}

function Bg() {
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth colorB={COLORS[0]} colorA={COLORS[1]} alpha={1} mode="normal" near={10} far={200} origin={[-100, 100, -100]} />
        <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="black" mode="subtract" alpha={0.2} />
      </LayerMaterial>
    </mesh>
  )
}

export default App;