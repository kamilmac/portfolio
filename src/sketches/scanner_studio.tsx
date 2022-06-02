/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'

import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/scanner-studio-export-glb.glb')
  const bakedBase = useTexture("/scanner-base-material-sub.jpg")
  const bakedPlate = useTexture("/scanner-plate-material-sub.jpg")
  const bakedScene = useTexture("/scene-material-sub.jpg")
  bakedBase.flipY = false;
  bakedPlate.flipY = false;
  bakedScene.flipY = false;
  // const bakedScene = new THREE.MeshBasicMaterial( { color: 0xffff00 } )}
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Scene_1.geometry}
        // material={materials.Backdrop}
        material-map={bakedScene}
        scale={10.43}
      />
      <mesh
        geometry={nodes.Scanner_base.geometry}
        // material={materials['Scanner base']}
        // material={new THREE.MeshBasicMaterial( { color: 0xffff00 } )}
        material-map={bakedBase}
        position={[4.36, 0.05, 0]}
        rotation={[0, Math.PI / 2, 0]} />
      <mesh
        geometry={nodes.Scanner_plate.geometry}
        // material={materials['Scanner plate']}
        material-map={bakedPlate}
        position={[4.36, 0.13, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  )
}

useGLTF.preload('/scanner-studio-export-glb.glb')
