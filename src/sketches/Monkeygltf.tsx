/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/monkeygltf.gltf')
  console.log('HERE', nodes)
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} position={[0, 0, 0]} />
      <mesh geometry={nodes.Suzanne.geometry} material={nodes.Suzanne.material} position={[0, 1, 0]} scale={[0.57, 0.52, 0.56]} />
    </group>
  )
}

useGLTF.preload('/monkeygltf.gltf')
