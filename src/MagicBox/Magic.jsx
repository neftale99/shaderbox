import { MeshPortalMaterial, useGLTF, Environment } from '@react-three/drei'
import { useRef } from 'react'

export default function Magic({ rotation = [0, 0, 0], background, emissive, roughness, metalness, children, index })
{
    const mesh = useRef()
    const { nodes } = useGLTF('/Box.glb')

    return<>

        <MeshPortalMaterial attach={`material-${index}`} >

            <ambientLight intensity={ 0.2 } />
            <Environment preset='night' />

            <mesh castShadow receiveShadow rotation={ rotation } geometry={ nodes.Cube.geometry } scale={ 2 } >
                <meshStandardMaterial 
                    aoMapIntensity={ 1 }
                    aoMap={ nodes.Cube.material.aoMap }
                    color={ background }
                    emissive={ emissive }
                    roughness={ roughness }
                    metalness={ metalness }
                />
            </mesh>

            <mesh castShadow receiveShadow ref={ mesh } >
                { children }
                <meshLambertMaterial color={ background }/>
            </mesh>

        </MeshPortalMaterial>
    
    </>
}