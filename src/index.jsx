import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { StrictMode, useEffect } from "react";
import * as THREE from "three";
import { KeyboardControls } from "@react-three/drei";
function AxesHelperComponent() {
  const { scene } = useThree(); // useThree 훅을 사용하여 scene에 접근
  useEffect(() => {
    const axesHelper = new THREE.AxesHelper(10); // 축의 크기 설정
    scene.add(axesHelper);

    // 컴포넌트가 언마운트될 때 헬퍼를 정리합니다
    return () => {
      scene.remove(axesHelper);
    };
  }, [scene]);

  return null;
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <StrictMode>
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "left", keys: ["ArrowLeft", "KeyA"] },
        { name: "right", keys: ["ArrowRight", "KeyD"] },
        { name: "run", keys: ["Shift"] },
      ]}
    >
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}
        style={{
          touchAction: "none",
        }}
      >
        <AxesHelperComponent />
        <Experience />
      </Canvas>
    </KeyboardControls>
  </StrictMode>
);
