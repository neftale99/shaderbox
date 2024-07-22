uniform float uTime;

varying vec3 vNormal;
varying float vHolographic;

#include ../includes/random2D.glsl

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Glitch
    float glitchTime = uTime - modelPosition.y;
    float glitchStrength = sin(glitchTime) + sin(glitchTime * 4.45) + sin(glitchTime * 9.76);
    glitchStrength /= 3.0;
    glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
    glitchStrength *= 0.25;
    modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;

    // Model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Stripes
    float stripes = mod((modelPosition.y - uTime * 0.2) * 30.0, 1.0);
    stripes = pow(stripes, 3.0);

    // Fresnel
    vec3 viewDirection = normalize(modelPosition.xyz - cameraPosition);
    float fresnel = dot(viewDirection, normalize(modelNormal.xyz)) + 1.0;
    fresnel = pow(fresnel, 2.0);

    // Falloff
    float falloff = smoothstep(0.8, 0.0, fresnel);

    // Holographic
    vHolographic = stripes * fresnel;
    vHolographic += fresnel * 1.25;
    vHolographic *= falloff;

    // Varyings
    vNormal = modelNormal.xyz;

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}