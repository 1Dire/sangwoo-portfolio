import React, { useRef } from "react";
import { Environment } from "@react-three/drei";

function CloudySky() {
  return (
    <>
      <Environment background files="./hdr/skyBlue.hdr" />
    </>
  );
}

export default CloudySky;
