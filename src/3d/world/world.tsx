import { useMemo } from 'react'
import * as THREE from 'three'

import { coordsToCartesian, WORLD_RADIUS } from '../utils'
import { useLayersStore } from '../../store/layers/layers'
import { GeoJson } from '@/model/geojson'


const createFadeOpacityMaterial = ({ radius } : { radius: number }) => {
  return new THREE.ShaderMaterial({
    transparent: true,
    // depthTest: false,
    depthWrite: false,
    // side: THREE.DoubleSide,
    uniforms: {
      uColor: { value: new THREE.Color('black') },
      uRadius: { value: radius }
    },
    vertexShader: `
    varying vec3 vNormalW;
    varying vec3 vViewDir;
    void main() {
      vNormalW = normalize(mat3(modelMatrix) * normal);

      // compute view direction
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vViewDir = cameraPosition - worldPos.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }

    `,
    fragmentShader: `
    uniform vec3 uColor;
    varying vec3 vNormalW;
    varying vec3 vViewDir;

    void main() {
      float cosAngle = dot(normalize(vNormalW), normalize(vViewDir));
      float alpha = smoothstep(0.1, 0.7, cosAngle);

      gl_FragColor = vec4(uColor, pow(alpha, 1.4)*0.5);
    }
    `
  })
}

export function World() {
    const { layers } = useLayersStore()

    const world = layers.find(l => l.layerId === 'countries') || { countries: [] }
    
    const coordinates = geoJsonToPoints(world.countries.map(c => c.geo_shape))

    const linesGeometry = useMemo(() => {
        if(!coordinates) return  
      
        const cartesianPoints = coordinates.flatMap(p =>
            coordsToCartesian([p[0], p[1], WORLD_RADIUS])
        )

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(cartesianPoints, 3))
        geometry.scale(1.002, 1.002, 1.002)
        geometry.rotateX(-Math.PI/2)
        return geometry
    
    }, [coordinates])

  return linesGeometry ? (
    <>
      <mesh renderOrder={-1} material={createFadeOpacityMaterial({ radius: 0.9*WORLD_RADIUS })}>
          <sphereGeometry args={[WORLD_RADIUS, 36, 36]} />
      </mesh>
      <mesh renderOrder={0}>
        <sphereGeometry args={[WORLD_RADIUS, 36, 36]} />
        <meshBasicMaterial wireframe color="#252540" />
      </mesh>
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#456" />
      </lineSegments>
    </>
  ) : null
}


function geoJsonToPoints(countries: GeoJson[]) {
  const points: number[] = []
  const addPointList = (pointList) => {
    if(!Array.isArray(pointList)) return

    pointList.forEach((_, i) => {
      if(i === 0) return   // skip first point to avoid lines connecting each patch

      points.push(pointList[i-1])
      points.push(pointList[i])
    })
  }

  countries.forEach(geoJson => {
    if(geoJson?.type !== 'Feature') {
      console.warn('Non-Feature item in geojson:', geoJson)
      return
    }

    if(geoJson.geometry.type === 'MultiPolygon') {
      geoJson.geometry.coordinates.forEach(patch => {
        patch.forEach(pl => addPointList(pl))
      })
      return
    }

    if(geoJson.geometry.type === 'Polygon') {
      geoJson.geometry.coordinates.forEach(pl => 
        addPointList(pl)
      )
      return
    }

    console.warn(`Unknown shape geometry (${(geoJson.geometry as { type: string }).type}):`, geoJson)
  })

  return points
}