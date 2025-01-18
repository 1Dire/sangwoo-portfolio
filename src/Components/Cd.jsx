import React, { useState, useRef, useEffect } from "react";
import { Howl } from "howler"; // Howler import

export default function Cd({ currentAudio }) {
  const [isRotating, setIsRotating] = useState(true);
  const [currentRotation, setCurrentRotation] = useState(0);
  const rotationInterval = useRef(null);
  const cdRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 환경 여부 체크
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px 이하를 모바일로 간주
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 상태 설정

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startRotation = () => {
    rotationInterval.current = setInterval(() => {
      setCurrentRotation((prev) => {
        const newRotation = prev + 1;
        if (cdRef.current) {
          cdRef.current.style.transform = `rotate(${newRotation}deg)`;
        }
        return newRotation;
      });
    }, 10);
  };

  const stopRotation = () => {
    clearInterval(rotationInterval.current);
  };

  const handleRotationToggle = () => {
    if (isRotating) {
      stopRotation();
      currentAudio.volume(0); // 회전 중지 시 음소거
    } else {
      startRotation();
      currentAudio.volume(1); // 회전 시작 시 음소거 해제
    }
    setIsRotating(!isRotating);

    // 오디오가 재생되지 않은 경우, 재생 시작
    if (currentAudio.playing() === false) {
      currentAudio.play().catch((err) => console.error("오디오 재생 오류:", err));
    }
  };

  useEffect(() => {
    startRotation();
    return () => stopRotation();
  }, []);

  // 모바일 환경을 고려하여 볼륨을 조정
  useEffect(() => {
    if (isRotating) {
      currentAudio.volume(1); // 회전 시 볼륨 1
    } else {
      currentAudio.volume(0); // 회전 중지 시 볼륨 0
    }
  }, [isRotating]);

  return (
    <div
      className={`cd-player ${isRotating ? "rotating" : "stopped"}`}
      onClick={handleRotationToggle}
    >
      <div
        className="cd"
        ref={cdRef}
        style={{
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `rotate(${currentRotation}deg)`,
        }}
      >
        <img src="./svg/cd.svg" alt="CD Icon" width="80%" height="80%" />
      </div>

      {/* 모바일에서 회전 중일 때 mute-bar 숨기기 */}
      {!isMobile || !isRotating ? <div className="mute-bar"></div> : null}
    </div>
  );
}
