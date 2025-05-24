import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { OrbitControls as _OrbitControls } from 'three-stdlib';
import { useGesture } from '@use-gesture/react'

import { Quakes } from './quakes/quakes';
import { World } from './world/world';

import './scene.scss'

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



const CameraControl = () => {
  const controlRef = useRef<InstanceType<typeof _OrbitControls>>(null)
  const { camera, gl, invalidate } = useThree()

  const [targetDistance, setTargetDistance] = useState<number | null>(400)

  useEffect(() => {
    const control = controlRef.current
    if(control === null) return

    control.enableDamping = false
    control.setPolarAngle(1.75)
    control.setAzimuthalAngle(0.8)
    control.enableDamping = true
    control.update()
  }, [])

  const onDoubleTap = useCallback(() => {
    if (!controlRef.current) return
    setTargetDistance(controlRef.current.getDistance() * 0.8)
    invalidate()
  }, [setTargetDistance, controlRef, invalidate])

  useFrame(() => {
    // smoothly zooms to targetDistance then sets it to null

    if (!controlRef.current || targetDistance === null) return
    const control = controlRef.current
    const currentDistance = controlRef.current.getDistance()

    if(Math.abs(currentDistance - targetDistance) < 2) {
      setTargetDistance(null)
    }

    if(currentDistance > targetDistance) {
      control.dollyOut(1.01)
      control.update()
    } else {
      control.dollyIn(1.01)
      control.update()
    }

    invalidate()
  })

  useDoubleTap(gl.domElement, () => onDoubleTap())

  return (
    <OrbitControls
      ref={controlRef}
      camera={camera}
      target={[0, 0, 0]}
      minDistance={80}
      enablePan={false}
    />
  )
}

function useDoubleTap(target: EventTarget, onDoubleTap: () => unknown): void {
  const TIMEOUT_MS = 300
  const ALLOW_MOUSE = false
  const tapHistory = useRef<{ time: number }[]>([{ time: 0 }, { time: TIMEOUT_MS + 1 }])

  return useGesture(
    {
      onDrag: (state) => {
        if(!state.tap) return
        if(
          !ALLOW_MOUSE
          && (state.event instanceof PointerEvent)
          && state.event?.pointerType == 'mouse'
        ) return

        // update tap history
        tapHistory.current.pop()
        tapHistory.current = [ { time: Date.now() }, ...tapHistory.current]

        // detect double tap
        const current = tapHistory.current[0]
        const last = tapHistory.current[1]
        if((current.time - last.time) < TIMEOUT_MS) {
          onDoubleTap()
        }
      },
    },
    {
      target: target,
      eventOptions: { passive: false },
      drag: {
        filterTaps: true,
        pointer: {
          touch: true,
          mouse: false,
        },
        // minimum movement needed while the pointer is down to register as a tap
        tapsThreshold: 0,
      },

    }
  )
}


export default Scene
