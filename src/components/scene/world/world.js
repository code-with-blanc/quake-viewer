import { useLoader } from '@react-three/fiber'

import { SVGLoader } from 'three/examples/jsm/Addons.js'
import SvgMesh from './svgMesh'


export default function World() {
    const svg = useLoader(SVGLoader, '/quake-viewer/assets/world.svg')

    return (
        <SvgMesh
            svg={svg}
            mapPoint={p => (p.multiplyScalar(0.1))}
            mapPathStyle={(s) => {
                s.strokeWidth = 0.1;
                s.stroke = '#F00'
                console.log(s)
                return s
            }}
        />
    )
}
