import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { floorData, waterData } from "../data/floorData.jsx";
import { folder, useControls } from "leva";

// Preload all models in one place
const models = [
  "./models/keyKit/hex/hex_forest_detail.glb",
  "./models/keyKit/hex/hex_water.glb",
  "./models/keyKit/hex/hex_water_detail.glb",
  "./models/keyKit/hex/hex_forest_waterB_detail.glb",
  "./models/keyKit/hex/hex_forest_roadA_detail.glb",
  "./models/keyKit/hex/hex_forest_roadB.glb",
  "./models/keyKit/hex/hex_rock.glb",
  "./models/keyKit/hex/hex_forest_transitionA.glb",
  "./models/keyKit/hex/hex_forest_roadD_detail.glb",
  "./models/keyKit/hex/hex_forest_roadE_detail.glb",
  "./models/keyKit/hex/hex_rock_roadA.glb",
  "./models/keyKit/hex/hex_rock_roadB.glb",
  "./models/keyKit/hex/hex_rock_roadD.glb",
];

models.forEach((model) => useGLTF.preload(model));

function HexTile({ modelPath, item, index, type }) {
  const model = useGLTF(modelPath);
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    type + "_" + (index + 1),
    {
      position: {
        value: { x: item.position[0], y: item.position[1], z: item.position[2] },
        step: 0.1,
      },
      rotation: {
        value: { x: item.rotation[0], y: item.rotation[1], z: item.rotation[2] },
        step: 0.1,
      },
      show: true,
      clickEvent: true,
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
          onUpdate={(obj) => {
            obj.traverse((child) => {
              if (child.isMesh) {
                child.material.depthBias = 0.001;
              }
            });
          }}
          onClick={(event) => {
            event.stopPropagation();
            if (clickEvent) {
              console.log(type + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}

export default function Floor() {
  const floorTiles = [
    { data: floorData, type: "hex_forest_detail", modelPath: "./models/keyKit/hex/hex_forest_detail.glb" },
    { data: floorData, type: "hex_forest_roadA_detail", modelPath: "./models/keyKit/hex/hex_forest_roadA_detail.glb" },
    { data: floorData, type: "hex_forest_roadB", modelPath: "./models/keyKit/hex/hex_forest_roadB.glb" },
    { data: floorData, type: "hex_forest_roadD_detail", modelPath: "./models/keyKit/hex/hex_forest_roadD_detail.glb" },
    { data: floorData, type: "hex_forest_roadE_detail", modelPath: "./models/keyKit/hex/hex_forest_roadE_detail.glb" },
    { data: floorData, type: "hex_forest_transitionA", modelPath: "./models/keyKit/hex/hex_forest_transitionA.glb" },
    { data: floorData, type: "hex_rock", modelPath: "./models/keyKit/hex/hex_rock.glb" },
    { data: floorData, type: "hex_rock_roadA", modelPath: "./models/keyKit/hex/hex_rock_roadA.glb" },
    { data: floorData, type: "hex_rock_roadB", modelPath: "./models/keyKit/hex/hex_rock_roadB.glb" },
    { data: floorData, type: "hex_rock_roadD", modelPath: "./models/keyKit/hex/hex_rock_roadD.glb" },
    { data: waterData, type: "hex_water", modelPath: "./models/keyKit/hex/hex_water.glb" },
    { data: waterData, type: "hex_water_detail", modelPath: "./models/keyKit/hex/hex_water_detail.glb" },
    { data: waterData, type: "hex_forest_waterB_detail", modelPath: "./models/keyKit/hex/hex_forest_waterB_detail.glb" },
  ];

  return (
    <>
      {floorTiles.map((tile, index) => (
        tile.data.filter((item) => item.type === tile.type).map((item, i) => (
          <HexTile 
            key={i}
            modelPath={tile.modelPath}
            item={item}
            index={i}
            type={tile.type}
          />
        ))
      ))}
    </>
  );
}
