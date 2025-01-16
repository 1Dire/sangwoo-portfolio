import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { forestData } from "../../data/objectData.jsx";
import { folder, useControls } from "leva";
useGLTF.preload("./models/keyKit/object/detail_forestA.glb");
useGLTF.preload("./models/keyKit/object/detail_forestB.glb");
useGLTF.preload("./models/keyKit/object/forest.glb");
function ForestTypeA({ item, index }) {
  const model = useGLTF("./models/keyKit/object/detail_forestA.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "ForestTypeA_" + (index + 1),
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
              console.log("ForestTypeA_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function ForestTypeB({ item, index }) {
  const model = useGLTF("./models/keyKit/object/detail_forestB.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "ForestTypeB_" + (index + 1),
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
              console.log("ForestTypeB_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}

function ForestTypeC({ item, index }) {
  const model = useGLTF("./models/keyKit/object/forest.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "ForestTypeC_" + (index + 1),
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
              console.log("ForestTypeC_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
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
        <ForestTypeA item={item} key={index} index={index} />
      ))}
      {typeBForest.map((item, index) => (
        <ForestTypeB item={item} key={index} index={index} />
      ))}
       {typeCForest.map((item, index) => (
        <ForestTypeC item={item} key={index} index={index} />
      ))}
    </>
  );
}
