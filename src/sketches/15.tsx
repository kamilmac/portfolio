import * as THREE from 'three'
import React from 'react'
import { useGLTF, PerspectiveCamera, OrbitControls, useTexture  } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Depth, Fresnel, LayerMaterial, Noise } from 'lamina'

const SCENE = {
  "world_from_foot":   {
    "left":  [
        [ 0.983282, -0.17186271, 0.0, -0.040760472 ],
        [ 0.17170541, 0.98418272, -0.0, -0.13886115 ],
        [ -0.0, 0.0, 0.97309476, 0.0 ],
        [ 0.0, 0.0, 0.0, 1.0 ]
    ],
    "right": [
        [ 0.99338639, 0.10030435, -0.0, 0.057244677 ],
        [ -0.10025682, 0.99385726, 0.0, -0.1465496 ],
        [ 0.0, -0.0, 0.97309482, 0.0 ],
        [ 0.0, 0.0, 0.0, 1.0 ]
    ]
  },
  "world_from_ground": [
      [ 0.411093, 0.0, 0.0, 0.0 ],
      [ 0.0, 0.411093, 0.0, 0.0 ],
      [ 0.0, 0.0, 0.411093, 0.0 ],
      [ 0.0, 0.0, 0.0, 1.0 ]
  ]
};

const createMatrix = (arr) => {
  const m = new THREE.Matrix4();
  const f = arr.flatMap(e => e);
  m.set(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]);
  return m;
}


useGLTF.preload('/scanner-studio-export-glb.glb')


export default function App() {
  return (
    <Canvas
      style={{
        height: '100vh',
        // background: '#fff',
        background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(180,180,180,1) 100%)',
      }}
      gl={{
        toneMapping: THREE.LinearToneMapping,
        outputEncoding: THREE.sRGBEncoding,
      }}
    >
      {/* <pointLight
        name="Point Light"
        intensity={1}
        distance={2000}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={100}
        shadow-camera-far={2500}
        color="#fff"
        position={[633.46, 351.86, -930.44]}
        castShadow

      /> */}
      <group
        position={[0.2,0.143,0.0]}
        rotation={[-Math.PI/2,0,Math.PI/2]}
        scale={4}
      >
        <Foot
          obj={'/scan/left.obj'}
          tMatrix={SCENE.world_from_foot.left}
        />
        <Foot
          obj={'/scan/right.obj'}
          tMatrix={SCENE.world_from_foot.right}
        />
        <Ground
          tMatrix={SCENE.world_from_ground}
        />
      </group>
      {/* <Environment 
        background={false}
        files={'royal_esplanade_1k.hdr'}
        path={'/'}
      /> */}
      <hemisphereLight name="Default Ambient Light" intensity={1.0} color="#eaeaea" position={[0, 1, 0]} />
      <Scanner />
      <OrbitControls
        minPolarAngle={0.5}
        maxPolarAngle={1.5}
        rotateSpeed={0.6}
        autoRotate={true}
        autoRotateSpeed={0.5}
        enableDamping
      />
      
      <PerspectiveCamera
        name="Personal Camera"
        makeDefault={true}
        far={100000}
        near={1}
        fov={55}
        up={[0, 1, 0]}
        position={[-5,0.8,0]}
        rotation={[-2.38, 0.86, 2.51]}
      />
    </Canvas>
  );
}

const Foot = (props) => {
  const obj = useLoader(OBJLoader, props.obj);

  const geometryLeft = React.useMemo(() => {
    let g = [];
    obj.traverse((c) => { if (c.type === "Mesh") { g.push(c.geometry); } });
    return g;
  }, [ obj ]);

  return (
    <>
      {
        geometryLeft.map(g =>
          <mesh geometry={g}
            // matrix={SCENE.world_from_foot.left}
            matrixAutoUpdate={false}
            matrix={createMatrix(props.tMatrix)}
          >
            <Material />
          </mesh>
        )
      }
    </>
  );
}


const Material = () => {
  const ref = React.useRef();
  const ref2 = React.useRef();
  
  useFrame(({ clock }) => {
    // ref.current.intensity = Math.sin(clock.elapsedTime*4)/ 2 + 1;
    ref2.current.near = (Math.cos(clock.elapsedTime)) / 4;
    ref2.current.far = 1 - ((Math.cos(clock.elapsedTime)) / 4);
  })

  return (
    <LayerMaterial lighting="basic">
      <Depth
        ref={ref2}
        near={0.4854}
        far={0.7661999999999932}
        origin={[-0.4920000000000004, 0.4250000000000003, 0]}
        colorA={'#3ff233'}
        colorB={'#0079f9'}
      />
      <Fresnel
        color={'red'}
        mode={'screen'} 
      />
      <Noise
        colorA={'#4d4433'}
        colorB={'#a8a8a8'}
        colorC={'#fefefe'}
        colorD={'#fefefe'}
        alpha={0.14}
        offset={[0, 0, 0]}
        name={'noise'}
        mode={'multiply'}
        type={'cell'}
      />
    </LayerMaterial>
  );
}



const Ground = (props) => {
  const colorMap = useTexture({ map: '/scan/ground.png' });
 
  const fragmentShader = React.useMemo(
    () => `
      uniform sampler2D u_texture; 
      varying vec2 vUv;

      vec4 SHADOW_COLOR = vec4(0.0, 0.0, 0.0, 0.5);
      float BORDER = 0.1;

      float left = 1.0;
      float right = 1.0;
      vec4 pattern_color = vec4(0.0, 0.0, 0.0, 0.35);

      void main() {
        vec4 tex = texture2D(u_texture, vUv);

        float calibration_pattern = 1.0 - tex.r;
        float right_shadow = (1.0 - tex.g) * right;
        float left_shadow  = (1.0 - tex.b) * left;
        float total_shadow = min(1.0, right_shadow + left_shadow);

        // Fade out shadow towards edges to avoid sharp cutoff at image end:
        total_shadow *= smoothstep(0.0, BORDER, vUv.x);
        total_shadow *= smoothstep(0.0, BORDER, vUv.y);
        total_shadow *= smoothstep(1.0, 1.0 - BORDER, vUv.x);
        total_shadow *= smoothstep(1.0, 1.0 - BORDER, vUv.y);

        float alpha = max(calibration_pattern, total_shadow);
        vec4 pattern_color = mix(pattern_color, SHADOW_COLOR, total_shadow / alpha);
        gl_FragColor = mix(pattern_color, SHADOW_COLOR, total_shadow);
        gl_FragColor.a *= alpha;
        // gl_FragColor = tex;
      }
    `,
    [],
  );

  const vertexShader = React.useMemo(
    () => `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;
      }
    `,
    [],
  );

  return (
    <mesh receiveShadow 
      matrix={createMatrix(props.tMatrix)}
      matrixAutoUpdate={false}
    >
      <planeGeometry args={[1, 1, 64]} attach="geometry" />
      <meshStandardMaterial map={colorMap.map} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{
          u_texture: {
            value: colorMap.map
          },
        }}
        transparent
        depthWrite={false}
        depthTest
        // wireframe
      />
    </mesh>
  );
}



const Scanner = (props) => {
  const { nodes, materials } = useGLTF('/scene/scanner.glb')
  const bakedBase = useTexture("/scene/bakeBase.png")
  const bakedPlate = useTexture("/scene/bakePlate.png")
  const bakedScene = useTexture("/scene/bakeGround.png")
  
  bakedBase.flipY = false;
  bakedPlate.flipY = false;
  bakedScene.flipY = false;

  return (
    <group  dispose={null}>
      <mesh
        geometry={nodes.ground.geometry}
        // material={mat}
        material-map={bakedScene}
        scale={3}
      />
      <mesh
        // position={[4.36, 0.05, 0]}
        // rotation={[0, Math.PI / 2, 0]}
        castShadow
      >
        <bufferGeometry {...nodes.base.geometry} />
        <meshBasicMaterial map={bakedBase} />
      </mesh>
      <mesh
        // position={[4.36, 0.13, 0]}
        // rotation={[0, Math.PI / 2, 0]}
      >
        <bufferGeometry {...nodes.plate.geometry} />
        <meshBasicMaterial map={bakedPlate} />
      </mesh>
      {/* <group>
        <Dots
          center={[4.62, 0.155, 0]}
          dist={0.68}
          dotSize={0.06}
        />  
      </group> */}
    </group>
  );
}




const Dots = (props) => {
  const dist = props.dist;
  const distSmall = props.dist*0.8;
  const dots = [
    [
      0,
      dist,
    ],
    [
      dist,
      0,
    ],
    [
      -dist,
      0,
    ],
    [
      0,
      -dist,
    ],
  ]
  const dotsSmall = [
    [
      distSmall,
      distSmall,
    ],
    [
      distSmall,
      -distSmall,
    ],
    [
      -distSmall,
      distSmall,
    ],
    [
      -distSmall,
      -distSmall,
    ],
  ]
  return (
    <>
      <group>
        {
          dots.map(d =>
            <mesh
              geometry={new THREE.CircleGeometry( props.dotSize, 62 )}
              material={new THREE.MeshBasicMaterial( { color: '#222' } )}
              position={[props.center[0] + d[0], props.center[1], props.center[2] + d[1]]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          )
        }
      </group>
      <group>
        {
          dotsSmall.map(d =>
            <mesh
              geometry={new THREE.CircleGeometry( props.dotSize*0.7, 62 )}
              material={new THREE.MeshBasicMaterial( { color: '#222' } )}
              position={[props.center[0] + d[0], props.center[1], props.center[2] + d[1]]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          )
        }
      </group>
    </>
  )
}