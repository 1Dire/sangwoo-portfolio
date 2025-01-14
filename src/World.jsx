import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import * as THREE from "three";
import PlatformFortified from "./models/PlatformFortified.jsx";
import FenceStraight from "./models/FenceStraight.jsx";
import Stone from "./models/Stone.jsx";
import {
  fenceData,
  platFormFortifiedData,
  stoneData,
} from "./data/objectData.jsx";

// 바닥

function PlatForm({ position = [0, 0, 0], scale = 1, material = "grass" }) {
  const model = useGLTF("./models/kenny_platformer/block-grass-large.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  return (
    <>
      <primitive
        object={model.scene.clone()}
        scale={scale}
        position={position}
      />
    </>
  );
}

export default function World() {
  const { worldPostion, scale, show } = useControls("World", {
    worldPostion: { value: { x: 0, y: -5, z: 0 }, step: 0.1 },
    scale: 5,
    show: true,
  });

  return (
    <>
      <RigidBody type="fixed" colliders="trimesh">
        <group position={[worldPostion.x, worldPostion.y, worldPostion.z]}>
          {show && <PlatForm position={[0, 0, 0]} scale={scale} />}

          {platFormFortifiedData.map((item, index) => (
            <PlatformFortified key={index} item={item} index={index} />
          ))}
          {fenceData.map((item, index) => (
            <FenceStraight key={index} item={item} index={index} />
          ))}
          {stoneData.map((item, index) => (
            <Stone key={index} item={item} index={index} />
          ))}
        </group>
      </RigidBody>
    </>
  );
}
