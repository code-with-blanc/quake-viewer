import { useMemo } from "react"
import * as THREE from 'three'

import { useLayersStore } from "@/store/layers/layers"
import { coordsToCartesian, geoJsonToPoints } from "../utils"
import { WORLD_RADIUS } from "../constants"

export function Countries() {
    const { layers } = useLayersStore()
    const world = layers.find(l => l.layerId === 'countries') || { countries: [] }
    const coordinates = geoJsonToPoints(world.countries.map(c => c.geo_shape))

    const countriesLines = useMemo(() => {
        if(!coordinates) return  
        
        const cartesianPoints = coordinates.flatMap(p =>
            coordsToCartesian([p[0], p[1], WORLD_RADIUS])
        )

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(cartesianPoints, 3))
        geometry.scale(1.002, 1.002, 1.002)
        return geometry
    }, [coordinates])

    return (
        <lineSegments geometry={countriesLines}>
            <lineBasicMaterial color="#456" />
        </lineSegments>
    )
}
