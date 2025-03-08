import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import { coordsToCartesian, WORLD_RADIUS } from "../utils";



export const Quakes = () => {
    const quakes = useSelector(state => {
        const quakes = state.quakes.quakes
        return quakes.map(q => {
            const cartesian = coordsToCartesian([
                q.longitude,
                q.latitude,
                WORLD_RADIUS - 0.02*q.depth
            ])

            return ({
                x: cartesian[0],
                y: cartesian[1],
                z: cartesian[2],
                radius: 0.05 * q.magnitude**2,
                color: `#FFFFFF`,
                visible: true,
                magnitude: q.magnitude,
            })
        })
    })
    console.log(quakes.slice(0, 10).map(q => q.color))

    const geometry = useMemo(() => {
        return createQuakeGeometry(quakes);
    }, [quakes]);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true
        })
    }, []);

    return <points geometry={geometry} material={material} />
};

function createQuakeGeometry(quakes) {
    const count = quakes.length
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const visibilities = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const magnitudes = new Float32Array(count)
    console.log(quakes)
    quakes.forEach((q, i) => {
        positions[i * 3 + 0] = q.x
        positions[i * 3 + 1] = q.y
        positions[i * 3 + 2] = q.z

        const c = new THREE.Color(q.color)
        colors[i * 3 + 0] = c.r
        colors[i * 3 + 1] = c.g
        colors[i * 3 + 2] = c.b

        sizes[i] = q.radius
        visibilities[i] = q.visible ? 1.0 : 0.0
        magnitudes[i] = q.magnitude ?? -1
    })

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('visible', new THREE.BufferAttribute(visibilities, 1))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('magnitude', new THREE.BufferAttribute(magnitudes, 1))

    return geo
}

const vertexShader = `
    attribute float size;
    
    attribute float visible;
    varying float vVisible;

    attribute float magnitude;
    varying float vMagnitude;
    
    // attribute vec3 color;
    // varying vec3 vColor;

    void main() {
        vVisible = visible;
        // vColor = color;
        vMagnitude = magnitude;
        
        // Adjust gl_PointSize based on distance.
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

        // set size
        float m = magnitude/7.0;
        float pointSize = 0.1 + 1.2*m - 0.8*m*m + 5.0*m*m*m;
        gl_PointSize = pointSize * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
`

const fragmentShader = `
    // varying vec3 vColor;
    varying float vVisible;
    varying float vMagnitude;

    void main() {
        // If the flag is 0, skip rendering this point.
        if (vVisible < 0.5) discard;

        // Simple circular point.
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        if (dot(cxy, cxy) > 1.0) discard;
        
        // Set color from magnitude
        float m = vMagnitude/6.0;

        float r = clamp(0.1 + 0.4*m + 0.7*m*m + 0.1*m*m*m, 0.0, 1.0);
        float g = clamp(1.2 - 1.8*m                      , 0.1, 1.0);
        float b = clamp(0.8 + 0.3*m - 0.8*m*m            , 0.0, 1.0);

        gl_FragColor = vec4(vec3(r, g, b), 1.0);
    }
`
