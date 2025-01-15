import React from "react";

import { RigidBody } from "@react-three/rapier";

import Floor from "./models/Floor";
import Archeryrange from "./models/keyKit/Archeryrange";
import Barracks from "./models/keyKit/barracks";
import Rock from "./models/keyKit/Rock"
import Forest from "./models/keyKit/Forest"
import Bridge from "./models/keyKit/Bridge"
import Watermill from "./models/keyKit/Watermill";
export default function World() {
  return (
    <>
      <RigidBody type="fixed" colliders="hull">
        <group>
          <Floor />

          <Archeryrange />
          <Barracks />
          <Rock/>
          <Forest/>
          <Bridge/>
          <Watermill/>
        </group>
      </RigidBody>
    </>
  );
}
