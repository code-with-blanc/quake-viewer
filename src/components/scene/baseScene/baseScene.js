import { Grid, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { DoubleSide } from 'three'

const BaseScene = () => {
  const gridSize = [10, 10]
  const gridConfig = {
    side: DoubleSide,
    sectionSize: 100,
    sectionThickness: 1,
    sectionColor: '#4c6a9e',
    cellSize: 10,
    cellThickness: 1,
    cellColor: '#6f6f6f',
    fadeDistance: 500,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
    fadeFrom: 0
  }

  return (
    <>
        <ambientLight intensity={1} />        
        <color attach="background" args={['#15151a']} />
        <Grid args={gridSize} {...gridConfig} />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport disabled axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
        </GizmoHelper>
    </>
  )
}

export default BaseScene;
