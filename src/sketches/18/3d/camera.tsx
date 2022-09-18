import { PerspectiveCamera, OrbitControls  } from '@react-three/drei'

export const Camera = () => {
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
        position={[5, 2, 1]}
        rotation={[-2.38, 0.86, 2.51]}
        />
    </>
  );
}
