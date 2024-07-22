uniform float uTime;
uniform float uBigWavesElevation;
uniform float uBigWavesSpeed;
uniform vec2 uBigWavesFrequency;
uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallIterations;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/cnoise.glsl

float wavesElevation(vec3 position)
{
    float elevation = 
        sin(position.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) * 
        sin(position.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) * uBigWavesElevation;

    for( float i = 1.0; i <= uSmallIterations; i++)
    {
        elevation -= abs(cnoise(vec3(position.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
    }

    return elevation;
}

void main()
{
    // Base Position
    float shift = 0.01;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec3 modelPositionA = modelPosition.xyz + vec3(shift, 0.0, 0.0);
    vec3 modelPositionB = modelPosition.xyz + vec3(0.0, 0.0, -shift);

    // Elevation
    float elevation = wavesElevation(modelPosition.xyz);
    modelPosition.y += elevation;
    modelPositionA.y += wavesElevation(modelPositionA);
    modelPositionB.y += wavesElevation(modelPositionB);

    // Final position
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Compute normal
    vec3 toA = normalize(modelPositionA - modelPosition.xyz);
    vec3 toB = normalize(modelPositionB - modelPosition.xyz);
    vec3 computedNormal = cross(toA, toB);

    // Varyings
    vElevation = elevation;
    vNormal = computedNormal;
    vPosition = modelPosition.xyz;
}