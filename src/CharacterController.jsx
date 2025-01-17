import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { Character } from "./Character";
import * as THREE from "three";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

export const CharacterController = () => {
  const {
    position,
    rotation,
    walk_speed,
    run_speed,
    rotation_speed,
    touch_event,
    reset_Y
  } = useControls("Character Control", {
    touch_event:true,
    position: {
      value: {
        x: 0,
        y: 5,
        z: 0,
      },
      step: 0.1,
    },
    rotation: {
      value: {
        x: 0,
        y: 0,
        z: 0,
      },
      step: 0.1,
    },
    reset_Y: -5,
    walk_speed: { value: 1, min: 0.1, max: 4, step: 0.1 },
    run_speed: { value: 1.6, min: 0.2, max: 12, step: 0.1 },
    rotation_speed: {
      value: degToRad(0.5),
      min: degToRad(0.1),
      max: degToRad(5),
      step: degToRad(0.1),
    },
  },{collapsed:true});
  const rb = useRef();
  const container = useRef();
  const character = useRef();

  const [animation, setAnimation] = useState("idle");
  const [isJumping, setIsJumping] = useState(false);
  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef();
  const cameraPostion = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPostion = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();

  const isClicking = useRef(false);
  useEffect(() => {
    const onMouseDown = (e) => {
      if (touch_event) isClicking.current = true;
    };
    const onMouseUp = (e) => {
      if (touch_event) isClicking.current = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchend", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, [touch_event]);

  useFrame(({ camera, mouse }) => {
    if (rb.current) {
      const vel = rb.current.linvel();
      const movement = {
        x: 0,
        z: 0,
      };

      if (get().forward) movement.z = 1;
      if (get().backward) movement.z = -1;

      let speed = get().run ? run_speed : walk_speed;

      if (isClicking.current) {
        if (Math.abs(mouse.x) > 0.1) movement.x = -mouse.x;
        movement.z = mouse.y + 0.4;
        if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
          speed = run_speed;
        }
      }

      if (get().left) movement.x = 1;
      if (get().right) movement.x = -1;

      if (get().jump && !isJumping) {
        setIsJumping(true);
        vel.y = 3; // Jump force
        setAnimation("jump_up");
      }

      if (isJumping && rb.current.translation().y > 0.15) {
        setAnimation("jump_air");
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
        if (speed === run_speed && !isJumping) {
          setAnimation("run");
        } else if (!isJumping) {
          setAnimation("walk");
        }
      } else if (!isJumping) {
        setAnimation("idle");
      }

      if (rb.current.translation().y <= 0.15) {
        setIsJumping(false);
        if (movement.x === 0 && movement.z === 0) {
          setAnimation("idle");
        }
      }
      if (rb.current) {
        const position = rb.current.translation(); // 현재 좌표 가져오기
          if(position.y <reset_Y){
            rb.current.setTranslation({ x: 0, y: 5, z: 0 }, true); // 위치 초기화
            rb.current.setLinvel({ x: 0, y: 0, z: 0 }, true); // 속도 초기화
          }
      }

      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );
      rb.current.setLinvel(vel, true);
    }

    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    cameraPostion.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);
    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPostion.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPostion.current, 0.1);
      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <RigidBody
      colliders={false}
      lockRotations
      ref={rb}
      position={[position.x, position.y, position.z]}
      rotation={[
        THREE.MathUtils.degToRad(rotation.x),
        THREE.MathUtils.degToRad(rotation.y),
        THREE.MathUtils.degToRad(rotation.z),
      ]}
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPostion} position-x={0} position-y={3} position-z={-4} />
        <group ref={character}>
          <Character scale={0.18} position-y={-0.075} animation={animation} />
        </group>
      </group>
      <CapsuleCollider args={[0.08, 0.15]} position={[0, 0.15, 0]} />
    </RigidBody>
  );
};
