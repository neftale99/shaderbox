uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

#include ../includes/cnoise.glsl

void main()
{
    // Displace the uv
    vec2 displacedUv = vUv + cnoise(vec3(vUv * 15.0, uTime * 0.8));

    // Cnoise
    float strength = cnoise(vec3(displacedUv * 25.0, uTime * 0.5));
    
    // Outer glow
    float outerGlow = distance(vUv, vec2(0.5)) * 4.5 - 1.9;
    strength += outerGlow;

    // Apply cool step
    strength = step(-0.2, strength) * 0.8;

    // Clamp the value form 0 to 1
    strength = clamp(strength, 0.0, 1.0);

    // Final color
    vec3 color = mix(uColorStart, uColorEnd, strength);
    gl_FragColor = vec4(color,  1.0);
}

