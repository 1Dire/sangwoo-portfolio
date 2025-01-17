import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { mushroomData } from "../../data/objectData.jsx";
import { useControls } from "leva";

// GLTF 모델을 미리 로드
useGLTF.preload("./models/kennyKit/object/platformer/mushrooms.glb");

function MushroomGenerate({ item, index }) {
  const { scene } = useGLTF("./models/kennyKit/object/platformer/mushrooms.glb");

  // 그림자 설정
  scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  // useControls로 위치, 회전, 크기 등을 설정
  const { position, rotation, scale, show, clickEvent } = useControls(
    "Mushroom_" + (index + 1),
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
              console.log("Mushroom_" + (index + 1));
            }
          }}
        >
          {/* 모델을 복제하여 렌더링 */}
          <primitive object={scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}

export default function Chest() {
  return (
    <>
      {mushroomData.map((item, index) => (
        <MushroomGenerate item={item} key={index} index={index} />
      ))}
    </>
  );
}
