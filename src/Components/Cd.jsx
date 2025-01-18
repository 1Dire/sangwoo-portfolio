import React, { useState, useRef, useEffect } from "react";

export default function Cd({ currentAudio }) {
  const [isRotating, setIsRotating] = useState(true);
  const [currentRotation, setCurrentRotation] = useState(0);
  const rotationInterval = useRef(null);
  const cdRef = useRef(null);
  const muteBarRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

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
      currentAudio.volume(0);
    } else {
      startRotation();
      currentAudio.volume(1);
    }
    setIsRotating(!isRotating);

    if (currentAudio.playing() === false) {
      currentAudio
        .play()
        .catch((err) => console.error("오디오 재생 오류:", err));
    }
  };

  useEffect(() => {
    startRotation();
    return () => stopRotation();
  }, []);

  useEffect(() => {
    if (isRotating) {
      currentAudio.volume(1);
    } else {
      currentAudio.volume(0);
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
