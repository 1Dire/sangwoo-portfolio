import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Suspense, useEffect, useState, StrictMode } from "react";
import * as THREE from "three";
import { KeyboardControls } from "@react-three/drei";
import LoadingScreen from "./Components/LoadingScreen.jsx";
import Cd from "./Components/Cd.jsx";
import { Leva } from "leva";
import { Howl } from "howler"; // Howler import

function App() {
  const [start, setStart] = useState(false);

  // Howler로 오디오 설정
  const audio1 = new Howl({
    src: ["/audio/nocturnal knoll.mp3"],
    volume: 1,  // 기본 볼륨 설정
    onend: () => {
      // 노래가 끝나면 다른 노래로 변경
      if (currentAudio === audio1) {
        setCurrentAudio(audio2);
      } else {
        setCurrentAudio(audio1);
      }
    },
  });

  const audio2 = new Howl({
    src: ["/audio/sassy shells.mp3"],
    volume: 1,  // 기본 볼륨 설정
    onend: () => {
      // 노래가 끝나면 다른 노래로 변경
      if (currentAudio === audio2) {
        setCurrentAudio(audio1);
      } else {
        setCurrentAudio(audio2);
      }
    },
  });

  const [currentAudio, setCurrentAudio] = useState(audio1); // 기본 오디오는 첫 번째 노래

  // 창이 내려가면 오디오를 멈추고, 다시 포커스를 받으면 오디오를 재생
  useEffect(() => {
    const handleBlur = () => {
      currentAudio.pause(); // 창이 내려가면 오디오 멈춤
    };

    const handleFocus = () => {
      if (start) {
        currentAudio.play(); // 창에 포커스가 돌아오면 오디오 재생
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [currentAudio, start]);

  useEffect(() => {
    if (start) {
      currentAudio.play(); // 게임이 시작되면 현재 오디오 재생
    } else {
      currentAudio.pause(); // 게임이 시작되지 않으면 오디오 멈추기
    }
  }, [start, currentAudio]);

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
          {start && <Cd currentAudio={currentAudio} />}
        </KeyboardControls>
      </StrictMode>

      <Leva hidden />
    </>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
