import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useControls } from "leva";

export default function Terrain() {
  // Leva의 useControls 훅을 통해 color 값을 가져옵니다.
  const { color } = useControls({
    color: { value: "#4CAF50" }, // 색상 선택기
  });

  const shapeRef = useRef();

  // 12각형 모양 정의
  const radius = 5;
  const sides = 12; // 12각형
  const angle = (Math.PI * 2) / sides;

  // 수동으로 불규칙한 꼭지점 설정
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    const offsets = [
      0.5, 0.3, -0.4, 0.2, 0.1, -0.2, 0.3, -0.1, 0.4, -0.3, 0.2, -0.1,
    ]; // 각 꼭지점의 불규칙한 이동값 (수동으로 설정)

    for (let i = 0; i < sides; i++) {
      const x = radius * Math.cos(i * angle) + offsets[i]; // 각 꼭지점에 수동으로 오프셋을 적용
      const y = radius * Math.sin(i * angle) + offsets[i]; // 각 꼭지점에 수동으로 오프셋을 적용
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    return shape;
  }, []); // 한 번만 실행되도록 설정

  return (
    <mesh ref={shapeRef} rotation={[-Math.PI / 2, 0, 0]}>
      <extrudeGeometry args={[shape, { depth: 0.1, bevelEnabled: false }]} />
      {/* THREE.Color 객체로 color 값 적용 */}
      <meshStandardMaterial color={new THREE.Color(color)} side={THREE.DoubleSide} />
    </mesh>
  );
}
