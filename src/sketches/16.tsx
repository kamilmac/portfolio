import * as THREE from 'three'
import React from 'react'
import { useGLTF, PerspectiveCamera, OrbitControls, useTexture, Edges, Html  } from '@react-three/drei'
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


useGLTF.preload('/scene/scanner-scene-2.glb')


const Instructions = () => {
  return (
    <div
      style={{
        position: 'relative',
        // background: 'white',
        width: 'fit-content',
        padding: 48,
        borderRadius: 12,
        fontSize: 48,
        margin: '0 auto',
        top: 150,
        color: 'white',
      }}
    >
      <div>
        Take of your shoes.
      </div>
    </div>
  );
}


export default function App() {
  const [step, setStep] = React.useState(0);
  return (
    <>
      <Canvas
        style={{
          height: '100vh',
          // background: '#bbb',
          background: 'linear-gradient(45deg, rgba(180,180,180,1) 0%, rgba(240,240,240,1) 100%)',
          // backgroundImage: 'url(https://blenderartists.org/uploads/default/original/4X/7/e/2/7e2d7bea4ac21388c4a96e1371f375c4ce00094b.jpg)'
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
          { step === 1 &&
            <>
              <Foot
                obj={'/scan/left.obj'}
                tMatrix={SCENE.world_from_foot.left}
              />
              <Foot
                obj={'/scan/right.obj'}
                tMatrix={SCENE.world_from_foot.right}
              />
            </>
          }
          <Ground
            step={step}
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
          autoRotateSpeed={0.3}
          enableDamping
        />
        
        <PerspectiveCamera
          name="Personal Camera"
          makeDefault={true}
          far={100000}
          near={1}
          fov={45}
          up={[0, 1, 0]}
          position={[6, 4, 3]}
          rotation={[-2.38, 0.86, 2.51]}
        />
      </Canvas>
      {/* <div
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        <Instructions />
      </div> */}
    </>
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
  const dotsOnly = true;
  const colorMap = useTexture({ map: '/scan/ground.png' });
 
  const fragmentShader = React.useMemo(
    () => `
      uniform sampler2D u_texture; 
      uniform float u_shadow_opacity; 
      varying vec2 vUv;

      
      float BORDER = 0.1;

      float left = 1.0;
      float right = 1.0;
      vec4 pattern_color = vec4(0.0, 0.0, 0.0, 0.35);

      void main() {
        vec4 tex = texture2D(u_texture, vUv);
        vec4 SHADOW_COLOR = vec4(0.0, 0.0, 0.0, u_shadow_opacity);

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
          u_shadow_opacity: {
            value: props.step > 0 ? 0.5 : 0
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
  const { nodes, materials } = useGLTF('/scene/scanner-scene-2.glb')
  
  console.log({nodes});
  console.log({materials});
  return (
    <group  dispose={null}>
      <mesh
        geometry={nodes.ground.geometry}
        // material={materials['ALL.001']}
      >
        <meshBasicMaterial aoMap={materials['ALL.001'].aoMap} color={'white'} aoMapIntensity={1} alphaMap={materials['ALL.001'].map} transparent={true}/>
      </mesh>
      <mesh
        // position={[4.36, 0.05, 0]}
        // rotation={[0, Math.PI / 2, 0]}
        castShadow
      >
        <bufferGeometry {...nodes.base.geometry} />
        <meshBasicMaterial aoMap={materials['ALL.002'].aoMap} color={'white'}  aoMapIntensity={1}/>
      </mesh>
      <mesh
        // position={[4.36, 0.13, 0]}
        // rotation={[0, Math.PI / 2, 0]}
      >
        <bufferGeometry {...nodes.plate.geometry} />
        <meshBasicMaterial aoMap={materials['ALL'].aoMap} color={'white'}  aoMapIntensity={1}/>
      </mesh>
      
      <group
        // position={[2.36, 0.01, 0]}
      >
        <mesh
          // rotation={[Math.PI / 2, 0, 0]}
        >
          <bufferGeometry {...nodes.shoeGround.geometry} />
          <meshBasicMaterial alphaMap={materials['shoeGround'].aoMap} color={'#111'} transparent={true}/>
          
        </mesh>
              
        <mesh
          // rotation={[0, Math.PI / 2, 0]}
        >
          <bufferGeometry {...nodes.shoeRight001.geometry} />
          {/* <meshBasicMaterial aoMap={materials['shoeRightMat.001'].aoMap} color={'white'}aoMapIntensity={1} /> */}
          <Material />
          
        </mesh>
        <mesh
          // rotation={[0, Math.PI / 2, 0]}
          // position={[0, 0.41, 0.1]}
        >
          <bufferGeometry {...nodes.shoeRight.geometry} />
          {/* <meshBasicMaterial aoMap={materials['shoeRightMat'].aoMap} color={'white'} aoMapIntensity={1}/> */}
          <Material />
         
        </mesh>
      </group>
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