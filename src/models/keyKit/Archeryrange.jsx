import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { archeryrangeData } from "../../data/objectData.jsx";
import { useControls } from "leva";
useGLTF.preload("./models/keyKit/object/archeryrange.glb");

function ArcheryrangeGenerate({ item, index }) {
  const { scene } = useGLTF("./models/keyKit/object/archeryrange.glb");
  // 모델에 대한 그림자 설정
  scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  // useControls의 값들을 설정
  const { position, rotation, show, clickEvent } = useControls(
    "Archeryrange_" + (index + 1),
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
              console.log("Archeryrange_" + (index + 1));
            }
          }}
        >
           <primitive object={scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}

export default function Archeryrange() {
  return (
    <>
      {archeryrangeData.map((item, index) => (
        <ArcheryrangeGenerate item={item} key={index} index={index} />
      ))}
    </>
  );
}
