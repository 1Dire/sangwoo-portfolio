import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { flowertData } from "../../data/objectData.jsx";
import { useControls } from "leva";

// GLTF 모델 로딩 최적화
useGLTF.preload("./models/kennyKit/object/platformer/flowers.glb");
useGLTF.preload("./models/kennyKit/object/platformer/flowers-tall.glb");

function FlowerType({ item, index, modelPath, modelKey }) {
  // 모델 로드
  const { scene } = useGLTF(modelPath);

  // 그림자 설정
  scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  // 모델을 clone()하여 복제
  const clonedScene = scene.clone();

  const { position, rotation, show, clickEvent, scale } = useControls(
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
      scale: item.scale,
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
          <primitive object={clonedScene} />
        </RigidBody>
      )}
    </>
  );
}

export default function Flower() {
  const typeAflower = flowertData.filter((item) => item.type === "A");
  const typeBflower = flowertData.filter((item) => item.type === "B");

  return (
    <>
      {typeAflower.map((item, index) => (
        <FlowerType
          key={index}
          item={item}
          index={index}
          modelPath="./models/kennyKit/object/platformer/flowers.glb"
          modelKey="FlowerTypeA"
        />
      ))}
      {typeBflower.map((item, index) => (
        <FlowerType
          key={index}
          item={item}
          index={index}
          modelPath="./models/kennyKit/object/platformer/flowers-tall.glb"
          modelKey="FlowerTypeB"
        />
      ))}
    </>
  );
}
