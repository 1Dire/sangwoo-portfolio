import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Terrain() {
  const { scene } = useGLTF("./models/kenny_platformer/block-grass-large.glb");

  scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <>
      <RigidBody type="kinematicPosition">
        <primitive object={scene.clone()} scale={2.9} />
      </RigidBody>
    </>
  );
}
