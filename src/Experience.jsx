import { OrbitControls } from "@react-three/drei";
import Lights from "./Components/Lights.jsx";

import { Physics } from "@react-three/rapier";
import { CharacterController } from "./Components/CharacterController.jsx";

import World from "./Components/World.jsx";
export default function Experience() {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}

      <Lights />
      <Physics>
        <CharacterController /> 
        <World />
      </Physics>
    </>
  );
}
