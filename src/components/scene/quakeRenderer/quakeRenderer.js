import { Lut } from "three/examples/jsm/Addons.js";

const quakeLut = new Lut('rainbow', 100);

const QuakeRenderer = ({ quakes }) => {
  return (
    <>
    {
      quakes.map((q) => (<QuakeSphere quake={q} />))
    }
    </>
  );
}

const QuakeSphere = ({ quake }) => {
  const color = quakeLut.getColor(quake.magnitude/5);
  return (
    <mesh position={[quake.pos_x, quake.pos_y, quake.pos_z]}>
      <sphereGeometry args={[quake.radius]}/>
      <meshStandardMaterial
        args={[{
          emissive: color,
          emissiveIntensity: 0.5,
        }]}
        color={color}
      />
    </mesh>
  )
}

export default QuakeRenderer;
