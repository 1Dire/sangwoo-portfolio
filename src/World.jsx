import React from "react";

import { RigidBody } from "@react-three/rapier";

import Floor from "./models/Floor";
import Archeryrange from "./models/keyKit/Archeryrange";
import Barracks from "./models/keyKit/barracks";

export default function World() {
  return (
    <>
      <RigidBody type="fixed" colliders="hull">
        <group>
          <Floor />

          <Archeryrange />
          <Barracks />
        </group>
      </RigidBody>
    </>
  );
}
