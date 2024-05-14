import { CameraControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

import BaseScene from './baseScene';

const Scene = ({radius, circles}) => {
  return (
    <Canvas
      camera={{position:[0, 100, 0], far:10_000}}
    >
      <CameraControls />
      <BaseScene />

      <RotatingCubes number={circles} side={radius} />
    </Canvas>
  )
}

const RotatingCubes = ({number, side}) => {
  const positions = Array.from(Array(number), (_, k) => {
    const angle = (2*Math.PI)/number * k
    const pos_x = Math.cos(angle) * 100
    const pos_z = Math.sin(angle) * 100
    return [pos_x, 0, pos_z]
  });

  return positions.map((position) => (
    <RotatingCube position={position} side={side} />      
  ))
}

const RotatingCube = ({position, side}) => {
  const cubeRef = useRef();
  useFrame((arg) => {
    cubeRef.current.rotation.y = arg.clock.getElapsedTime();
  })
  
  return (
    <mesh ref={cubeRef}  position={position}>
      <boxGeometry args={[side, side, side]}/>
      <meshStandardMaterial color='#3f7b9d'/>
    </mesh>
  );
}

export default Scene
