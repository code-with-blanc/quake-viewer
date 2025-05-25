import { memo } from 'react';

import { Canvas } from '@react-three/fiber'

import { Quakes } from './quakes/quakes';
import { World } from './world/world';

import './scene.scss'
import { CameraControl } from './cameraControl';

const Scene = memo(() => {
  return (
    <Canvas
      className='scene__canvas'
      frameloop='demand'
      camera={{
        position: [100, -200, 250],
        far: 1000,
      }}
    >
      <CameraControl />
      <World />
      <Quakes />
      {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport />
      </GizmoHelper> */}
    </Canvas>
  )
})

export default Scene
