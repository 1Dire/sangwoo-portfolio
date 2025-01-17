import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

export default function Lights() {
  const light = useRef();

  // Leva 컨트롤 추가
  const {
    intensity,
    positionX,
    positionY,
    positionZ,
    shadowMapSize,
    shadowBias,
    shadowRadius,
  } = useControls(
    "Directional Light",
    {
      intensity: { value: 3, min: 0, max: 10, step: 0.1 },
      positionX: { value: 4, min: -10, max: 10, step: 0.1 },
      positionY: { value: 4, min: -10, max: 10, step: 0.1 },
      positionZ: { value: 1, min: -10, max: 10, step: 0.1 },
      shadowMapSize: { value: 1024, options: [256, 512, 1024, 2048] },
      shadowBias: { value: -0.005, min: -0.01, max: 0.01, step: 0.001 }, // 그림자 편향 설정
      shadowRadius: { value: 4, min: 1, max: 10, step: 0.1 }, // 그림자 반경 설정
    },
    { collapsed: true }
  );

  const { ambientIntensity } = useControls(
    "Ambient Light",
    {
      ambientIntensity: { value: 1.6, min: 0, max: 10, step: 0.1 },
    },
    { collapsed: true }
  );

  useFrame((state) => {
    light.current.position.set(
      positionX,
      positionY,
      state.camera.position.z + positionZ - 4
    );
    light.current.target.position.set(0, 0, state.camera.position.z - 4);
    light.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={[positionX, positionY, positionZ]}
        intensity={intensity}
        shadow-mapSize={[shadowMapSize, shadowMapSize]}
        shadow-camera-near={1}
        shadow-camera-far={50} // 카메라 범위 확장
        shadow-camera-top={20} // 그림자 카메라 상단 범위 확장
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
        shadow-bias={shadowBias} // 그림자 편향 추가
        shadow-radius={shadowRadius} // 그림자 반경 추가
      />
      <ambientLight intensity={ambientIntensity} />
    </>
  );
}
