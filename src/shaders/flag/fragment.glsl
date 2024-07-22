uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb += vElevation * 0.7;

    float gray = dot(textureColor.rgb, vec3(0.299, 0.587, 0.114));

    float saturationStrength = 1.4; 
    textureColor.rgb = mix(vec3(gray), textureColor.rgb, saturationStrength);

    gl_FragColor = textureColor;
}