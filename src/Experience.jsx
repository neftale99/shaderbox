import { OrbitControls } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import Box from '/MagicBox/Box.jsx'

export default function Experience()
{

    return <>
    
        <color args={[ 'black' ]} attach="background" />

        <OrbitControls />

        <Box />

    </>
}