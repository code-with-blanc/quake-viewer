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
                WORLD_RADIUS
            ])
            return ({
                x: cartesian[0],
                y: cartesian[1],
                z: cartesian[2],
                radius: 0.05 * q.magnitude**2,
                color: '#00F',
                visible: true,
            })
        })
    })

    const geometry = useMemo(() => {
        return createQuakeGeometry(quakes);
    }, [quakes]);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader, fragmentShader, transparent: true
        })
    }, []);

    return <points geometry={geometry} material={material} />
};

function createQuakeGeometry(quakes) {
    const count = quakes.length;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const visibilities = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    quakes.forEach((pt, i) => {
        positions[i * 3 + 0] = pt.x;
        positions[i * 3 + 1] = pt.y;
        positions[i * 3 + 2] = pt.z;
        sizes[i] = pt.radius;
        visibilities[i] = pt.visible ? 1.0 : 0.0;

        const c = new THREE.Color(pt.color);
        colors[i * 3 + 0] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("visibleFlag", new THREE.BufferAttribute(visibilities, 1));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return geo;
}

// Ok I used chatGPT for this one, no way I would know how to write
// those shaders without research. They're quite basic to understand tho.

const vertexShader = `
    attribute float size;
    attribute float visibleFlag;
    attribute vec3 color;
    varying float vVisible;
    varying vec3 vColor;

    void main() {
        vVisible = visibleFlag;
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        // Adjust gl_PointSize based on distance.
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
`

const fragmentShader = `
    varying vec3 vColor;
    varying float vVisible;
    void main() {
        // If the flag is 0, skip rendering this point.
        if (vVisible < 0.5) discard;
        // Simple circular point.
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        if (dot(cxy, cxy) > 1.0) discard;
        gl_FragColor = vec4(vColor, 1.0);
    }
`