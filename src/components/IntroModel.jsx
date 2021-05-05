import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import DNA from './Dna'
// import World from './World'

extend({ OrbitControls })

export default function IntroModel() {

    const CameraControls = () => {

        const controls = useRef()
        const {
            camera,
            gl: { domElement },
        } = useThree()

        useFrame(() => {
            if(controls.current !== null)
                controls.current.update()
        })

        return (
            <orbitControls
                ref={controls}
                args={[camera, domElement]}
                autoRotate={false}
                enableZoom={false}
            />
        )

    }

    return (
        // <Canvas linear={true} flat={false} gl={{ alpha: false, antialias: false }} camera={{ position: [-3, 3, -1], fov: 35 }}>
        <Canvas camera={{ position: [-3, 3, -1], fov: 35 }}>
            <CameraControls />
            <ambientLight intensity={.3} />
            <directionalLight position={[10, 10, 15]} intensity={1} />
            {/* <pointLight position={[10, 10, 15]} intensity={1} /> */}
            {/* <World position={[0, 0, 0]} /> */}
            <Suspense fallback={null}>
                <DNA position={[0, 0, 0]} />
            </Suspense>
        </Canvas>
    )

}