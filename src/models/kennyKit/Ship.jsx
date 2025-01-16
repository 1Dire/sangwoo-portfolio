import React, { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { shipData } from "../../data/objectData.jsx";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

useGLTF.preload("./models/kennyKit/object/pirate/ship-small.glb");

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

function ShipGenerate({ item, index }) {
  const model = useGLTF("./models/kennyKit/object/pirate/ship-small.glb");
  const modelRef = useRef();

  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent, scale } = useControls(
    "Ship" + (index + 1),
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

  const rotationTarget = useRef(0);

  useFrame((state) => {
    if (modelRef.current) {
      const time = state.clock.getElapsedTime();
      const range = 0.5; // 배가 이동할 거리 범위

      const z = item.position[2] + Math.sin(time) * range;

      const direction = Math.cos(time);
      const targetAngle = direction > 0 ? 0 : Math.PI;

      rotationTarget.current = lerpAngle(
        rotationTarget.current,
        targetAngle,
        0.05
      );

      modelRef.current.setNextKinematicTranslation(
        new THREE.Vector3(position.x, position.y, z)
      );
      modelRef.current.setNextKinematicRotation(
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, rotationTarget.current, 0)
        )
      );
    }
  });

  return (
    <>
      {show && (
        <RigidBody
          ref={modelRef}
          type="kinematicPosition"
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
              console.log("Ship" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}

export default function Ship() {
  return (
    <>
      {shipData.map((item, index) => (
        <ShipGenerate item={item} key={index} index={index} />
      ))}
    </>
  );
}
