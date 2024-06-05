import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import React from 'react'

import BaseScene from './baseScene';
import QuakeRenderer from './quakeRenderer';
import Iceland from './iceland/iceland';

const Scene = () => {
  return (
    <Canvas
      camera={{
        position: [-20, 8, -55],
        far:100,
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
