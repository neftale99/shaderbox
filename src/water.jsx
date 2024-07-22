import * as THREE from 'three'
import { useControls, folder } from 'leva'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, Clouds, Cloud } from '@react-three/drei'

import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

export default function Water()
{
    // // Leva
    // const { wavesElevation, wavesFrequencyX, wavesFrequencyY, wavesSpeed, depthColor, surfaceColor, colorOffset, colorMultiplier, wavesElevationS, wavesFrequencyS, wavesSpeedS, wavesIterations } = useControls( 'Waves',{
    //     wavesElevation:
    //     { value: 0.19, min: 0, max: 1.5, step: 0.01, label: 'Elevation',
    //         onChange:(value) => {
    //             if (waterRef.current) {
    //                 waterRef.current.uniforms.uBigWavesElevation.value = value}
    //     }},
    //     wavesFrequencyX:
    //     { value: 4.19, min: 0, max: 10, step: 0.01, label: 'FrequencyX',
    //         onChange:(value) => {
    //             if (waterRef.current) {
    //                 waterRef.current.uniforms.uBigWavesFrequency.value.x = value}
    //     }},
    //     wavesFrequencyY:
    //     { value: 2.18, min: 0, max: 10, step: 0.01, label: 'FrequencyY',
    //         onChange:(value) => {
    //             if (waterRef.current) {
    //                 waterRef.current.uniforms.uBigWavesFrequency.value.y = value}
    //     }},
    //     wavesSpeed:
    //     { value: 0.55, min: 0, max: 2, step: 0.01, label: 'Speed',
    //         onChange:(value) => {
    //             if (waterRef.current) {
    //                 waterRef.current.uniforms.uBigWavesSpeed.value = value}
    //     }},
    //     surfaceColor:
    //     { value: '#10b3bb', onChange: (value) => { if (waterRef.current) 
    //         { waterRef.current.uniforms.uSurfaceColor.value.set(value) }
    //     }},
    //     depthColor: 
    //     { value: '#131e56', onChange: (value) => { if (waterRef.current)
    //         { waterRef.current.uniforms.uDepthColor.value.set(value) }
    //     }},
    //     colorOffset:
    //     { value: 0.35, min: 0, max: 1, step: 0.01, label: 'ColorOffset',
    //         onChange: (value) => { if(waterRef.current)
    //             { waterRef.current.uniforms.uColorOffset.value = value }
    //     }},
    //     colorMultiplier:
    //     { value: 1.31, min: 0, max: 10, step: 0.01, label: 'ColorMultiplier',
    //         onChange: (value) => { if(waterRef.current)
    //             { waterRef.current.uniforms.uColorMultiplier.value = value }
    //     }},
    //     wavesElevationS:
    //     { value: 0.20, min: 0, max: 1, step: 0.01, label: 'Small Elevation',
    //         onChange:(value) => {
    //             if (waterRef.current) {
    //                 waterRef.current.uniforms.uSmallWavesElevation.value = value}
    //     }},
    //     wavesFrequencyS:
    //     { value: 3.66, min: 0, max: 30, step: 0.01, label: 'Small Frequency',
    //         onChange:(value) => {
    //             if (waterRef.current) {
    //                 waterRef.current.uniforms.uSmallWavesFrequency.value = value}
    //     }}, 
    //     wavesSpeedS:
    //     { value: 0.2, min: 0, max: 4, step: 0.01, label: 'Small Speed',
    //         onChange:(value) => {
    //             if (waterRef.current) {
    //                 waterRef.current.uniforms.uSmallWavesSpeed.value = value}
    //     }},
    //     wavesIterations:
    //     { value: 2, min: 0, max: 5, step: 1, label: 'Small Iterations',
    //         onChange:(value) => {
    //             if (waterRef.current) {
    //                 waterRef.current.uniforms.uSmallIterations.value = value}
    //     }}, 
    // }, { collapsed: true})

    // Shader
    const waterMaterial = new THREE.ShaderMaterial({
        vertexShader: waterVertexShader,
        fragmentShader: waterFragmentShader,
        uniforms: {
            uBigWavesElevation: { value: 0.19 },
            uBigWavesFrequency: { value: new THREE.Vector2(4.19, 2.18) },
            uTime: { value: 0 },
            uBigWavesSpeed: { value: 0.55 },
            uDepthColor: { value: new THREE.Color('#131e56') },
            uSurfaceColor: { value: new THREE.Color('#10b3bb') },
            uColorOffset: { value: 0.35 },
            uColorMultiplier: { value: 1.31 },
            uSmallWavesElevation: { value: 0.20 },
            uSmallWavesFrequency: { value: 3.66 },
            uSmallWavesSpeed: { value: 0.2 },
            uSmallIterations: { value: 2 },

        }
    })

    // Clouds
    const cloud1 = useRef()
    const cloud2 = useRef()
    const cloud3 = useRef()
    const cloud4 = useRef()
    const cloud5 = useRef()

    // Animate
    useFrame((state, delta) =>
        {
            waterMaterial.uniforms.uTime.value += delta * 3

            const time = state.clock.elapsedTime

            cloud1.current.position.z = Math.cos(time / 2) * 1.2
            cloud1.current.rotation.y = Math.sin(time / 2) * 2
            cloud2.current.position.z = Math.sin(time / 2) + 2.5
            cloud2.current.rotation.y = Math.cos(time / 2) * 2
            cloud3.current.position.z = Math.cos(time / 2) - 0.2
            cloud3.current.rotation.y = Math.sin(time / 2)
            cloud4.current.position.z = Math.cos(time / 2) - 0.22
            cloud4.current.rotation.y = Math.sin(time / 2) + 2
            cloud5.current.rotation.y = Math.sin(time / 2) * 3
            cloud5.current.position.z = Math.cos(time / 2) + 2
        }) 
       
    return <>

        <mesh rotation-x={ 4.8 } material={ waterMaterial } position-y={-0.3} >
            <planeGeometry args={[ 3.4, 4, 512, 512 ]} />
        </mesh>

        <Clouds material={ THREE.MeshBasicMaterial } >
            <Cloud
                ref={ cloud1 }
                color="#385c70"
                scale={ 0.2 }
                opacity={ 0.2 }
                seed={ 10 }
                segments={ 10 }
                volume={ 4 }
                fade={ 8 }
                growth={ 5 }
                position={[ 0, 1.5, 0 ]}
            />
            <Cloud
                ref={ cloud2 }
                color="#ffffff"
                scale={ 0.13 }
                opacity={ 0.1 }
                seed={ 80 }
                segments={ 12 }
                volume={ 12 }
                fade={ 15 }
                growth={ 10 }
                position={[ -1, 0.4, 2 ]}
            />          
            <Cloud
                ref={ cloud3 }
                color="#5d9291"
                scale={ 0.16 }
                opacity={ 0.2 }
                seed={ 3 }
                segments={ 5 }
                volume={ 6 }
                fade={ 2 }
                growth={ 10 }
                position={[ 1, 0.6, -1.5 ]}
            />
            <Cloud
                ref={ cloud4 }
                color="#788ea5"
                scale={ 0.16 }
                opacity={ 0.2 }
                seed={ 3 }
                segments={ 5 }
                volume={ 6 }
                fade={ 2 }
                growth={ 10 }
                position={[ -1.5, 1.5, -1.5 ]}
            />
            <Cloud
                ref={ cloud5 }
                color="#897599"
                scale={ 0.13 }
                opacity={ 0.1 }
                seed={ 100 }
                segments={ 12 }
                volume={ 20 }
                fade={ 15 }
                growth={ 10 }
                position={[ 1, 0.5, 1 ]}
            />  
        </Clouds>
    </>
}