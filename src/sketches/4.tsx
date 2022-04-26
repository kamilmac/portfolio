import * as THREE from 'three'
import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { LayerMaterial, Depth, Noise } from 'lamina'

import { MeshWobbleMaterial, MeshReflectorMaterial, Torus, Text, OrthographicCamera } from '@react-three/drei'

const COLORS = [
  '#9B2915',
  '#E9B44C',
  '#E4D6A7',
  '#1C110A',
  '#50A2A7'
];

const NUM_OF_BOXES = 1000000;
const MAX_POSITION_DEVIATION = 200;

const boxes = [...Array(NUM_OF_BOXES).fill({})]
  .map(b => ({
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    position: [
      Math.random() * (MAX_POSITION_DEVIATION*2) - MAX_POSITION_DEVIATION,
      Math.random() * (MAX_POSITION_DEVIATION*2) - MAX_POSITION_DEVIATION,
      Math.random() * (MAX_POSITION_DEVIATION*2) - MAX_POSITION_DEVIATION,
    ],
  }));

const Box: React.FC<JSX.IntrinsicElements['mesh']> = ({count = NUM_OF_BOXES, temp = new THREE.Object3D()}) => {
  const ref = React.useRef()

  React.useEffect(() => {
    // Set positions
    for (let i = 0; i < count; i++) {
      temp.position.set(boxes[i].position[0], boxes[i].position[1], boxes[i].position[2])
      temp.updateMatrix()
      ref.current.setMatrixAt(i, temp.matrix)
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={ref} args={[10, 100, count]}>
      <boxGeometry />
      <meshPhongMaterial />
    </instancedMesh>
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
      <Box />
      <Camera />
      <Bg />
      
    </Canvas>
  );
}
let t = 0;
const Camera: React.FC = () => {
  const ref = React.useRef()
  const v = new THREE.Vector3()
  useFrame((state, delta) => {
    t = delta + t;
    // state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 6), delta)
    state.camera.position.x = Math.sin(t) * 20;
    state.camera.position.y = Math.cos(t) * 20;
    state.camera.lookAt(v);
  })

  return (
    <OrthographicCamera
      ref={ref}
      position={[10, 10,10]}
    />
  )
}

const Light = () => {
  const ref = React.useRef()
 
  return (
    <pointLight ref={ref} position={[-1, 10, 10]} color="red" intensity={16}/>
  )
}

function Bg() {
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth colorB={'#333'} colorA={'#222'} alpha={1} mode="normal" near={100} far={200} origin={[-100, 100, -100]} />
        <Noise mapping="local" type="white" scale={100} colorA="white" colorB="black" mode="subtract" alpha={0.2} />
      </LayerMaterial>
    </mesh>
  )
}

export default App;