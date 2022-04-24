import React from 'react'
import { Canvas } from '@react-three/fiber'
import { sculptToMinimalRenderer } from 'shader-park-core/dist/shader-park-core.esm.js';

const App: React.FC = () => {
  React.useEffect(() => {
    const canvas = document.getElementsByTagName('Canvas')[0];
    
    sculptToMinimalRenderer(canvas, spCode);
  }, []);
  return (
    <canvas
      style={{
        height: '100vh',
      }}
    />
  );
}

function spCode() {
  //Put your Shader Park Code here
  setStepSize(0.2);
  let buttonHover = input();
  let click = input();
  let n = noise(getSpace() * 89 + buttonHover);
  shine(10);
  color(0.2 * normal * click + n * 0.2 + vec3(0, 0, 2));
  sphere(0.3);
  expand(n * 0.2);
  mixGeo(buttonHover);
  box(0.3, 0.3, 0.3);
}

export default App;
