import "./style.css";
import ReactDOM from "react-dom/client";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { KeyboardControls } from "@react-three/drei";
import LoadingScreen from "./Components/LoadingScreen.jsx";
import Cd from "./Components/Cd.jsx";
import { Leva } from "leva";
import { Howl } from "howler"; // Howler import
import Inpo from "./Components/Info.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import useStore from "./stores/useStore"; // Zustand store

// Howler로 오디오 설정 (무한 반복 설정 추가)
const audio = new Howl({
  src: ["/audio/nocturnal knoll.mp3"],
  volume: 1, // 기본 볼륨 설정
  loop: true, // 무한 반복 설정
});

// 오디오 제어 훅
function useAudioControl(start) {
  useEffect(() => {
    // 게임 시작 시 음악 재생/정지
    if (start) {
      audio.play();
    } else {
      audio.pause();
    }

    const handleFocus = () => {
      if (start) audio.play(); // 포커스가 돌아오면 재생
    };

    const handleBlur = () => {
      audio.pause(); // 포커스가 나가면 정지
    };

    // 이벤트 리스너 등록
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      audio.stop(); // 언마운트 시 음악 정지
    };
  }, [start]);

  return { audio };
}

function App() {
  const [start, setStart] = useState(false);
  const { activeButton } = useStore();

  // 오디오 관련 훅 사용
  useAudioControl(start);

  return (
    <>
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
              "linear-gradient(to bottom, rgb(91, 187, 247), #ffffff)", // 하늘색 그라데이션
          }}
        >
          <Suspense fallback={null}>{start && <Experience />}</Suspense>
        </Canvas>
        <LoadingScreen started={start} onStarted={() => setStart(true)} />
        {start && (
          <>
            <Cd currentAudio={audio} />
            {activeButton && <Inpo />}
          </>
        )}
      </KeyboardControls>

      <Leva hidden />
    </>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
