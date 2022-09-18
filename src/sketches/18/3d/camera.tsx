import { PerspectiveCamera, OrbitControls  } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const POSITIONS = [
  new THREE.Vector3(5, 2, 1),
  new THREE.Vector3(1.1, 4, 0.1),
];

const pos = new THREE.Vector3(5, 2, 1)

export const Camera = (props) => {
  useFrame((state, delta) => {
    if (props.activeStep === 1) {
      state.camera.position.lerp(POSITIONS[props.activeStep], 0.04)
    }
    // state.camera.position.x ===
  })
  
  return (
    <>
      <OrbitControls
        minPolarAngle={0.5}
        maxPolarAngle={1.5}
        rotateSpeed={0.6}
        autoRotate={true}
        autoRotateSpeed={0.18}
        enableDamping
        minDistance={3.5}
        maxDistance={13.5}
        enablePan={false}
      />
      
      <PerspectiveCamera
        name="Personal Camera"
        makeDefault={true}
        far={100000}
        near={1}
        fov={60}
        up={[0, 1, 0]}
        position={POSITIONS[0]}
        rotation={[-2.38, 0.86, 2.51]}
      />
    </>
  );
}
