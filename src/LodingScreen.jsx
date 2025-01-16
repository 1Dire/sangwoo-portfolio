import React, { Suspense, useEffect } from "react";
import { useProgress, Html } from "@react-three/drei";
export default function LodingScreen() {
  const { progress, active, loaded, total } = useProgress();
  useEffect(() => {
    console.log(progress);
  }, [progress]);
  return (
    <>
    
 
    </>
  );
}
