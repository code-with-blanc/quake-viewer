import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

const Scene = ({radius, circles}) => {
  const positions = Array.from(Array(circles), (_, k) => {
    const pos = k*(((-1)**k) * 5); 
    return [pos, pos, pos]
  });
  return (
    <Canvas
      camera={{position:[0, 100, 0]}}
    >
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 500]}/>
      {positions.map((p) => (
        <RotatingCube position={p} side={radius} />
      ))}
    </Canvas>
  )
}

const RotatingCube = ({position, side}) => {
  const cubeRef = useRef();
  useFrame((arg) => {
    cubeRef.current.rotation.y = arg.clock.getElapsedTime();
  })

  return (
    <mesh ref={cubeRef}  position={position}>
      <boxGeometry args={[side, side, side]}/>
      <meshStandardMaterial />
    </mesh>
  )
}

export default Scene
