import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import React from 'react'

import BaseScene from './baseScene';
import QuakeRenderer from './quakeRenderer';
import Iceland from './iceland/iceland';
import { SphereWithLines } from './SphereWithLines/SphereWithLines';

const Scene = () => {
  return (
    <Canvas
      style={{background: '#15151a'}}
      camera={{
        position: [-20, 8, -55],
        far: 10000,
      }}
    >
      <SphereWithLines />
      <OrbitControls target={[0, 0, 0]} minDistance={110}/>
      <BaseScene /> 
      {/* <Iceland /> */}
      <QuakeRenderer />
    </Canvas>
  )
}

export default Scene
