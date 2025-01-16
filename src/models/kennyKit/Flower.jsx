import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { flowertData } from "../../data/objectData.jsx";
import { folder, useControls } from "leva";
useGLTF.preload("./models/kennyKit/object/platformer/flowers.glb");
useGLTF.preload("./models/kennyKit/object/platformer/flowers-tall.glb");

function FlowerTypeA({ item, index }) {
  const model = useGLTF("./models/kennyKit/object/platformer/flowers.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent ,scale } = useControls(
    "Flower_TypeA_" + (index + 1),
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
      scale : 0.5
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
              console.log("Flower_TypeA_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function FlowerTypeB({ item, index }) {
  const model = useGLTF("./models/kennyKit/object/platformer/flowers-tall.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent ,scale} = useControls(
    "Flower_TypeB_" + (index + 1),
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
      scale:0.5,
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
              console.log("Flower_TypeB_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}

export default function Flower() {
  const typeAflower = flowertData.filter((item) => item.type === "A");
  const typeBflower= flowertData.filter((item) => item.type === "B");
  return (
    <>
      {typeAflower.map((item, index) => (
        <FlowerTypeA item={item} key={index} index={index} />
      ))}
      {typeBflower.map((item, index) => (
        <FlowerTypeB item={item} key={index} index={index} />
      ))}
     
    </>
  );
}
