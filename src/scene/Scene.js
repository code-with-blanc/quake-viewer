import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import React from 'react'

import { Quakes } from './quakes/quakes';
import { World } from './world/world';

const Scene = () => {
  return (
    <Canvas
      style={{background: '#15151a'}}
      camera={{
        position: [-40, 16, -110],
        far: 1000,
      }}
    >
      <World />
      <OrbitControls target={[0, 0, 0]} minDistance={110}/>
      <Quakes />
    </Canvas>
  )
}

export default Scene
