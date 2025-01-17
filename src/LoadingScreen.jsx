import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";

export const LoadingScreen = ({ started, onStarted }) => {
  const { progress } = useProgress();
  const [delayedProgress, setDelayedProgress] = useState(0);

  useEffect(() => {
    let timer;

    if (progress === 100) {
      timer = setTimeout(() => {
        setDelayedProgress(100);
      }, 1500); // 1.5초 지연 후 100으로 설정
    } else {
      setDelayedProgress(progress); // 즉시 업데이트
    }

    return () => clearTimeout(timer); // 타이머 클리어
  }, [progress]);

  return (
    <div className={`loadingScreen ${started ? "loadingScreen--started" : ""}`}>
      <div className="loadingScreen__progress">
        <div
          className="loadingScreen__progress__value"
          style={{
            width: `${delayedProgress}%`,
          }}
        />
      </div>
      <div className="loadingScreen__board">
        <button
          className="loadingScreen__button"
          disabled={delayedProgress < 100}
          onClick={onStarted}
        >
          {delayedProgress < 100 ? `${Math.round(delayedProgress)}%` : "Start"}
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;
