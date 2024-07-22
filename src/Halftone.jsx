import * as THREE from 'three'
import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { Clone, useGLTF } from '@react-three/drei'

import halftoneVertexShader from './shaders/halftone/vertex.glsl'
import halftoneFragmentShader from './shaders/halftone/fragment.glsl'
import halftoneFragmentShader2 from './shaders/halftone/fragment2.glsl'
import halftoneFragmentShader3 from './shaders/halftone/fragment3.glsl'


export default function Halftone()
{

    const { size } = useThree()
    const sizeValue =  new THREE.Vector2(size.width, size.height).multiplyScalar(window.devicePixelRatio)

    const spider = useGLTF('./Spider.glb')

    const halftoneMaterial = new THREE.ShaderMaterial({
        vertexShader: halftoneVertexShader,
        fragmentShader: halftoneFragmentShader,
        uniforms:{
            uColor: { value: new THREE.Color('#b70a1b') },
            uResolution: { value: sizeValue },
            uShadowRepetitions: { value: 66 },
            uShadowColor: { value: new THREE.Color('#4116c4') }
        }
    })

    const halftoneMaterial2 = new THREE.ShaderMaterial({
        vertexShader: halftoneVertexShader,
        fragmentShader: halftoneFragmentShader2,
        uniforms:{
            uColor: { value: new THREE.Color('#000000') },
            uResolution: { value: sizeValue },
            uShadowRepetitions: { value: 30 },
            uShadowColor: { value: new THREE.Color('#990a0a') }
        }
    })

    const halftoneMaterial3 = new THREE.ShaderMaterial({
        vertexShader: halftoneVertexShader,
        fragmentShader: halftoneFragmentShader3,
        uniforms:{
            uColor: { value: new THREE.Color('#ffffff') },
            uResolution: { value: sizeValue },
            uShadowRepetitions: { value: 45 },
            uShadowColor: { value: new THREE.Color('#c11a84') }
        }
    })

    const clone = (scene, material) => {
        return useMemo(() => {
            const clone = scene.clone(true)
            clone.traverse((child) => {
                if (child.isMesh) {
                    child.material = material.clone()
                }
            })
            return clone
        }, [ scene, material ])
    }

    const spider1 = clone(spider.scene, halftoneMaterial)
    const spider2 = clone(spider.scene, halftoneMaterial2)
    const spider3 = clone(spider.scene, halftoneMaterial3)

    return<>
        <Clone
            object={spider1}
            scale={0.2}
            rotation-y={Math.PI / 2}
            position={[ -1, -0.1, 0 ]}
        />
        <Clone
            object={spider2}
            scale={0.09}
            rotation-y={Math.PI / 2}
            position={[ -2, -0.1, -1 ]}
        />
        <Clone
            object={spider3}
            scale={0.09}
            rotation-y={Math.PI / 2}
            position={[ -2, -0.1, 1 ]}
        />  
    </>
}
