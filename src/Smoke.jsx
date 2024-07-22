import * as THREE from 'three'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import smokeVetexShader from './shaders/smoke/vertex.glsl'
import smokeFragmentShader from './shaders/smoke/fragment.glsl'


export default function Smoke()
{

    const vela = useGLTF('vela.glb')
    const fire = useAnimations(vela.animations, vela.scene)

    const smokeRef = useRef()
    const  noiseTexture = useTexture('noiseTexture.png')
    noiseTexture.wrapS = THREE.RepeatWrapping
    noiseTexture.wrapT = THREE.RepeatWrapping

    const smokeMaterial = new THREE.ShaderMaterial({
        vertexShader: smokeVetexShader,
        fragmentShader: smokeFragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        uniforms: {
            uTexture: { value: noiseTexture },
            uTime: { value: 0 }
        }
    })

    // Animation model
    useEffect(()=>
        {
            const action = fire.actions.KeyAction
            if (action){
                action.timeScale = 2
                action.play()
            }
        }, [])

    // Animation shader
    useFrame((state, delta) => {
        smokeMaterial.uniforms.uTime.value += delta
    })
    
    return<>

    <primitive 
        object={vela.scene} 
        scale={ 0.5 } 
        position={[ 0, -2, 0 ]} 
    />
    <mesh position={[ 0.15, 1, 0 ]} scale={[ 0.6, 7, 0.6 ]} material={ smokeMaterial } >
        <planeGeometry args={[ 0.8, 0.8, 16, 64 ]} />
    </mesh>
    
    </>
}