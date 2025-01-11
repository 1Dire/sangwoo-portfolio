import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import Terrain from "./Terrain.jsx";

export default function Experience() {
    return (
    <>
      <OrbitControls makeDefault />

      <Lights />

      <Terrain/>
    </>
  );
}
