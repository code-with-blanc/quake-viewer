import { useMemo, useRef } from "react";
import * as THREE from "three";
import { coordsToCartesian, QUAKE_LAYER_DEPTH, QUAKE_MAX_DEPTH_KM, WORLD_RADIUS } from "../utils";
import { invalidate, useFrame } from "@react-three/fiber";
import { useQuakesStore } from "../../store/quakes/quakes";
import { useTimelineStore } from "../../store/timeline/timeline";

const DATE_2100 = new Date('2100-01-01').getTime()

export const Quakes = () => {
    const { quakes } = useQuakesStore()
    const { startDate, endDate } = useTimelineStore() 
    const minTime = startDate.getTime()
    const maxTime = endDate.getTime()

    const geometry = useMemo(
        () => createGeometry(quakes),
        [quakes]
    )
    const material = useMemo(
        () => createShaderMaterial({
            minTime: minTime || 0,
            maxTime: maxTime || DATE_2100,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [/* minTime and MaxTime -> updated with useFrame */]
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meshRef = useRef<any>(null)
    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.material.uniforms.uMinTime.value = minTime/DATE_2100
        meshRef.current.material.uniforms.uMaxTime.value = maxTime/DATE_2100
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
        times[i] = q.time/DATE_2100
    })

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('magnitude', new THREE.BufferAttribute(magnitudes, 1))
    geo.setAttribute('time', new THREE.BufferAttribute(times, 1))

    return geo
}

const createShaderMaterial = ({ minTime, maxTime }) => {
    return new THREE.ShaderMaterial({
        // depthWrite: false,
        // depthTest: false,
        uniforms: {
            uMinTime: { value: minTime/DATE_2100 },
            uMaxTime: { value: maxTime/DATE_2100 }
        },
        vertexShader: `
            attribute float size;
            
            attribute float magnitude;
            varying float vMagnitude;

            attribute float time;
            varying float vTime;

            void main() {
                vMagnitude = magnitude;
                vTime = time;
                
                // Adjust gl_PointSize based on distance.
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * mvPosition;

                // set size
                float m = magnitude/7.0;
                float pointSize = 0.1 + 1.2*m - 0.8*m*m + 5.0*m*m*m;
                gl_PointSize = pointSize * (300.0 / -mvPosition.z);
            }
        `,
        fragmentShader: `
            uniform float uMinTime;
            uniform float uMaxTime;
            varying float vMagnitude;
            varying float vTime;

            vec3 colormap(float m) {
                #define NUM_POINTS 10

                const vec4 colormap[NUM_POINTS] = vec4[](
                    vec4(0.0 , 0.2, 0.4, 0.5),
                    vec4(1.0,  0.3, 0.7, 0.7),
                    vec4(2.99, 0.3, 0.7, 0.9),
                    
                    vec4(3.01, 0.2, 0.6, 0.4),
                    vec4(3.99, 0.3, 0.6, 0.9),
                    
                    vec4(4.01, 0.1, 0.6, 1.0),
                    vec4(4.99, 0.8, 0.6, 1.0),

                    vec4(5.01, 1.0, 0.6, 0.2),
                    vec4(6.0,  1.0, 0.2, 0.1),
                    vec4(7.0,  1.0, 0.0, 0.0)
                );

                if (m <= colormap[0].x) return colormap[0].yzw;
                if (m >= colormap[NUM_POINTS - 1].x) return colormap[NUM_POINTS - 1].yzw;

                for (int i = 0; i < NUM_POINTS - 1; i++) {
                    if (m >= colormap[i].x && m <= colormap[i + 1].x) {
                        float t = (m - colormap[i].x) / (colormap[i + 1].x - colormap[i].x);
                        return mix(colormap[i].yzw, colormap[i + 1].yzw, t);
                    }
                }

                return vec3(1.0);
            }

            void main() {
                // Discard fragment if not in time window
                if (vTime < uMinTime || vTime > uMaxTime) discard;

                // Simple circular point.
                vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                if (dot(cxy, cxy) > 1.0) discard;
                
                // Set color from magnitude
                gl_FragColor = vec4(colormap(vMagnitude), 1.0);
            }
        `,
    })
}
