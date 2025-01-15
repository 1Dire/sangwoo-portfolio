import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { floorData, waterData } from "../data/floorData.jsx";
import { folder, useControls } from "leva";
useGLTF.preload("./models/keyKit/hex/hex_forest_detail.glb");
useGLTF.preload("./models/keyKit/hex/hex_water.glb");
function HexForestDetail({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_forest_detail.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show } = useControls(
    "Hex_forest" + (index + 1),
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
    },
    { collapsed: true }
  );

  return (
    <>
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
          console.log("Hex_forest" + (index + 1));
        }}
      >
        <primitive object={model.scene.clone()} />
      </RigidBody>
    </>
  );
}
function HexWater({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_water.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  const { position, rotation, show } = useControls(
    "Hex_water" + (index + 1),
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
    },
    { collapsed: true }
  );

  return (
    <>
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
          console.log("Hex_water" + (index + 1));
        }}
      >
        <primitive object={model.scene.clone()} />
      </RigidBody>
    </>
  );
}
export default function Floor() {
  const hexForestDetails = floorData.filter(
    (item) => item.type === "hex_forest_detail"
  );
  const hexWater = waterData.filter((item) => item.type === "hex_water");
  return (
    <>
      <RigidBody
        type="fixed"
        position={[0, 0, 0]}
        mass={0}
        scale={1}
        colliders="hull"
      >
        {hexForestDetails.map((item, index) => (
          <HexForestDetail item={item} key={index} index={index} />
        ))}
        {hexWater.map((item, index) => (
          <HexWater item={item} key={index} index={index} />
        ))}
      </RigidBody>
    </>
  );
}
