import { useFrame } from '@react-three/fiber';
import { Depth, Fresnel, LayerMaterial, Noise } from 'lamina';
import { useControls } from 'leva';
import React from 'react'

export const GradientMaterial = () => {
  const {
    ShaderCol1,
    ShaderCol2,
    ShaderFresnelCol,
  } = useControls({
      ShaderCol1: '#3ff233',
      ShaderCol2: '#0079f9',
      ShaderFresnelCol: 'red',
    },
  );
  const ref = React.useRef();
  const ref2 = React.useRef();
  
  useFrame(({ clock }) => {
    // ref.current.intensity = Math.sin(clock.elapsedTime*4)/ 2 + 1;
    ref2.current.near = (Math.cos(clock.elapsedTime)) / 4;
    ref2.current.far = 1 - ((Math.cos(clock.elapsedTime)) / 4);
  })

  return (
    <LayerMaterial lighting="basic">
      <Depth
        ref={ref2}
        near={0.4854}
        far={0.7661999999999932}
        origin={[-0.4920000000000004, 0.4250000000000003, 0]}
        colorA={ShaderCol1}
        colorB={ShaderCol2}
      />
      <Fresnel
        color={ShaderFresnelCol}
        mode={'screen'} 
      />
      <Noise
        colorA={'#4d4433'}
        colorB={'#a8a8a8'}
        colorC={'#fefefe'}
        colorD={'#fefefe'}
        alpha={0.14}
        offset={[0, 0, 0]}
        name={'noise'}
        mode={'multiply'}
        type={'cell'}
      />
    </LayerMaterial>
  );
}