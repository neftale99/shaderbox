import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

import hologramVertexShader from './shaders/hologram/vertex.glsl'
import hologramFragmentShader from './shaders/hologram/fragment.glsl'


export default function Hologram()
{
    const gameRef = useRef()

    const { nodes } = useGLTF('gameboy.glb')

    // Shader
    const hologramMaterial = new THREE.ShaderMaterial({
        vertexShader: hologramVertexShader,
        fragmentShader: hologramFragmentShader,
        uniforms:
             {
                uTime: { value: 0},
                uColor: { value: new THREE.Color('#00ffa2')}
            },
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
    })
        
    // Animate
    useFrame((state, delta) => 
        {
            hologramMaterial.uniforms.uTime.value += delta 
     
            const move = 1.5 
            const time = state.clock.elapsedTime
            const sin = Math.sin(time)
            gameRef.current.position.z = sin * move 
        })

    return<>

        <mesh 
            geometry={ nodes.Gameboy.geometry }
            scale={ 1.7 }
            material={ hologramMaterial }   
            rotation={[ 2, -0.8, 3.65 ]}
            position={[ 0.5, -1.3, -2.0 ]}  
            ref={ gameRef }      
        />
        
    </>
}