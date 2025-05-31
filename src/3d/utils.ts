import { GeoJson } from "@/model/geojson"

export const coordsToCartesian = (p) => {
    const lon = (p[0]) * Math.PI/180
    const lat = (p[1]) * Math.PI/180
    const r = p[2]

    return [
        r * Math.cos(lat) * Math.cos(lon),
        r * Math.cos(lat) * Math.sin(lon),
        r * Math.sin(lat),
    ]
}

export function geoJsonToPoints(countries: GeoJson[]) {
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
