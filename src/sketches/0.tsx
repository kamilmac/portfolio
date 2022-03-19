import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const Box: React.FC<JSX.IntrinsicElements['mesh']> = (props) => {
  const ref = React.useRef()
  const [hovered, hover] = React.useState(false)
  const [clicked, click] = React.useState(false)

  useFrame((state, delta) => {
    ref.current.rotation.x += 0.01
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
        <sphereGeometry args={[1, 16, 16]} />
        <meshNormalMaterial flatShading />
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
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <camera position={[3,3,3]}/>
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