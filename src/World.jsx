import React from "react";

import { RigidBody } from "@react-three/rapier";

import Floor from "./models/Floor.jsx";
import Archeryrange from "./models/keyKit/Archeryrange.jsx";
import Barracks from "./models/keyKit/barracks.jsx";
import Rock from "./models/keyKit/Rock.jsx";
import Forest from "./models/keyKit/Forest.jsx";
import Bridge from "./models/keyKit/Bridge.jsx";
import Watermill from "./models/keyKit/Watermill.jsx";
export default function World() {
  return (
    <>
      <RigidBody type="fixed" colliders="hull">
        <group>
          <Floor />

          <Archeryrange />
          <Barracks />
          <Rock />
          <Forest />
          <Bridge />
          <Watermill />
        </group>
      </RigidBody>
    </>
  );
}
