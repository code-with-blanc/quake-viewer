import { Lut } from "three/examples/jsm/Addons.js";

const quakeLut = new Lut('rainbow', 100);

const QuakeRenderer = ({quakes}) => {
  quakes.map((q) => console.log(q.magnitude));
  return (
    <>
    {
      quakes.map((q) => (<QuakeSphere quake={q} />))
    }
    </>
  );
}

const QuakeSphere = ({quake}) => {
  const radius = ((quake.magnitude+1)**1.5);
  const pos_y = -quake.depth * 50;
  const color = quakeLut.getColor(quake.magnitude/4);
  return (
    <mesh position={[quake.pos_x, pos_y, quake.pos_z]}>
      <sphereGeometry args={[radius]}/>
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
