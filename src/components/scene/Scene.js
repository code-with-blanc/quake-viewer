import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import React from 'react'

import BaseScene from './baseScene';
import QuakeRenderer from './quakeRenderer';

const Scene = () => {
  return (
    <Canvas
      camera={{position:[0, 100, 0], far:10_000}}
    >
      <CameraControls />
      <BaseScene />
      <QuakeRenderer />

    </Canvas>
  )
}


export default Scene
