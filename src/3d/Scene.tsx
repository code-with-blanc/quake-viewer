import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'

import { Quakes } from './quakes/quakes';
import { World } from './world/world';


const Scene = () => {
  return (
    <Canvas
      style={{background: '#15151a'}}
      camera={{
        position: [100, -200, 250],
        far: 1000,
      }}
    >
      <OrbitControls
        target={[0, 0, 0]}
        minDistance={80}
      />
      <World />
      <Quakes />
      {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport />
      </GizmoHelper> */}
    </Canvas>
  )
}

export default Scene
