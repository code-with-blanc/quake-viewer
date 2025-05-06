export interface GeoJson {
    type: 'Feature',
    geometry: GeoJsonPolygonGeometry | GeoJsonMultiPolygonGeometry,
}

interface GeoJsonPolygonGeometry {
    type: 'Polygon',
    coordinates: number[][]
}

interface GeoJsonMultiPolygonGeometry {
    type: 'MultiPolygon',
    coordinates: number[][][]
}
