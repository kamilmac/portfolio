import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import React from 'react'
import { Environment, MeshReflectorMaterial, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { Clock, TextureLoader, Vector3 } from 'three'

useGLTF.preload('/astrohead.glb')

export default function App() {
  const { nodes, materials } = useGLTF('/astrohead.glb')
  const glass = React.useRef();
  console.log(nodes, materials);
  
  const noiseMap = useLoader(TextureLoader, 'noise.jpg');
  noiseMap.repeat.set(32,32)
  noiseMap.offset.set( 0, 0 );
  noiseMap.wrapS = noiseMap.wrapT = THREE.RepeatWrapping;
  console.log(noiseMap);
  
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
          <mesh >
            <bufferGeometry { ...nodes.base.geometry } />
            <meshStandardMaterial roughness={0.25} metalness={0.3} aoMap={materials['base mat'].aoMap} color={'#666'} aoMapIntensity={1} /> :
          </mesh>
          <mesh>
            <bufferGeometry { ...nodes.glass.geometry } />
            <meshStandardMaterial
              ref={glass}
              toneMapped={false} fog={true}
              roughness={0.35} aoMap={materials['glass mat'].aoMap} color={'#555'} aoMapIntensity={1} /> :
          </mesh>
          <mesh>
            <bufferGeometry { ...nodes.binding.geometry } />
            <meshStandardMaterial roughness={0.55} metalness={0.3} aoMap={materials['binding mat'].aoMap} color={'#000'} aoMapIntensity={1} /> :
          </mesh>
          <mesh>
            <bufferGeometry { ...nodes.tubes.geometry } />
            <meshStandardMaterial roughness={0.1} metalness={0.3} aoMap={materials['tubes mat'].aoMap} color={'#000'} aoMapIntensity={1} /> :
          </mesh>
          <LightSphere glass={glass} />
          <LightSphere />
          <LightSphere />
          <LightSphere />
          <LightSphere />
          <LightSphere />
          <LightSphere />
          <LightSphere />
          
        </group>
        <mesh position={[0, 0, 0.4]} rotation={[0 , 0, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshPhysicalMaterial
            color={'#ffffff'}
            // roughnessMap={noiseMap}
            metalness={0.2}
            roughness={0.93}
            transmission={0.8}
            opacity={0.8}
            transparent={true}
            reflectivity={0.44}
            envMapIntensity={0.1}
            map={noiseMap}
            // bumpMap={noiseMap}
            // alphaMap={noiseMap}
            // envMap={noiseMap}
            // lightMap={noiseMap}
          />
        </mesh>
        {/* <color attach="background" args={['#17171b']} /> */}
        <Environment
          background={false}
          preset='forest'
        />
        
        <Camera />      
        {/* <EffectComposer>
          <Noise opacity={0.06} />
        </EffectComposer> */}

      </Canvas>
    </>
  );
}


const Camera = () => {
  const { viewport } = useThree();
  const ref = React.useRef();
  useFrame(({ mouse }) => {
    if (!ref.current) { return null; }
    const x = (mouse.x * viewport.width) / 2 / 60
    const y = (mouse.y * viewport.height) / 2 / 80
    ref.current.position.set(x, y, 0.6)
    ref.current.lookAt(new Vector3(0,0,0));
  })
 return (
  <PerspectiveCamera
    ref={ref}
    name="Personal Camera"
    makeDefault={true}
    far={3}
    near={0.1}
    fov={70}
    up={[0, 1, 0]}
  />
 );
}


const getRand = () => {
  return Math.random() * 0.1 - 0.05;
}


const LightSphere = (props) => {
  const ref = React.useRef();
  const left = getRand() > 0 ? true : false;
  const positions = [
    {
      position: {
        x: 0,
        y: 0.14,
        z: 0,
      },
      next: 2000,
      scale: 1,
      helmetOff: true,
    },
    {
      position: {
        x: 0,
        y: 0.14,
        z: 0,
      },
      next: 800,
      scale: 1,
    },
    {
      position: {
        x: getRand(),
        y: -0.1 - getRand(), // -0.1 : -0.15
        z: getRand(),
      },
      next: 1600,
      scale: 1,
    },
    {
      position: {
        x: getRand() * 3,
        y: 0.1 + getRand(),
        z: 0.2 + getRand(),
      },
      next: 1600,
      scale: 1,
    },
    {
      position: {
        x: left ? 0.2 : -0.2,
        y: 0.1 + getRand(),
        z: 0.2 + getRand(),
      },
      next: 1600,
      scale: 1,
    },
    {
      position: {
        x: left ? 0.22 : -0.22,
        y: 0.15 + getRand(),
        z: -0.2 + getRand(),
      },
      next: 1600,
      scale: 1,
    },
    {
      position: {
        x: left ? -0.23 : 0.23,
        y: 0.15 + getRand(),
        z: -0.2 + getRand(),
      },
      next: 1600,
      scale: 1,
    },
    {
      position: {
        x: left ? -0.2 : 0.2,
        y: 0.15 + getRand(),
        z: 0.2 + getRand(),
      },
      next: 1600,
      scale: 1,
    },
    {
      position: {
        x: 0,
        y: 0.14,
        z: 0.1,
      },
      next: 600,
      scale: 0,
    },
  ]
  let pI = 0;
  let momentum = [0,0,0]
  let acceleration = 0.04 + getRand()/8
  
  React.useEffect(() => {
    setTimeout(() => {
      next()
    }, positions[pI].next);
  }, [])

  const next = () => {
    if (positions[pI+1]) {
      pI += 1;
    } else {
      pI = 0;
    }
    setTimeout(next, positions[pI].next)
  }

  const updateMomentum = (curr, target, i, fast, delta) => {
    const diff = target - curr;
    const dir = diff > 0 ? +1 : -1;
    const deltaAcc = acceleration * delta * 120;
    const acc = fast ? deltaAcc*4 : deltaAcc;

    return (momentum[i] + acc * dir) * Math.abs(diff);
  }

  useFrame((state, delta) => {
    if (!ref.current) { return; }
    // console.log(Math.floor(state.clock.elapsedTime*10));
    
    
    // if (!Math.floor(state.clock.elapsedTime) % 10) {
    //   console.log('yo');
      
    // }
    
    const targetPos = positions[pI];
    
    ref.current.position.x += updateMomentum(ref.current.position.x, targetPos.position.x, 0, pI === positions.length-1, delta);
    ref.current.position.y += updateMomentum(ref.current.position.y, targetPos.position.y, 1, pI === positions.length-1, delta);
    ref.current.position.z += updateMomentum(ref.current.position.z, targetPos.position.z, 2, pI === positions.length-1, delta);
    
    if (props.glass?.current) {
      if (targetPos.helmetOff) {
        props.glass.current.color.lerp(new THREE.Color("#666"), delta*20);
        props.glass.current.roughness = 0.35;
      } else {
        props.glass.current.color.lerp(new THREE.Color("#f9d6ce"), delta/2.4);
        props.glass.current.roughness = 0.12;
      }
    }

    ref.current.scale.lerp(new THREE.Vector3(targetPos.scale, targetPos.scale, targetPos.scale), delta*8);
  });

  return (
    <mesh
      position={[0,0,0]}
      ref={ref}
    >
      <sphereBufferGeometry args={[0.005 + getRand()/64, 32, 32]} />
      <meshStandardMaterial emissive={'hotpink'} color={'black'} roughness={1} emissiveIntensity={3}/>
      <pointLight color={'hotpink'} intensity={0.05}/>
    </mesh>
  );
};
