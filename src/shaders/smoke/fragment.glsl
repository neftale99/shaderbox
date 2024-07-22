uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vUv;
varying float vSmoke;

void main()
{
    // Remap
    float smoke = smoothstep(0.4, 1.0, vSmoke);

    // Edges
    smoke *= smoothstep(0.0, 0.1, vUv.x);
    smoke *= smoothstep(1.0, 0.9, vUv.x);
    smoke *= smoothstep(0.0, 0.1, vUv.y);
    smoke *= smoothstep(1.0, 0.4, vUv.y);

    // Final color
    gl_FragColor = vec4(0.7, 0.7, 0.7, smoke);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}