import React from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
export default function Stone({ item, index }) {
  const model = useGLTF("./models/kenny_platformer/stones.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  const { position, rotation, showFence } = useControls(
    "Stone" + (index + 1),
    {
      position: {
        value: {
          x: item.position[0],
          y: item.position[1],
          z: item.position[2],
        },
        step: 0.1,
      },
      rotation: {
        value: {
          x: item.rotation[0],
          y: item.rotation[1],
          z: item.rotation[2],
        },
        step: 0.1,
      },
      showFence: true,
      collapsed: true, 
    }
  );
  return (
    <>
      {showFence && (
        <primitive
          object={model.scene.clone()}
          position={[position.x, position.y, position.z]}
          rotation={[
            THREE.MathUtils.degToRad(rotation.x),
            THREE.MathUtils.degToRad(rotation.y),
            THREE.MathUtils.degToRad(rotation.z),
          ]}
        />
      )}
    </>
  );
}
