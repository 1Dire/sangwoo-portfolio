import React, { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { watermillData } from "../../data/objectData.jsx";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

useGLTF.preload("./models/keyKit/object/watermill.glb");

function WatermillGenerate({ item, index }) {
  const model = useGLTF("./models/keyKit/object/watermill.glb");
  const wheelRef = useRef();

  // Shadow 설정
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent, rotationSpeed } = useControls(
    "Watermill_" + (index + 1),
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
      show: true,
      clickEvent: false,
      rotationSpeed: { value: 1, min: 0, max: 10, step: 0.1 }, // Leva 컨트롤로 회전 속도 설정
    },
    { collapsed: true }
  );

  // useFrame을 사용하여 물레방아 휠 회전
  useFrame((state, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.x += rotationSpeed * delta; 
    }
  });

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
          scale={1}
          colliders="hull"
          onClick={(event) => {
            event.stopPropagation();
            if (clickEvent) {
              console.log("Watermill_" + (index + 1));
            }
          }}
        >
          {/* 휠 노드에 ref 연결 */}
          <primitive
            object={model.scene.clone()}
            dispose={null}
            onUpdate={(self) => {
              const wheel = self.getObjectByName("watermill_wheel");
              if (wheel) {
                wheelRef.current = wheel; // watermill_wheel을 wheelRef에 저장
              }
            }}
          />
        </RigidBody>
      )}
    </>
  );
}

export default function Watermill() {
  return (
    <>
      {watermillData.map((item, index) => (
        <WatermillGenerate item={item} key={index} index={index} />
      ))}
    </>
  );
}
