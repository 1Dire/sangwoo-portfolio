import React from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

useGLTF.preload("./models/etc/fantasy/Fantasy_BlackSmith.glb");

export default function Blacksmith({ item, index }) {
  const { scene } = useGLTF("./models/etc/fantasy/Fantasy_Blacksmith.glb");

  scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show } = useControls("BlackSmith_" + (index + 1), {
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
    show: true,
  },{collapsed:false});

  return (
    <>
      {show && (
        <RigidBody
          type="fixed"
          position={[position.x, position.y, position.z]}
          rotation={[
            THREE.MathUtils.degToRad(rotation.x),
            THREE.MathUtils.degToRad(rotation.y),
            THREE.MathUtils.degToRad(rotation.z),
          ]}
         
          colliders="hull"
        >
          <primitive
            object={scene.clone()}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
        
          />
        </RigidBody>
      )}
    </>
  );
}
