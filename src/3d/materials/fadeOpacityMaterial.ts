import * as THREE from "three";

export const createFadeOpacityMaterial = ({ radius } : { radius: number }) => {
  return new THREE.ShaderMaterial({
    transparent: true,
    // depthTest: false,
    depthWrite: false,
    // side: THREE.DoubleSide,
    uniforms: {
      uColor: { value: new THREE.Color('black') },
      uRadius: { value: radius }
    },
    vertexShader: `
    varying vec3 vNormalW;
    varying vec3 vViewDir;
    void main() {
      vNormalW = normalize(mat3(modelMatrix) * normal);

      // compute view direction
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vViewDir = cameraPosition - worldPos.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }

    `,
    fragmentShader: `
    uniform vec3 uColor;
    varying vec3 vNormalW;
    varying vec3 vViewDir;

    void main() {
      float cosAngle = dot(normalize(vNormalW), normalize(vViewDir));
      float alpha = smoothstep(0.1, 0.7, cosAngle);

      gl_FragColor = vec4(uColor, pow(alpha, 1.4)*0.5);
    }
    `
  })
}
