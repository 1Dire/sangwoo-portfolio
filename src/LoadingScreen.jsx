import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";

export const LoadingScreen = ({ started, onStarted }) => {
  const { progress } = useProgress();
  const [delayedProgress, setDelayedProgress] = useState(progress);
  
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setDelayedProgress(progress);
      }, 1500); 
      return () => clearTimeout(timer);
    } else {
      setDelayedProgress(progress);
    }
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
