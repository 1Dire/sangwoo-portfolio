import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";

import { Physics } from "@react-three/rapier";
import * as THREE from "three";
import { CharacterController } from "./CharacterController";

import World from "./World.jsx";
export default function Experience() {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}

      <Lights />
      <Physics debug>
        <World />
        <CharacterController />
      </Physics>
    </>
  );
}
