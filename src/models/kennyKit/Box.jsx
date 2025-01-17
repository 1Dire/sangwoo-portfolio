import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { boxData } from "../../data/objectData.jsx";

// GLTF 모델 미리 로드
useGLTF.preload("./models/kennyKit/object/platformer/crate.glb");

function ObjectGenerate({ item, index, modelPath, modelKey }) {
  // GLTF 모델 로드
  const { scene } = useGLTF(modelPath);

  // 그림자 설정
  scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, scale, show, clickEvent } = useControls(
    `${modelKey}_${index + 1}`,
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
      scale: item.scale || 1,  // 기본값 설정
      show: true,
      clickEvent: false,
    },
    { collapsed: true }
  );

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
              console.log(`${modelKey}_${index + 1}`);
            }
          }}
        >
          <primitive object={scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}

export default function Box() {
  return (
    <>
      {boxData.map((item, index) => (
        <ObjectGenerate
          key={index}
          item={item}
          index={index}
          modelPath="./models/kennyKit/object/platformer/crate.glb"
          modelKey="Box"
        />
      ))}
    </>
  );
}
