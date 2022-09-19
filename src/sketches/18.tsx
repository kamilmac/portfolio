import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Onboarding } from './18/onboarding'
import { Camera } from './18/3d/camera'
import { Scanner } from './18/3d/scanner'
import { Feet } from './18/3d/feet'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { Leva, useControls, levaStore } from 'leva'

useGLTF.preload('/scene/scanner-scene-2.glb')

let position = [0,0];
const obj = {};

function convertFromHex(hex) {
  var hex = hex.toString();//force conversion
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}
function convertToHex(str) {
  var hex = '';
  for(var i=0;i<str.length;i++) {
      hex += ''+str.charCodeAt(i).toString(16);
  }
  return hex;
}
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
  console.log('Query variable %s not found', variable);
}

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
  console.log({levaStore});
  
  React.useEffect(() => {
    try {
      const q = getQueryVariable('arg');
      const str = JSON.parse(convertFromHex(q))
      if (str) {
        setTimeout(() => {
          levaStore.set(str);
        }, 2000)
      }
    } catch(err) {
      console.log('Broken arg');
    }

    const interval = setInterval(() => {
      const store = levaStore.getData();
      Object.keys(store).forEach(key => {
        obj[key] = store[key].value
      })
      const str = convertToHex(JSON.stringify(obj))
      window.history.replaceState(null, null, `?arg=${str}`);
    }, 2000)
    return () => {
      clearInterval(interval);
    }
  }, [])

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
      <Leva
        flat
        oneLineLabels
        collapsed
      />
    </>
  );
}

