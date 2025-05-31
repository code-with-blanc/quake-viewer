import { WORLD_RADIUS } from '../constants'
import { createFadeOpacityMaterial } from '../materials/fadeOpacityMaterial'

export function Globe() {
  return (
    <>
      <mesh
        renderOrder={-1}
        material={createFadeOpacityMaterial({ radius: 0.9*WORLD_RADIUS })}
      >
        <sphereGeometry args={[WORLD_RADIUS, 36, 36]} />
      </mesh>
      <mesh renderOrder={0} rotation={[Math.PI/2, 0, 0]}>
        <sphereGeometry args={[WORLD_RADIUS, 36, 36]} />
        <meshBasicMaterial wireframe color="#252540" />
      </mesh>
    </>
  )
}
