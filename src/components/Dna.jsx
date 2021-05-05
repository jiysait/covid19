import React, { useRef } from 'react'
import { CubeCamera, LinearMipMapLinearFilter, RGBFormat, WebGLCubeRenderTarget } from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import DNA from '../models/dna_light.gltf'


export default function Dna(props) {

  const group = useRef()
  const mesh = useRef()

  // const { nodes, materials } = useGLTF(DNA)
  const { nodes } = useGLTF(DNA)
  const { scene, gl } = useThree()

  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBFormat,
    generateMipmaps: true,
    minFilter: LinearMipMapLinearFilter,
  })

  const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget)

  cubeCamera.position.set(0, 100, 0)
  scene.add(cubeCamera)

  useFrame(() => {
    cubeCamera.update(gl, scene)
    mesh.current.rotation.x += 0.01
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* <mesh geometry={nodes.Cube001.geometry} material={materials.Material} scale={[0.04, 0.04, 0.04]} /> */}
      <mesh ref={mesh} geometry={nodes.Cube001.geometry} scale={[0.04, 0.04, 0.04]}>
        <meshStandardMaterial
          attach="material"
          envMap={cubeCamera.renderTarget.texture}
          color="white"
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload(DNA)