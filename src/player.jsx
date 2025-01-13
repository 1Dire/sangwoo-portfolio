import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

export default function Player() {
  const body = useRef();
  const { scene, animations, nodes } = useGLTF("./models/player.gltf");
  const { actions } = useAnimations(animations, scene);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  // 컨트롤 설정
  const { animationName, position, rotation, cameraOffset, cameraAngle } =
    useControls("player", {
      animationName: { options: ["pose", "course"] },
      position: { value: { x: 0.5, y: 0.2, z: 5.5 }, step: 0.1 },
      rotation: { value: { x: 0, y: 180, z: 0 }, step: 0.01 },
    });
  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();
    console.log(forward);
  });

  // 애니메이션 액션 설정
  const animationActions = {
    pose: [actions.pose_cavalier, actions.pose_loup],
    course: [actions.course_cavalier, actions.course_loup],
  };

  useEffect(() => {
    // 모든 액션 중지 및 페이드 아웃
    Object.values(actions).forEach((action) => {
      if (action) action.fadeOut(0.5);
    });

    // 선택된 애니메이션 실행 및 페이드 인
    animationActions[animationName].forEach((action) => {
      if (action) action.reset().fadeIn(0.5).play();
    });

    // Armature_cavalier의 위치 변경
    if (animationName === "pose") {
      nodes.Armature_cavalier.position.x = -0.28;
    } else {
      nodes.Armature_cavalier.position.x = 0;
    }
  }, [animationName, actions, nodes]);

  return (
    <>
      <RigidBody ref={body} type="kinematicPosition" canSleep={false}>
        <primitive
          object={scene}
          scale={1}
          position={[position.x, position.y, position.z]}
          rotation={[
            THREE.MathUtils.degToRad(rotation.x), // x 축 회전
            THREE.MathUtils.degToRad(rotation.y), // y 축 회전
            THREE.MathUtils.degToRad(rotation.z), // z 축 회전
          ]}
        />
      </RigidBody>
    </>
  );
}
