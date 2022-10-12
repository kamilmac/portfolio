import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React from 'react'
import { Environment, MeshReflectorMaterial, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
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
              roughness={0.14} aoMap={materials['glass mat'].aoMap} color={'#f9d6ce'} aoMapIntensity={1} /> :
          </mesh>
          <mesh>
            <bufferGeometry { ...nodes.binding.geometry } />
            <meshStandardMaterial roughness={0.55} metalness={0.3} aoMap={materials['binding mat'].aoMap} color={'#000'} aoMapIntensity={1} /> :
          </mesh>
          <mesh>
            <bufferGeometry { ...nodes.tubes.geometry } />
            <meshStandardMaterial roughness={0.1} metalness={0.3} aoMap={materials['tubes mat'].aoMap} color={'#000'} aoMapIntensity={1} /> :
          </mesh>
          <LightSphere />
          <LightSphere />
          <LightSphere />
          <LightSphere />
          <LightSphere />
          <LightSphere />
          <LightSphere />
          <LightSphere />
          
        </group>
        {/* <mesh position={[0, 0, -0.3]} rotation={[0 , 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial
            color="#151515"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh> */}
        <fog attach="fog" args={['#17171b', -1, 1.4]} />
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
          position={[-0.5,0,0.6]}
          rotation={[-2.38, 0.86, 2.51]}
        />
        <EffectComposer>
          <DepthOfField focusDistance={0.5} focalLength={1.3} bokehScale={4} height={480} />
          <Noise opacity={0.06} />
        </EffectComposer>
        {/* <fog attach="fog" args={['#17171b', 30, 40]} /> */}

      </Canvas>
    </>
  );
}



const getRand = () => {
  return Math.random() * 0.1 - 0.05;
}


const LightSphere = () => {
  const ref = React.useRef();
  const left = getRand() > 0 ? true : false;
  const positions = [
    {
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      gravity: 1,
    },
    {
      position: {
        x: getRand(),
        y: -0.1 - getRand(), // -0.1 : -0.15
        z: getRand(),
      },
      gravity: 1,
    },
    {
      position: {
        x: getRand() * 3,
        y: 0.1 + getRand(),
        z: 0.2 + getRand(),
      },
      gravity: 1,
    },
    {
      position: {
        x: left ? 0.2 : -0.2,
        y: 0.1 + getRand(),
        z: 0.2 + getRand(),
      },
      gravity: 1,
    },
    {
      position: {
        x: left ? 0.2 : -0.2,
        y: 0.15 + getRand(),
        z: -0.2 + getRand(),
      },
      gravity: 1,
    },
    {
      position: {
        x: left ? -0.2 : 0.2,
        y: 0.15 + getRand(),
        z: -0.2 + getRand(),
      },
      gravity: 1,
    },
    {
      position: {
        x: left ? -0.2 : 0.2,
        y: 0.15 + getRand(),
        z: 0.2 + getRand(),
      },
      gravity: 1,
    },
    {
      position: {
        x: 0,
        y: 0.1,
        z: 0.1,
      },
      gravity: 1,
    }
  ]
  let pI = 0;
  let momentum = [0,0,0]
  let acceleration = 0.03
  
  React.useEffect(() => {
    setInterval(() => {
      if (positions[pI+1]) {
        pI += 1;
      } else {
        pI = 0;
      }
    }, 2500);
  }, [])

  const updateMomentum = (curr, target, i) => {
    const diff = target - curr;
    const dir = diff > 0 ? +1 : -1;
    momentum[i] = (momentum[i] + acceleration * dir) * Math.abs(diff); 
  }

  useFrame((state, delta) => {
    if (!ref.current) { return; }
    const targetPos = positions[pI];
    
    updateMomentum(ref.current.position.x, targetPos.position.x, 0);
    updateMomentum(ref.current.position.y, targetPos.position.y, 1);
    updateMomentum(ref.current.position.z, targetPos.position.z, 2);

    ref.current.position.x += momentum[0];
    ref.current.position.y += momentum[1];
    ref.current.position.z += momentum[2];
  });

  return (
    <mesh
      position={[0,0,0]}
      ref={ref}
    >
      <sphereBufferGeometry args={[0.005, 32, 32]} />
      <meshStandardMaterial emissive={'hotpink'} color={'black'} roughness={1} emissiveIntensity={3}/>
      <pointLight color={'hotpink'} intensity={0.1}/>
    </mesh>
  );
};
