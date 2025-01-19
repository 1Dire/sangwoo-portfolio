import React, { useState, useRef, useEffect } from "react";

export default function Cd({ currentAudio }) {
  const [isRotating, setIsRotating] = useState(true);
  const rotationRef = useRef(0);  // currentRotation을 useRef로 변경
  const rotationInterval = useRef(null);
  const cdRef = useRef(null);
  const muteBarRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    handleResize();  // 초기 상태 설정

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const startRotation = () => {
    rotationInterval.current = setInterval(() => {
      rotationRef.current += 1;
      if (cdRef.current) {
        cdRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
    }, 10);
  };

  const stopRotation = () => {
    clearInterval(rotationInterval.current);
  };

  const handleRotationToggle = () => {
    if (isRotating) {
      stopRotation();
      currentAudio.pause(); // 음악 일시 정지
    } else {
      startRotation();
      if (!currentAudio.playing()) {
        currentAudio.play(); // 음악 재생
      }
    }
    setIsRotating(!isRotating);
  };

  useEffect(() => {
    if (isRotating) {
      startRotation();
    } else {
      stopRotation();
    }

    return () => stopRotation();
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
          transform: `rotate(${rotationRef.current}deg)`, // useRef로 변경
          opacity: isMobile ? 1 : 0.5,
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={() => {
          if (!isMobile) {
            cdRef.current.style.opacity = 1;
            muteBarRef.current.style.opacity = 1;
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            cdRef.current.style.opacity = 0.5;
            muteBarRef.current.style.opacity = 0.5;
          }
        }}
      >
        <img src="./svg/cd.svg" alt="CD Icon" width="80%" height="80%" />
      </div>

      {!isMobile || !isRotating ? (
        <div
          ref={muteBarRef}
          className="mute-bar"
          style={{
            opacity: isMobile ? 1 : 0.5,
            transition: "opacity 0.3s ease",
          }}
        ></div>
      ) : null}
    </div>
  );
}
