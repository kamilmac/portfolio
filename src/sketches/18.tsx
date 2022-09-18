import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Onboarding } from './18/onboarding'
import { Camera } from './18/3d/camera'
import { Scanner } from './18/3d/scanner'
import { Feet } from './18/3d/feet'
import React from 'react'


let position = [0,0];

export default function App() {
  const [step, setStep] = React.useState(0)
  
  return (
    <>
      <Canvas
        style={{
          height: '100vh',
          background: 'linear-gradient(45deg, rgba(180,180,180,1) 0%, rgba(240,240,240,1) 100%)',
          // background: '#bbb',
          // backgroundImage: 'url(https://blenderartists.org/uploads/default/original/4X/7/e/2/7e2d7bea4ac21388c4a96e1371f375c4ce00094b.jpg)'
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
        onClick={() => console.log('HI')}
        getPosition={() => position}
        onStepChange={setStep}
        activeStep={step}
      />
    </>
  );
}

