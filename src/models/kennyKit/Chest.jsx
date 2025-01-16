import * as THREE from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { chestData } from "../../data/objectData.jsx";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

useGLTF.preload("./models/kennyKit/object/platformer/chest.glb");

function ChestGenerate({ item, index }) {
  const { scene, animations } = useGLTF("./models/kennyKit/object/platformer/chest.glb");
  const { actions } = useAnimations(animations, scene);

  const { position, rotation, show, clickEvent, scale } = useControls(
    "Chest_" + (index + 1),
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
      scale: item.scale,
      show: true,
      clickEvent: false,
    },
    { collapsed: true }
  );

  useEffect(() => {
    if (actions["open-close"]) {
      const action = actions["open-close"];
      action.play().setLoop(THREE.LoopRepeat, Infinity);

      // 애니메이션 속도 느리게 설정
      action.timeScale = 0.8; // 속도를 0.5로 설정하여 천천히 실행되도록 함
    }
  }, [actions]);

  return (
    <>
      {show && (
        <RigidBody
          type="fixed"
          key={index}
          position={[position.x, position.y, position.z]}
          rotation={[
            THREE.MathUtils.degToRad(rotation.x),
            THREE.MathUtils.degToRad(rotation.y),
            THREE.MathUtils.degToRad(rotation.z),
          ]}
          mass={0}
          scale={scale}
          colliders="hull"
          onClick={(event) => {
            event.stopPropagation();
            if (clickEvent) {
              console.log("Chest_" + (index + 1));
            }
          }}
        >
          <primitive object={scene} />
        </RigidBody>
      )}
    </>
  );
}

export default function Chest() {
  return (
    <>
      {chestData.map((item, index) => (
        <ChestGenerate item={item} key={index} index={index} />
      ))}
    </>
  );
}
