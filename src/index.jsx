import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Loader } from '@react-three/drei'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [ -3, 1.5, 9 ]
        } }
        >
            <Suspense fallback={null}>
                <Experience />
            </Suspense>
        </Canvas>

        <Loader
        containerStyles={{ 
            backgroundColor: 'rgba(0, 0, 0, 1)',
            width: '100%',
            height: '100%'
        }}
        innerStyles={{ 
            width: '80%',
            height: '100%' 
        }}
        barStyles={{ 
            backgroundColor: 'white',
            height: '50px' 
        }}
        dataStyles={{ 
            color: '#FFF',
            fontSize: '24px' 
        }}
        dataInterpolation={(p) => `Cargando ${p.toFixed(2)}%`}
        initialState={(active) => active}
        />
    </>
)