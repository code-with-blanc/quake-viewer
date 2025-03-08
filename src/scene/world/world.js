import React, { useEffect, useMemo } from 'react'
import * as THREE from 'three'

import { useDispatch, useSelector } from 'react-redux'
import { fetchWorld } from '../../store/assets/assets'
import { coordsToCartesian, WORLD_RADIUS } from '../utils'


export function World() {
    const dispatch = useDispatch()
    useEffect(
        () => { dispatch(fetchWorld()) },
        [dispatch]
    )
    const geoJson = useSelector(state => state.assets.world)
    const coordinates = geoJsonToPoints(geoJson)

    const linesGeometry = useMemo(() => {
        if(!coordinates) return  
      
        const cartesianPoints = coordinates.flatMap(p =>
            coordsToCartesian([p[0], p[1], WORLD_RADIUS])
        )

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(cartesianPoints, 3))
        geometry.scale(1.002, 1.002, 1.002)
        // geometry.rotateX(-Math.PI/2)
        return geometry
    
    }, [coordinates])

  return linesGeometry ? (
    <>
      <mesh>
        <sphereGeometry args={[WORLD_RADIUS, 36, 36]} />
        <meshBasicMaterial wireframe color="#333" />
      </mesh>
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#446" />
      </lineSegments>
    </>
  ) : null
}



function geoJsonToPoints(geoJson) {
  if(!Array.isArray(geoJson)) return null

  const points = []
  const addPointList = (pointList) => {
    if(!Array.isArray(pointList)) return

    pointList.forEach((_, i) => {
      if(i === 0) return   // skip first point to avoid lines connecting each patch

      points.push(pointList[i-1])
      points.push(pointList[i])
    })
  }

  geoJson.forEach(item => {
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
