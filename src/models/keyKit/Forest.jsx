import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { forestData } from "../../data/objectData.jsx";
import { useControls } from "leva";

// GLTF 모델 로딩 최적화: 여러 개의 모델을 미리 로드
useGLTF.preload("./models/keyKit/object/detail_forestA.glb");
useGLTF.preload("./models/keyKit/object/detail_forestB.glb");
useGLTF.preload("./models/keyKit/object/forest.glb");

function ForestType({ item, index, modelPath, modelKey }) {
  // 공통 GLTF 모델 로드
  const { scene } = useGLTF(modelPath);
  
  // 그림자 설정
  scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
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
          scale={1}
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

export default function Forest() {
  const typeAForest = forestData.filter((item) => item.type === "A");
  const typeBForest = forestData.filter((item) => item.type === "B");
  const typeCForest = forestData.filter((item) => item.type === "C");

  return (
    <>
      {typeAForest.map((item, index) => (
        <ForestType
          key={index}
          item={item}
          index={index}
          modelPath="./models/keyKit/object/detail_forestA.glb"
          modelKey="ForestTypeA"
        />
      ))}
      {typeBForest.map((item, index) => (
        <ForestType
          key={index}
          item={item}
          index={index}
          modelPath="./models/keyKit/object/detail_forestB.glb"
          modelKey="ForestTypeB"
        />
      ))}
      {typeCForest.map((item, index) => (
        <ForestType
          key={index}
          item={item}
          index={index}
          modelPath="./models/keyKit/object/forest.glb"
          modelKey="ForestTypeC"
        />
      ))}
    </>
  );
}
