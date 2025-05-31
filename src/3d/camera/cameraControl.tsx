import { useThree, useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect, useCallback } from "react"

import { OrbitControls as _OrbitControls } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';

import { useDoubleTap } from "@/utils/useDoubleTap";

export function CameraControl() {
  const controlRef = useRef<InstanceType<typeof _OrbitControls>>(null)
  const { camera, gl, invalidate } = useThree()

  const [targetDistance, setTargetDistance] = useState<number | null>(300)

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