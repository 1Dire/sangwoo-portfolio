import React, { useState, useRef, useEffect } from "react";

export default function Cd({ currentAudio }) {
  const [isRotating, setIsRotating] = useState(true); 
  const [currentRotation, setCurrentRotation] = useState(0); 
  const rotationInterval = useRef(null); 
  const cdRef = useRef(null); 


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
    clearInterval(rotationInterval.current)
  };


  const handleRotationToggle = () => {
    if (isRotating) {
      stopRotation(); 
    } else {
      startRotation();
    }
    setIsRotating(!isRotating); 
  };

 
  useEffect(() => {
    startRotation();
    return () => stopRotation(); 
  }, []);

  useEffect(() => {
    if (isRotating) {
      currentAudio.volume = 1; 
    } else {
      currentAudio.volume = 0; 
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
      <div className="mute-bar"></div>
    </div>
  );
}
