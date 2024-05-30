import { MapControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import React from 'react'

import BaseScene from './baseScene';
import QuakeRenderer from './quakeRenderer';

const Scene = () => {
  return (
    <Canvas
      camera={{position:[0, 1000, 0], far:10_000}}
    >
      <MapControls />
      <BaseScene />
      <QuakeRenderer />
    </Canvas>
  )
}


export default Scene
