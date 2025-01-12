import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import React from 'react'

import BaseScene from './baseScene';
import QuakeRenderer from './quakeRenderer';
import Iceland from './iceland/iceland';

const Scene = () => {
  return (
    <Canvas
      style={{background: '#15151a'}}
      camera={{
        position: [-20, 8, -55],
        far: 10000,
      }}
    >
      <OrbitControls target={[-22, 0, -63]} />
      <BaseScene /> 
      <Iceland />
      <QuakeRenderer />
    </Canvas>
  )
}

export default Scene
