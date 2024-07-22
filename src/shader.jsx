import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useRef, useMemo } from 'react'

import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

export default function Shader()
{
    // Shader

    const materialShader = new THREE.ShaderMaterial({
        vertexShader: portalVertexShader,
        fragmentShader: portalFragmentShader,
        uniforms:{
            uTime: { value: 0 },
            uColorStart: { value: new THREE.Color('#008080') },
            uColorEnd: { value: new THREE.Color('#ffff00') }
        },
        side: THREE.DoubleSide
    })


    useFrame((state, delta) =>
        {
            materialShader.uniforms.uTime.value += delta 
        })

    return <>
        <mesh 
            rotation={[ Math.PI/2 , 0, 0 ]} 
            material={ materialShader } 
            scale={ 2 }
            position={[ 0, 0.5, 0 ]}
            >
                <circleGeometry />
        </mesh>
        <Sparkles 
                    size={ 4 }
                    scale={[ 4, 2, 4 ]}
                    position={[ 0, 0.0, 0 ]}
                    speed={ 3 }
                    count={ 90 }
                    color="#16daa9"
                    noise={new THREE.Vector3(1, 0.5, 2)}
                    
                />
    </>
}