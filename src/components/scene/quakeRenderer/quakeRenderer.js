import { Lut } from "three/examples/jsm/Addons.js";
import { selectQuakesForRendering } from "./selectForRendering";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const quakeLut = new Lut('rainbow', 100);

const QuakeRenderer = ({ quakes }) => {
  const memoQuakes = useMemo(
    () => (selectQuakesForRendering(quakes)), 
    [quakes]
  )

  return (
    <>
    {
      memoQuakes.map((q) => (<QuakeSphere key={q.id} quake={q} />))
    }
    </>
  );
}

const QuakeSphere = ({ quake }) => {
  const minDate = useSelector((state) => state.render.minDate)
  const maxDate = useSelector((state) => state.render.maxDate)
  const visible = minDate < quake.time && quake.time < maxDate
  const color = quakeLut.getColor((quake.magnitude - 4)/1)

  return (
    <mesh position={[quake.pos_x, quake.pos_y, quake.pos_z]}>
      <sphereGeometry args={[quake.radius]}/>
      <meshStandardMaterial
        args={[{
          emissive: color,
          emissiveIntensity: 0.5,
        }]}
        color={color}
        transparent
        depthTest={false}
        opacity={visible? 0.8 : 0}
      />
    </mesh>
  )
}

export default QuakeRenderer;
