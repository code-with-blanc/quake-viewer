import React, { useEffect, useMemo } from 'react'
import * as THREE from 'three'

import { useDispatch, useSelector } from 'react-redux'
import { fetchWorld } from '../../../store/assets/assets'

const geojsonToPoints = (geojson) => {
  if(!Array.isArray(geojson)) return null

  const points = []
  const addPointList = (pointList) => {
    if(!Array.isArray(pointList)) return

    const mapToPolar = (p) => ({
      lon: p[0] * Math.PI/180,
      lat: p[1] * Math.PI/180,
    })

    pointList.forEach((_, i) => {
      if(i === 0) return   // skip first point to avoid lines connecting each patch

      points.push(mapToPolar(pointList[i-1]))
      points.push(mapToPolar(pointList[i]))
    })
  }

  geojson.forEach(item => {
    if(item?.geo_shape?.type !== 'Feature') {
      console.warn('Non-Feature item in geojson:', item)
      return
    }

    if(item.geo_shape?.geometry?.type === 'MultiPolygon') {
      item.geo_shape.geometry.coordinates.forEach(patch => {
        patch.forEach(pl => addPointList(pl))
      })
      return
    }

    if(item.geo_shape?.geometry?.type === 'Polygon') {
      item.geo_shape.geometry.coordinates.forEach(pl => 
        addPointList(pl)
      )
      return
    }

    console.warn(`Unknown shape geometry (${item.geo_shape.geometry.type}):`, item)
  })

  return points
}

export function SphereWithLines({ numLines = 1000, sphereRadius = 100 }) {
    const dispatch = useDispatch()
    useEffect(
        () => { dispatch(fetchWorld()) },
        [dispatch]
    )
    const geoJson = useSelector(state => state.assets.world)
    const coordinates = geojsonToPoints(geoJson)

    const linesGeometry = useMemo(() => {
        if(!coordinates) return  
      
        const cartesianPoints = coordinates.flatMap(p => ([
            sphereRadius * Math.cos(p.lat) * Math.cos(p.lon),
            sphereRadius * Math.cos(p.lat) * Math.sin(p.lon),
            sphereRadius * Math.sin(p.lat),
        ]))


        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(cartesianPoints, 3))
        geometry.scale(1.002, 1.002, 1.002)
        geometry.rotateX(-Math.PI/2)
        return geometry
    
    }, [sphereRadius, coordinates])

  return linesGeometry ? (
    <>
      <mesh>
        <sphereGeometry args={[sphereRadius, 36, 36]} />
        <meshBasicMaterial wireframe color="#353535" />
      </mesh>
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="red" />
      </lineSegments>
    </>
  ) : null
}
