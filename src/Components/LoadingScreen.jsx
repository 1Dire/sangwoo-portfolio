import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";

export const LoadingScreen = ({ started, onStarted }) => {
  const { progress } = useProgress();
  const [delayedProgress, setDelayedProgress] = useState(0);

  useEffect(() => {
    // progress가 100일 때만 delayedProgress를 100으로 설정
    if (progress === 100 && delayedProgress !== 100) {
      setDelayedProgress(100);
    } else if (progress < 100 && delayedProgress !== progress) {
      // progress가 100 미만일 때는 progress 값에 맞게 업데이트
      setDelayedProgress(progress);
    }
  }, [progress, delayedProgress]); // 의존성 배열에 delayedProgress 추가

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
