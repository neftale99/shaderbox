uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uShadowRepetitions;
uniform vec3 uShadowColor;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl

vec3 halftone(
    vec3 color,
    float repetitions,
    vec3 direction,
    float low,
    float high,
    vec3 pointColor,
    vec3 normal
)
{
    float intensity = dot(normal, direction);
    intensity = smoothstep(low, high, intensity);

    
    vec2 uv = gl_FragCoord.xy / uResolution.y;
    uv *= repetitions;
    uv = mod(uv, 1.0);

    float point = distance(uv, vec2(0.5));
    point = 1.0 - step(0.5 * intensity, point);

    color = mix(color, pointColor, point);
    return mix(color, pointColor, point);
}
void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = uColor;

    // Lights
    vec3 light = vec3(1.0);
    
    light += ambientLight(
        vec3(1.0),    // Lightcolor
        1.0          // Intensity
    );

    light += directionalLight(
        vec3(0.5, 0.0, 1.0),  // Light color
        1.0,                  // Intensity
        normal,
        vec3(-2, -0.1, -1), // Position
        viewDirection,
        1.0                  // specular power
    );

    color *= light;

    // Halftone
    color = halftone(
        color,                 // Input color
        uShadowRepetitions,    // Repetitions
        vec3(0.0, - 1.0, 0.0), // Direction
        - 0.8,                 // Low
        1.5,                   // High
        uShadowColor,          // Point color
        normal                 // Normal
    );

    color = halftone(
        color,
        70.0,
        vec3(0.5, -1.5, 1.2),
        0.5,
        1.5,
        vec3(0.5, 0.0, 0.13),
        normal
    );
    
    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}