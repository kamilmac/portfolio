/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/feetShoe2.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.left.geometry} material={nodes.left.material} />
      <group position={[-0.01, 0.06, -0.15]} rotation={[Math.PI, Math.PI / 2, 0]} scale={[-0.17, -0.17, -0.18]}>
        <mesh geometry={nodes.shoe_1.geometry} material={materials.laces} />
        <mesh geometry={nodes.shoe_2.geometry} material={materials.mesh} />
        <mesh geometry={nodes.shoe_3.geometry} material={materials.caps} />
        <mesh geometry={nodes.shoe_4.geometry} material={materials.inner} />
        <mesh geometry={nodes.shoe_5.geometry} material={materials.sole} />
        <mesh geometry={nodes.shoe_6.geometry} material={materials.stripes} />
        <mesh geometry={nodes.shoe_7.geometry} material={materials.band} />
        <mesh geometry={nodes.shoe_8.geometry} material={materials.patch} />
      </group>
    </group>
  )
}

useGLTF.preload('/feetShoe2.glb')