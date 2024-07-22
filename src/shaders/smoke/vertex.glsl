uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vSmoke;

#include ../includes/rotate2D.glsl

void main()
{
    vec3 newPosition = position;

    // Twist
    float twistNoise = texture(
        uTexture, 
        vec2(0.5, uv.y * 0.2 - uTime * 0.009)
        ).r;
    float angle = twistNoise * 8.0;
    newPosition.xz = rotate2D(newPosition.xz, angle);

    // Wind
    vec2 windOffset = vec2(
        texture(uTexture, vec2(0.25, uTime * 0.1)).r - 0.5,
        texture(uTexture, vec2(0.75, uTime * 0.1)).r - 0.5
    );
    windOffset *= pow(uv.y, 2.0) * 0.5;
    newPosition.xz += windOffset;

    // Smoke
    vec2 smokeUv = uv;
    smokeUv.x *= 0.7;
    smokeUv.y *= 0.3;
    smokeUv.y -= uTime * 0.03;
    vSmoke = texture(uTexture, smokeUv).r;


    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // Varyings
    vUv = uv;
}