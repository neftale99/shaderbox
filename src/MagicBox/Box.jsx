import { Edges, Sphere, Stars, Center } from '@react-three/drei'
import Magic from './Magic.jsx'
import Water from '../water.jsx'
import Hologram from '../Hologram.jsx'
import Halftone from '../Halftone.jsx'
import Flag from '../Flag.jsx'
import Smoke from '../Smoke.jsx'
import Shader from '../shader.jsx'


export default function Box()
{
    return<>
        
        <Stars 
            radius={50} 
            depth={80} 
            count={5000} 
            factor={7} 
            saturation={0} 
            fade speed={2} 
        />

        <Center>
            <mesh rotation={[ 0, 4.37, 0 ]} >
                <boxGeometry args={[ 4, 4, 4 ]} />
                <Edges
                    linewidth={6}
                    scale={1}
                    threshold={15} 
                    color="white"
                />
                
                <Magic rotation={[0, 0, 0]} background="#f5f0f0" emissive="#004d40" roughness={ 0.1 } metalness={ 0.8 } index={0}>
                    <Flag />
                </Magic>
                <Magic rotation={[0, Math.PI, 0]} background="#fbff14" emissive="#8a0a0a" roughness={ 0.3 } metalness={ 1 } index={1}>
                    <Halftone />
                </Magic>
                <Magic rotation={[0, Math.PI / 2, Math.PI / 2]} background="#ffffff" emissive="#000000" roughness={ 0 } metalness={ 1 } index={2}>
                    <Smoke />
                </Magic>
                <Magic rotation={[0, Math.PI / 2, -Math.PI / 2]} background="#170713" emissive="#01514b" roughness={ 0 } metalness={ 1 } index={3}>
                    <Shader />
                </Magic>
                <Magic rotation={[0, -Math.PI / 2, 0]} background="#000000" emissive="#0b0a42" roughness={ 0.4 } metalness={ 1 } index={4}>
                    <Water />  
                </Magic>
                <Magic rotation={[0, Math.PI / 2, 0]} background="#ff57d2"  emissive="#4f033b" roughness={ 0.2 } metalness={ 1 }index={5}>
                    <Hologram />
                </Magic>
            </mesh>
        </Center>
        

    </>
}