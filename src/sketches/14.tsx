import * as THREE from 'three'
import React from 'react'
import { Sphere, Text, shaderMaterial, PerspectiveCamera, OrbitControls, Environment, useTexture } from '@react-three/drei'
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Depth, Fresnel, LayerMaterial, Noise } from 'lamina'


const fragmentShader = `
uniform sampler2D u_texture; 
varying vec2 vUv;

vec4 SHADOW_COLOR = vec4(0.0, 0.0, 0.0, 1.0);
float BORDER = 0.1;

float left = 1.0;
float right = 1.0;
vec4 pattern_color = vec4(0.0, 1.0, 1.0, 1.0);

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
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
`;


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
}
const createMatrix = (arr) => {
  const m = new THREE.Matrix4();
  const f = arr.flatMap(e => e);
  m.set(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]);
  return m;
}

const HDRI = 'royal_esplanade_1k.hdr'

const Material = () => 
  // <meshPhysicalMaterial attach="material" color={"white"} side={THREE.DoubleSide}
  //   roughness={0.15}
  //   thickness={0}
  //   flatShading={false}
  // />
  <LayerMaterial
    color="white"
    lighting="physical"
    roughness={0.1}
    transmission={0}
  >
  </LayerMaterial>

const Floor = () => {
  const ref = React.useRef();
  const ref2 = React.useRef();

  // useFrame(({ clock }) => {
  //   ref2.current.scale = (Math.sin(clock.elapsedTime)+ 4) * 20;
  // })

  return (
    <meshStandardMaterial attach="material" color={"hotpink"} side={THREE.DoubleSide} />
  )
}


const Ground = () => {
  // const [uniforms, setUniforms] = React.useState({
  //   u_texture: {
  //     value: null,
  //   },
  // });
  const colorMap = useTexture({
    map: '/scan/ground.png',
  }, (finished) => { console.log('loaded', finished)});

  // React.useEffect(
  //   () => {
  //     console.log({colorMap});
  //     if (colorMap) {
  //       setUniforms({
  //         u_texture: {
  //           value: colorMap.map,
  //         },
  //       });
  //     }
  //   },
  //   [colorMap]
  // );
  console.log({colorMap});
  
  return (
    <mesh receiveShadow 
      matrix={createMatrix(SCENE.world_from_ground)}
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

export default function App() {
  const oleft= useLoader(OBJLoader, '/scan/left.obj');
  const oright = useLoader(OBJLoader, '/scan/right.obj');

  const geoLeft = React.useMemo(() => {
    let g = [];
    oleft.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g.push(_c.geometry);
      }
    });
    return g;
  }, [oleft]);
  
  const geoRight = React.useMemo(() => {
    let g = [];
    oright.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g.push(_c.geometry);
      }
    });
    return g;
  }, [oright]);

  setTimeout(() => {
  }, 1000)

  return (
    <Canvas
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      style={{
        height: '100vh',
        background: '#fefefe'
      }}
      onCreated={state => {
        state.gl.toneMapping =  THREE.ACESFilmicToneMapping;
        console.log({state})
      }}
      shadows
      linear
    >
        {/* <ambientLight intensity={0.25} /> */}

      {/* <directionalLight
        name="Directional Light"
        castShadow
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={2500}
        shadow-camera-left={-1250}
        shadow-camera-right={1250}
        shadow-camera-top={1250}
        shadow-camera-bottom={-1250}
        position={[-.06,-.06,1]}
      /> */}
        {/* <ambientLight intensity={0.5} /> */}
        <PerspectiveCamera
          makeDefault
          aspect={1200 / 600}
          // fov={60}
          up={[0,-1,0]}
          position={[0, 0, 1]}
        />
        <group
          // rotation={[0,Math.PI,0]}
        >
          {
            geoLeft.map(g => 
              <mesh geometry={g}
                // matrix={SCENE.world_from_foot.left}
                matrixAutoUpdate={false}
                matrix={createMatrix(SCENE.world_from_foot.left)}
                receiveShadow castShadow>
                <Material />
              </mesh>
            )
          }
          {
            geoRight.map(g => 
              <mesh 
                geometry={g} receiveShadow castShadow
                matrixAutoUpdate={false}
                matrix={createMatrix(SCENE.world_from_foot.right)}  
              >
                <Material/>
              </mesh>
            )
          }
        </group>
      <Environment 
        background={false} // Whether to affect scene.background
        files={HDRI}
        path={'/'}
      />
      <Ground />
      <OrbitControls
        maxPolarAngle={Math.PI/2}
      />
    </Canvas>
  );
}
   