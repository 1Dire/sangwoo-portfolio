import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Suspense, useEffect, useState, StrictMode } from "react";
import * as THREE from "three";
import { KeyboardControls } from "@react-three/drei";
import LoadingScreen from "./LoadingScreen.jsx";

function AxesHelperComponent() {
  const { scene } = useThree(); // useThree 훅을 사용하여 scene에 접근
  useEffect(() => {
    const axesHelper = new THREE.AxesHelper(10); // 축의 크기 설정
    scene.add(axesHelper);

    return () => {
      scene.remove(axesHelper);
    };
  }, [scene]);

  return null;
}
function App() {
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (start) {
      // audio.play();
    }
  }, [start]);
  return (
    <>
      <StrictMode>
        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "KeyW"] },
            { name: "backward", keys: ["ArrowDown", "KeyS"] },
            { name: "left", keys: ["ArrowLeft", "KeyA"] },
            { name: "right", keys: ["ArrowRight", "KeyD"] },
            { name: "run", keys: ["Shift"] },
            // { name: "jump", keys: ["Space"] },
          ]}
        >
          <Canvas
            shadows
            camera={{ position: [0, 5, 0], near: 0.1, fov: 40 }}
            style={{
              touchAction: "none",
              background:
                "linear-gradient(to bottom,rgb(91, 187, 247), #ffffff)", // 하늘색 그라데이션
            }}
          >
       <Suspense fallback={null}>{start && <Experience />}</Suspense>
          </Canvas>
          <LoadingScreen started={start} onStarted={() => setStart(true)} />
        </KeyboardControls>
      </StrictMode>
    </>
  );
}
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
