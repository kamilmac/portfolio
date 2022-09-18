import React from "react";
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import { GradientMaterial } from "./materials";


export const Scanner = (props) => {
  const emptyPointer = React.useRef();
  const shoes = React.useRef();
  let cam = null

  useThree(({camera}) => {
    cam = camera;
  });
  const { nodes, materials } = useGLTF('/scene/scanner-scene-2.glb')
  
  console.log({nodes});
  console.log({materials});
  
  useFrame(() => {
    if (emptyPointer.current) {
      const pos = props.activeStep === 0 ? nodes.shoePointer.position.clone() : nodes.feetContourPointer.position.clone();
      // cam.updateMatrixWorld()
      pos.project(cam)
      const DD = (v) => Math.floor(v)
      const posX = Math.floor(pos.x*(window.innerWidth/2) + window.innerWidth/2);
      const posY = Math.floor(pos.y*(window.innerHeight/2) + window.innerHeight/2);
      props.onPositionUpdate(posX, posY)
    }
  }, [emptyPointer.current])

  return (
    <group  dispose={null}>
      <mesh
        ref={emptyPointer}
        geometry={nodes.shoePointer.geometry}
        position={nodes.shoePointer.position}
      >
      </mesh>

      <mesh
        ref={emptyPointer}
        geometry={nodes.feetContourPointer.geometry}
        position={nodes.feetContourPointer.position}
      >
      </mesh>

      <mesh>
        <bufferGeometry {...nodes.ground.geometry} />
        <meshBasicMaterial aoMap={materials['ALL.001'].aoMap} color={'#ffffff'} aoMapIntensity={1} alphaMap={materials['ALL.001'].map} transparent={true}/>
      </mesh>

      <mesh>
        <bufferGeometry {...nodes.base.geometry} />
        <meshBasicMaterial aoMap={materials['ALL.002'].aoMap} color={'white'}  aoMapIntensity={1}/>
      </mesh>

      <mesh>
        <bufferGeometry {...nodes.plate.geometry} />
        <meshBasicMaterial aoMap={materials['ALL'].aoMap} color={'white'}  aoMapIntensity={1}/>
      </mesh>

      { props.activeStep === 1 &&
        <mesh>
          <bufferGeometry {...nodes.feetPlaceholder.geometry} />
          <GradientMaterial />
        </mesh>
      }

      <group
        ref={shoes}
      >
        <mesh>
          <bufferGeometry {...nodes.shoeGround.geometry} />
          <meshBasicMaterial alphaMap={materials['shoeGround'].aoMap} color={'#111'} transparent={true}/>
        </mesh>
              
        <mesh
        >
          <bufferGeometry {...nodes.shoeRight001.geometry} />
          {
            props.activeStep === 0 ?
              <GradientMaterial /> :
              <meshBasicMaterial aoMap={materials['shoeRightMat.001'].aoMap} color={'white'} aoMapIntensity={1}/>
          }
        </mesh>

        <mesh>
          <bufferGeometry {...nodes.shoeRight.geometry} />
          {
            props.activeStep === 0 ?
              <GradientMaterial /> :
              <meshBasicMaterial aoMap={materials['shoeRightMat'].aoMap} color={'white'} aoMapIntensity={1}/>
          }
        </mesh>
      </group>
    </group>
  );
}