import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { floorData, waterData } from "../data/floorData.jsx";
import { folder, useControls } from "leva";
useGLTF.preload("./models/keyKit/hex/hex_forest_detail.glb");
useGLTF.preload("./models/keyKit/hex/hex_water.glb");
useGLTF.preload("./models/keyKit/hex/hex_water_detail.glb");
useGLTF.preload("./models/keyKit/hex/hex_forest_waterB_detail.glb");
useGLTF.preload("./models/keyKit/hex/hex_forest_roadA.glb");
useGLTF.preload("./models/keyKit/hex/hex_forest_roadB.glb");
useGLTF.preload("./models/keyKit/hex/hex_rock.glb");
useGLTF.preload("./models/keyKit/hex/hex_forest_transitionA.glb");

useGLTF.preload("./models/keyKit/hex/hex_forest_roadD_detail.glb");
useGLTF.preload("./models/keyKit/hex/hex_forest_roadE_detail.glb");
useGLTF.preload("./models/keyKit/hex/hex_rock_roadA.glb");
useGLTF.preload("./models/keyKit/hex/hex_rock_roadB.glb");
useGLTF.preload("./models/keyKit/hex/hex_rock_roadD.glb");

function HexForestDetail({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_forest_detail.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_forest_" + (index + 1),
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
          colliders="hull"
          mass={0}
          scale={1}
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
              console.log("Hex_forest" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function HexForestRoadA({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_forest_roadA.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_Forest_RoadA_" + (index + 1),
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
          colliders="hull"
          mass={0}
          scale={1}
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
              console.log("Hex_forest_Road_A" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function HexForestRoadB({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_forest_roadB.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_forest_Road_B_" + (index + 1),
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
              console.log("Hex_forest_Road_B_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function HexForestRoadDDetail({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_forest_roadD_detail.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_Forest_Road_D_Detail_" + (index + 1),
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
          onUpdate={(obj) => {
            obj.traverse((child) => {
              if (child.isMesh) {
                child.material.depthBias = 0.001;  
              }
            });
          }}
          colliders="hull"
          onClick={(event) => {
            event.stopPropagation();
            if (clickEvent) {
              console.log("Hex_Forest_Road_D_Detail_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function HexForestRoadEDetail({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_forest_roadE_detail.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_Forest_Road_E_Detail_" + (index + 1),
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
              console.log("Hex_Forest_Road_E_Detail_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function HexForestTransitionA({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_forest_transitionA.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_forest_transitionA_" + (index + 1),
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
          colliders="hull"
          mass={0}
          scale={1}
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
              console.log("Hex_forest_transitionA_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}

function HexForestWaterBDetail({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_forest_waterB_detail.glb");

  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  const { position, rotation, show, clickEvent } = useControls(
    "Hex_forest_waterB_detail_" + (index + 1),
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
      },
      clickEvent: true,
      show: true,
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
          onUpdate={(obj) => {
            obj.traverse((child) => {
              if (child.isMesh) {
                child.material.depthBias = 0.001;  
              }
            });
          }}
          colliders="hull"
          onClick={(event) => {
            event.stopPropagation();
            if (clickEvent) {
              console.log("hex_forest_waterB_detail_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function HexRock({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_rock.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_rock_" + (index + 1),
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
              console.log("Hex_rock_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function HexRockRoadA({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_rock_roadA.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_rock_roadA_" + (index + 1),
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
          onUpdate={(obj) => {
            obj.traverse((child) => {
              if (child.isMesh) {
                child.material.depthBias = 0.001;  
              }
            });
          }}
          colliders="hull"
          onClick={(event) => {
            event.stopPropagation();
            if (clickEvent) {
              console.log("Hex_rock_roadA_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function HexRockRoadB({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_rock_roadB.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_rock_roadB_" + (index + 1),
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
          onUpdate={(obj) => {
            obj.traverse((child) => {
              if (child.isMesh) {
                child.material.depthBias = 0.001;  
              }
            });
          }}
          colliders="hull"
          onClick={(event) => {
            event.stopPropagation();
            if (clickEvent) {
              console.log("Hex_rock_roadB_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function HexRockRoadD({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_rock_roadD.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_rock_roadD_" + (index + 1),
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
          onUpdate={(obj) => {
            obj.traverse((child) => {
              if (child.isMesh) {
                child.material.depthBias = 0.001;  
              }
            });
          }}
          colliders="hull"
          onClick={(event) => {
            event.stopPropagation();
            if (clickEvent) {
              console.log("Hex_rock_roadD_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function HexWater({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_water.glb");
  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_water_" + (index + 1),
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
      clickEvent: true,
      show: true,
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
          onUpdate={(obj) => {
            obj.traverse((child) => {
              if (child.isMesh) {
                child.material.depthBias = 0.001;  
              }
            });
          }}
          colliders="hull"
          onClick={(event) => {
            event.stopPropagation();
            if (clickEvent) {
              console.log("Hex_water_" + (index + 1));
            }
          }}
        >
          <primitive object={model.scene.clone()} />
        </RigidBody>
      )}
    </>
  );
}
function HexWaterDetail({ item, index }) {
  const model = useGLTF("./models/keyKit/hex/hex_water_detail.glb");

  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  const { position, rotation, show, clickEvent } = useControls(
    "Hex_water_detail_" + (index + 1),
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
      clickEvent: true,
      show: true,
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
              console.log("Hex_water_detail_" + (index + 1));
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
  //forest
  const hex_Forest_Details = floorData.filter(
    (item) => item.type === "hex_forest_detail"
  );
  const hex_forest_road_A = floorData.filter(
    (item) => item.type === "hex_forest_roadA"
  );
  const hex_forest_road_B = floorData.filter(
    (item) => item.type === "hex_forest_roadB"
  );

  const hex_forest_roadD_detail = floorData.filter(
    (item) => item.type === "hex_forest_roadD_detail"
  );
  const hex_forest_roadE_detail = floorData.filter(
    (item) => item.type === "hex_forest_roadE_detail"
  );
  const hex_forest_transitionA = floorData.filter(
    (item) => item.type === "hex_forest_transitionA"
  );
  //rock
  const hex_rock = floorData.filter((item) => item.type === "hex_rock");
  const hex_rock_roadA = floorData.filter(
    (item) => item.type === "hex_rock_roadA"
  );
  const hex_rock_roadB = floorData.filter(
    (item) => item.type === "hex_rock_roadB"
  );
  const hex_rock_roadD = floorData.filter(
    (item) => item.type === "hex_rock_roadD"
  );
  //water
  const hex_water = waterData.filter((item) => item.type === "hex_water");
  const hex_water_detail = waterData.filter(
    (item) => item.type === "hex_water_detail"
  );
  const hex_forest_waterB_detail = waterData.filter(
    (item) => item.type === "hex_forest_waterB_detail"
  );

  return (
    <>
      {/*
        forest
     */}
      {hex_Forest_Details.map((item, index) => (
        <HexForestDetail item={item} key={index} index={index} />
      ))}
      {hex_forest_road_A.map((item, index) => (
        <HexForestRoadA item={item} key={index} index={index} />
      ))}
      {hex_forest_road_B.map((item, index) => (
        <HexForestRoadB item={item} key={index} index={index} />
      ))}
      {hex_forest_roadD_detail.map((item, index) => (
        <HexForestRoadDDetail item={item} key={index} index={index} />
      ))}
      {hex_forest_roadE_detail.map((item, index) => (
        <HexForestRoadEDetail item={item} key={index} index={index} />
      ))}
      {hex_forest_transitionA.map((item, index) => (
        <HexForestTransitionA item={item} key={index} index={index} />
      ))}

      {/*
        rock
     */}
      {hex_rock.map((item, index) => (
        <HexRock item={item} key={index} index={index} />
      ))}
      {hex_rock_roadA.map((item, index) => (
        <HexRockRoadA item={item} key={index} index={index} />
      ))}
        {hex_rock_roadB.map((item, index) => (
        <HexRockRoadB item={item} key={index} index={index} />
      ))}
      {hex_rock_roadD.map((item, index) => (
        <HexRockRoadD item={item} key={index} index={index} />
      ))}
      {/*
        water
     */}
      {hex_water.map((item, index) => (
        <HexWater item={item} key={index} index={index} />
      ))}

      {hex_water_detail.map((item, index) => (
        <HexWaterDetail item={item} key={index} index={index} />
      ))}
      {hex_forest_waterB_detail.map((item, index) => (
        <HexForestWaterBDetail item={item} key={index} index={index} />
      ))}
    </>
  );
}
