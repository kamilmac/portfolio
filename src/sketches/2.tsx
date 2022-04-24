import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const COLORS = [
  '#9B2915',
  '#E9B44C',
  '#E4D6A7',
  '#1C110A',
  '#50A2A7'
];

const NUM_OF_BOXES = 800;
const MAX_POSITION_DEVIATION = 10;

const boxes = [...Array(NUM_OF_BOXES).fill({})]
  .map(b => ({
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    position: [
      Math.floor(Math.random() * (MAX_POSITION_DEVIATION*2) - MAX_POSITION_DEVIATION),
      Math.floor(Math.random() * (MAX_POSITION_DEVIATION*2) - MAX_POSITION_DEVIATION),
      Math.floor(Math.random() * (MAX_POSITION_DEVIATION*2) - MAX_POSITION_DEVIATION),
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
      <orthographicCamera position={[6,6,6]}/>
    </Canvas>
  );
}

const Light = () => {
  const ref = React.useRef()
  useFrame((state, delta) => {
    if (ref?.current) {
      ref.current.position.y += 0.01
    }
  })
  return (
    <pointLight ref={ref} position={[-1, 10, 10]} color="red" intensity={4}/>
  )
}

export default App;