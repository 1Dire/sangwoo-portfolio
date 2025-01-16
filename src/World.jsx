import React from "react";

import { RigidBody } from "@react-three/rapier";

import Floor from "./models/Floor.jsx";
import Archeryrange from "./models/keyKit/Archeryrange.jsx";
import Barracks from "./models/keyKit/Barracks.jsx";
import Rock from "./models/keyKit/Rock.jsx";
import Forest from "./models/keyKit/Forest.jsx";
import Bridge from "./models/keyKit/Bridge.jsx";
import Watermill from "./models/keyKit/Watermill.jsx";
import Mine from "./models/keyKit/Mine.jsx";
import Lumbermill from "./models/keyKit/Lumbermill.jsx";
import House from "./models/keyKit/House.jsx";
import Tree from "./models/keyKit/Tree.jsx";
import FarmPlot from "./models/keyKit/FarmPlot.jsx";
import Flower from "./models/kennyKit/Flower.jsx";
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
          <Mine/>
          <Lumbermill/>
          <House/>
          <Tree/>
          <FarmPlot/>
          <Flower/>
        </group>
      </RigidBody>
    </>
  );
}
