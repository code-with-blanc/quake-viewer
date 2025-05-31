import { memo } from 'react';

import { Canvas } from '@react-three/fiber'

import { Quakes } from './objects/quakes';
import { Globe } from './objects/globe';

import './scene.scss'
import { CameraControl } from './camera/cameraControl';
import { Countries } from './objects/countries';

export const Scene = memo(() => {
  return (
    <Canvas
      className='scene__canvas'
      frameloop='demand'
      
      camera={{
        position: [100, -200, 250],
        up: [0, 0, 1],
        far: 1000,
      }}
    >
      <CameraControl />
      <Globe />
      <Countries />
      <Quakes />
      {/* <GizmoHelper alignment="bottom-right" margin={[120, 160]}>
        <GizmoViewport />
      </GizmoHelper> */}
    </Canvas>
  )
})
