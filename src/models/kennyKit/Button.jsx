import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { buttonData } from "../../data/objectData.jsx";
import useStore from "../../stores/useStore.jsx"; // Zustand store
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

useGLTF.preload("./models/kennyKit/object/platformer/button-square.glb");

function ObjectGenerate({
  item,
  index,
  modelPath,
  modelKey,
  characterPosition,
  event, // event state passed as prop
}) {
  const { scene, animations } = useGLTF(modelPath);
  const mixer = useRef(null); // AnimationMixer ref
  const setActiveButton = useStore((state) => state.setActiveButton); // Zustand 액션
  const clearActiveButton = useStore((state) => state.clearActiveButton); // 상태 초기화 액션

  const { position, rotation, scale, show, triggerDistance } = useControls(
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
      scale: item.scale || 1,
      show: true,
      triggerDistance: { value: 0.3, min: 0.1, max: 5, step: 0.1 },
    },
    { collapsed: true }
  );

  const [isTriggered, setIsTriggered] = useState(false);

  // Setting shadows
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Animation mixer initialization
  useEffect(() => {
    mixer.current = new THREE.AnimationMixer(scene);
    return () => mixer.current?.stopAllAction();
  }, [scene]);

  // Distance calculation for trigger
  const distance = useMemo(() => {
    const buttonPos = new THREE.Vector3(position.x, position.y, position.z);
    const charPos = new THREE.Vector3(
      characterPosition.x,
      characterPosition.y,
      characterPosition.z
    );
    return buttonPos.distanceTo(charPos);
  }, [position, characterPosition]);

  // Trigger state based on distance
  useEffect(() => {
    if (distance < triggerDistance && !isTriggered) {
      setIsTriggered(true);
      setActiveButton(index); // 버튼을 밟으면 상태에 해당 버튼을 기록
    } else if (distance >= triggerDistance && isTriggered) {
      setIsTriggered(false);

    }
  }, [distance, isTriggered, triggerDistance, setActiveButton, clearActiveButton, index]);

  // Animations based on state
  useEffect(() => {
    const animationName = isTriggered ? "toggle-on" : "toggle-off";
    const animation = animations.find((clip) => clip.name === animationName);
    if (animation && mixer.current) {
      const action = mixer.current.clipAction(animation);
      action.reset().setLoop(THREE.LoopOnce).clampWhenFinished = true;
      action.play();
    }
  }, [isTriggered, animations]);

  // Updating the animation mixer
  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return (
    show && (
      <RigidBody
        type="kinematicPosition"
        key={index}
        position={[position.x, position.y, position.z]}
        rotation={[
          THREE.MathUtils.degToRad(rotation.x),
          THREE.MathUtils.degToRad(rotation.y),
          THREE.MathUtils.degToRad(rotation.z),
        ]}
        scale={scale}
        colliders="hull"
      >
        <primitive object={scene.clone(true)} />
      </RigidBody>
    )
  );
}

export default function Button() {
  const { characterPosition, activeButton } = useStore();  // Zustand에서 상태 값 가져오기
  


  return (
    <>
      {buttonData.map((item, index) => (
        <ObjectGenerate
          key={index}
          item={item}
          index={index}
          modelPath="./models/kennyKit/object/platformer/button-square.glb"
          modelKey="Button"
          characterPosition={characterPosition}
        
        />
      ))}
    </>
  );
}
