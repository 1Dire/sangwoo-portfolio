import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { patchData } from "../../data/objectData.jsx";
import { useControls } from "leva";

// GLTF 모델 미리 로드
useGLTF.preload("./models/kennyKit/object/pirate/grass-patch.glb");

function PatchGenerate({ item, index }) {
  // 이미 미리 로드된 모델을 사용
  const { scene } = useGLTF("./models/kennyKit/object/pirate/grass-patch.glb");

  // 그림자 설정
  scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent, scale } = useControls(
    `Patch_${index + 1}`,
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
              console.log(`Patch_${index + 1}`);
            }
          }}
        >
          <primitive object={scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}

export default function Patch() {
  return (
    <>
      {patchData.map((item, index) => (
        <PatchGenerate item={item} key={index} index={index} />
      ))}
    </>
  );
}
