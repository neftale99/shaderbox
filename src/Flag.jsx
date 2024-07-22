import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useReducer, useRef } from 'react'
import { useControls } from 'leva'

import flagVertexShader from './shaders/flag/vertex.glsl'
import flagFragmentShader from './shaders/flag/fragment.glsl'


export default function Flag()
{
    // Flag
    const flagTexture = useTexture('mexico.jpg')

    const materialFlag = new THREE.ShaderMaterial({
        vertexShader: flagVertexShader,
        fragmentShader: flagFragmentShader,
        uniforms: {
            uFrequency: { value: new THREE.Vector2(7, 5) },
            uTime: { value: 0 },
            uTexture: { value: flagTexture }
        }
    })

    // Animate
    useFrame((state, delta) =>
        {
            materialFlag.uniforms.uTime.value += delta * 2.5
        })     

    return <>

        <mesh rotation-y={ 1.5 } position-x={ 1 } material={ materialFlag }  >
            <planeGeometry  args={[ 3.5, 3, 22, 22 ]} />
        </mesh>
        
    </>
}
