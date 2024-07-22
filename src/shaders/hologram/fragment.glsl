uniform vec3 uColor;

varying vec3 vNormal;
varying float vHolographic;

void main()
{
    // Normal
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing)
        normal *= - 1.0;

    // Final color
    gl_FragColor = vec4(uColor, vHolographic);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}