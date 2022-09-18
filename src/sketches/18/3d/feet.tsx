import * as THREE from 'three'
import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GradientMaterial } from "./materials";

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

export const Feet = () => {
  const step = 0;

  return(
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
            <GradientMaterial />
          </mesh>
        )
      }
    </>
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

