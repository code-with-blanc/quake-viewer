import { useMemo, useRef } from "react";
import * as THREE from "three";
import { coordsToCartesian } from "../utils";
import { invalidate, useFrame } from "@react-three/fiber";
import { useQuakes } from "../../store/quakes/quakes";
import { MAX_DATE, QUAKE_LAYER_DEPTH, QUAKE_MAX_DEPTH_KM, WORLD_RADIUS } from "../constants";
import { createQuakesMaterial } from "../materials/quakesMaterial";


export const Quakes = () => {
    const { quakes, visibleTimeRange } = useQuakes()
    const minTime = visibleTimeRange.min
    const maxTime = visibleTimeRange.max
    

    const geometry = useMemo(
        () => createGeometry(quakes),
        [quakes]
    )
    const material = useMemo(
        () => createQuakesMaterial({
            minTime: minTime || 0,
            maxTime: maxTime || MAX_DATE,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [/* minTime and MaxTime -> updated with useFrame */]
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meshRef = useRef<any>(null)
    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.material.uniforms.uMinTime.value = minTime/MAX_DATE
        meshRef.current.material.uniforms.uMaxTime.value = maxTime/MAX_DATE
      }
    })

    invalidate()

    return <points ref={meshRef} geometry={geometry} material={material} />
};

const createGeometry = (quakes) => {
    const count = quakes.length
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const magnitudes = new Float32Array(count)
    const times = new Float32Array(count)

    quakes.forEach((q, i) => {
        const cartesian = coordsToCartesian([
            q.longitude,
            q.latitude,
            WORLD_RADIUS - (QUAKE_LAYER_DEPTH*(q.depth/QUAKE_MAX_DEPTH_KM))
        ])

        positions[i * 3 + 0] = cartesian[0]
        positions[i * 3 + 1] = cartesian[1]
        positions[i * 3 + 2] = cartesian[2]

        sizes[i] = 0.05 * q.magnitude**2
        magnitudes[i] = q.magnitude ?? -1
        times[i] = q.time/MAX_DATE
    })

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('magnitude', new THREE.BufferAttribute(magnitudes, 1))
    geo.setAttribute('time', new THREE.BufferAttribute(times, 1))

    return geo
}
