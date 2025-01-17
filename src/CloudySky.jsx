import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useState } from "react";

function CloudySky() {
  const [isLoaded, setIsLoaded] = useState(false); // 텍스처 로딩 상태 관리
  const scene = useThree((state) => state.scene);
  const envMap = useLoader(THREE.TextureLoader, "./background/skyblue.jpg");

  useEffect(() => {
    if (envMap) {
      envMap.mapping = THREE.EquirectangularReflectionMapping;
      envMap.colorSpace = THREE.SRGBColorSpace;

      // 텍스처 로딩이 완료되면 배경을 설정
      scene.background = envMap;
      scene.environment = envMap;
      setIsLoaded(true); // 로딩 완료 상태로 설정
    }

    return () => {
      // 필요한 정리 작업
    };
  }, [envMap, scene]); // envMap이 변경될 때마다 effect 실행

  if (!isLoaded) {
    return null; // 로딩 중에는 아무 것도 렌더링하지 않음
  }

  return null; // 이 컴포넌트는 배경만 설정하므로 반환할 것이 없음
}

export default CloudySky;
