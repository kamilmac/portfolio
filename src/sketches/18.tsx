import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Onboarding } from './18/onboarding'
import { Camera } from './18/3d/camera'
import { Scanner } from './18/3d/scanner'
import { Feet } from './18/3d/feet'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useControls } from 'leva'

useGLTF.preload('/scene/scanner-scene-2.glb')

let position = [0,0];

export default function App() {
  const [step, setStep] = React.useState(0)
  const {
    BackgroundColor1,
    BackgroundColor2,
    BackgroundDeg,
  } = useControls({
    BackgroundColor1: '#6e6f75',
    BackgroundColor2: '#ffffff',
    BackgroundDeg: {
      value: 45,
      min: 0,
      max: 360,
      step: 1,
    },
  })
  
  return (
    <>
      <Canvas
        style={{
          height: '100vh',
          background: `linear-gradient(${BackgroundDeg}deg, ${BackgroundColor1} 0%, ${BackgroundColor2} 100%)`,
        }}
        gl={{
          toneMapping: THREE.LinearToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
      >
        <Scanner
          onPositionUpdate={(x, y) => position = [x, y]}
          activeStep={step}
        />
        <Feet />
        <Camera
          activeStep={step}
        />
      </Canvas>
      <Onboarding
        getPosition={() => position}
        onStepChange={setStep}
        activeStep={step}
      />
    </>
  );
}

