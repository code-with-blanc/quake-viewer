import * as THREE from "three";
import { MAX_DATE } from "../constants";

export const createQuakesMaterial = ({ minTime, maxTime }) => {
    return new THREE.ShaderMaterial({
        // depthWrite: false,
        // depthTest: false,
        uniforms: {
            uMinTime: { value: minTime/MAX_DATE },
            uMaxTime: { value: maxTime/MAX_DATE }
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
