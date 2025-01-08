import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/Addons.js';

export default function SvgMesh({
    svg, mapPoint = (p => p), mapPathStyle = (s => s),
}) {
    let finalSvg = []
    let renderOrder = 0;

    svg.paths.forEach((path) => {
        const fillColor = path.userData.style.fill;
        if (fillColor !== undefined && fillColor !== 'none' ) {
            const material = makeMaterial(fillColor, path.userData.style.fillOpacity)

            const shapes = pathToShapes(path, material, mapPoint)

            finalSvg.concat(
                shapes.map(geometry => ({ geometry, material }))
            )
        }

        const shapes = pathToShapes(path)
        finalSvg.concat(shapes)

        const style = mapPathStyle(path.userData.style)
        const strokeColor = style.stroke;
        if ( strokeColor !== undefined && strokeColor !== 'none' ) {
            const material = makeMaterial(strokeColor, style.strokeOpacity)
        
            const geometries = pathToStrokes(path, material, style, mapPoint)

            geometries.forEach(geometry => {
                finalSvg.push({ material, geometry })
            })
        }
    })

    return (
        <group>
            {
                finalSvg?.map(({material, geometry}, index) => {
                    return (
                        <mesh 
                            key={material.uuid + index} 
                            renderOrder={index} 
                            
                            position={new THREE.Vector3(0, 0, 0)} 
                            scale={1} 
                            geometry={geometry} 
                            material={material}
                        >
                        </mesh>
                    )
                })
            }
        </group>
    )


    function makeMaterial(color, opacity) {
        return new THREE.MeshBasicMaterial( {
            color: new THREE.Color().setStyle(color),
            opacity: opacity,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
        });
    }

    function pathToShapes(path, material, mapPoint) {
        const shapes = SVGLoader.createShapes(path);

        return shapes.map(shape => {
            const geometry = new THREE.ShapeGeometry(shape);
            geometry.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1))

            const mesh = new THREE.Mesh( geometry, material );
            mesh.renderOrder = renderOrder++;

            return geometry
        })
    }

    function pathToStrokes(path, material, style, mapPoint = (p => p)) {
        return path.subPaths.map(subPath => {
            const points = subPath.getPoints().map(p => mapPoint(p))
            const geometry = SVGLoader.pointsToStroke(points, style);
            geometry.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1))

            if ( geometry ) {
                const mesh = new THREE.Mesh( geometry, material );
                mesh.renderOrder = renderOrder++;
            }

            return geometry
        })
    }

}