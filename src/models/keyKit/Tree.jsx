import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { treeData } from "../../data/objectData.jsx";

// GLTF 모델 미리 로드
useGLTF.preload("./models/keyKit/object/detail_treeA.glb");
useGLTF.preload("./models/keyKit/object/detail_treeB.glb");
useGLTF.preload("./models/keyKit/object/detail_treeC.glb");

// 공통 Tree 컴포넌트
function TreeType({ model, item, index, type }) {
  if (!model) return null; // 모델이 로드되지 않았을 때 처리

  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  return (
    <>
      <RigidBody
        type="fixed"
        key={index}
        position={[item.position[0], item.position[1], item.position[2]]}
        rotation={[
          THREE.MathUtils.degToRad(item.rotation[0]),
          THREE.MathUtils.degToRad(item.rotation[1]),
          THREE.MathUtils.degToRad(item.rotation[2]),
        ]}
        mass={0}
        scale={1}
        colliders="hull"
      >
        <primitive object={model.scene.clone()} />
      </RigidBody>
    </>
  );
}

// Tree 컴포넌트
export default function Tree() {
  // 나무 데이터를 타입별로 필터링
  const typeATree = treeData.filter((item) => item.type === "A");
  const typeBTree = treeData.filter((item) => item.type === "B");
  const typeCTree = treeData.filter((item) => item.type === "C");

  // 모델 로드 (useGLTF 훅을 사용하여 모델이 로드될 때까지 기다림)
  const modelA = useGLTF("./models/keyKit/object/detail_treeA.glb", true);
  const modelB = useGLTF("./models/keyKit/object/detail_treeB.glb", true);
  const modelC = useGLTF("./models/keyKit/object/detail_treeC.glb", true);

  // 각 타입에 맞게 트리 모델 렌더링
  return (
    <>
      {typeATree.map((item, index) => (
        <TreeType key={index} model={modelA} item={item} index={index} type="A" />
      ))}
      {typeBTree.map((item, index) => (
        <TreeType key={index} model={modelB} item={item} index={index} type="B" />
      ))}
      {typeCTree.map((item, index) => (
        <TreeType key={index} model={modelC} item={item} index={index} type="C" />
      ))}
    </>
  );
}
