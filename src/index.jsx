import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Suspense, useEffect, useState, StrictMode } from "react";
import * as THREE from "three";
import { KeyboardControls } from "@react-three/drei";
import LoadingScreen from "./LoadingScreen.jsx";
import { Leva, useControls } from "leva";

function AxesHelperComponent() {
  const { scene } = useThree();
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
  const [audio1] = useState(new Audio("/audio/nocturnal knoll.mp3"));
  const [audio2] = useState(new Audio("/audio/sassy shells.mp3"));
  const [currentAudio, setCurrentAudio] = useState(audio1); 
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (start) {
      currentAudio.play(); 
      currentAudio.volume = volume; 

     
      const volumeInterval = setInterval(() => {
        if (volume < 1) {
          setVolume((prevVolume) => {
            const newVolume = prevVolume + 0.05; 
            currentAudio.volume = newVolume > 1 ? 1 : newVolume;
            return newVolume > 1 ? 1 : newVolume;
          });
        }
      }, 200); 

     
      const handleEnd = () => {
        if (currentAudio === audio1) {
          setCurrentAudio(audio2);
        } else {
          setCurrentAudio(audio1);
        }
      };

      currentAudio.addEventListener("ended", handleEnd);

      return () => {
        clearInterval(volumeInterval); 
        currentAudio.removeEventListener("ended", handleEnd);
      };
    } else {
      currentAudio.pause(); 
      setVolume(0);
    }
  }, [start, currentAudio, audio1, audio2, volume]);

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

      {/* Leva 컨트롤러를 조건에 따라 숨기거나 표시 */}
      <Leva hidden />
    </>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
