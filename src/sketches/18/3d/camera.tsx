import { PerspectiveCamera, OrbitControls  } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';

const POSITIONS = [
  new THREE.Vector3(5, 2, 2),
  new THREE.Vector3(1, 4, 2),
  new THREE.Vector3(1.3, 0.3, 1.3),
];

const pos = new THREE.Vector3(5, 2, 1)

let skipLerp = false;

export const Camera = (props) => {
  React.useEffect(() => {
    const c = document.getElementsByTagName('canvas')[0];
    c.addEventListener('touchstart', () => skipLerp = true);
    c.addEventListener('click', () => skipLerp = true);
    return () => {
      c.removeEventListener('touchstart');
      c.removeEventListener('click');
    }
  }, [])
  
  useFrame((state) => {
    if (props.activeStep === 0 && state.clock.elapsedTime < 4 && !skipLerp) {
      state.camera.position.lerp(POSITIONS[props.activeStep], 0.08)
    }
    
    if (props.activeStep === 1) {
      state.camera.position.lerp(POSITIONS[props.activeStep], 0.08)
    }

    if (props.activeStep === 2) {
      state.camera.position.lerp(new THREE.Vector3(Math.cos(state.clock.elapsedTime/ 4)*5, 0.5, Math.sin(state.clock.elapsedTime/ 4)*5), 0.04)
    }
  })
  
  return (
    <>
      <OrbitControls
        minPolarAngle={0.5}
        maxPolarAngle={1.5}
        rotateSpeed={0.6}
        autoRotate={true}
        autoRotateSpeed={0.4}
        enableDamping
        minDistance={3.5}
        maxDistance={20.5}
        enablePan={false}
      />
      
      <PerspectiveCamera
        name="Personal Camera"
        makeDefault={true}
        far={100000}
        near={1}
        fov={60}
        up={[0, 1, 0]}
        position={[20,20,0]}
        rotation={[-2.38, 0.86, 2.51]}
      />
    </>
  );
}
