import { Text, Float } from "@react-three/drei";
import { useControls } from "leva";
import { textData } from "../data/textData"; // textData 배열 임포트

export default function TextGenerator() {
  return (
    <>
      {textData.map((item, index) => (
        <TextComponent key={index} item={item} />
      ))}
    </>
  );
}

function TextComponent({ item }) {
  const { position, rotation, fontSize, text, floatSpeed, floatIntensity } = useControls(
    `Text_${item.text}`,
    {
      position: {
        value: {
          x: item.position[0],
          y: item.position[1],
          z: item.position[2],
        },
        step: 0.1,
      },
      rotation: {
        value: {
          x: item.rotation[0],
          y: item.rotation[1],
          z: item.rotation[2],
        },
        step: 1,
      },
      fontSize: { value: item.fontSize, min: 0.1, max: 5, step: 0.1 },
      text: item.text,
      floatSpeed: { value: 1, min: 0.1, max: 5, step: 0.1 }, // 부유 속도 설정
      floatIntensity: { value: 1, min: 0.1, max: 5, step: 0.1 }, // 부유 강도 설정
    }
  );

  // 회전 각도를 라디안으로 변환
  const rotationInRadians = [
    rotation.x * (Math.PI / 180),
    rotation.y * (Math.PI / 180),
    rotation.z * (Math.PI / 180),
  ];

  // Float 효과를 조건부로 적용
  const content = (
    <Text
      font={"fonts/bebas-neue-v9-latin-regular.woff"}
      fontSize={fontSize}
      position={[position.x, position.y, position.z]} // 'position' 값 적용
      rotation={rotationInRadians} // 회전 값 적용
    >
      {text}
    </Text>
  );

  return item.animation ? (
    <Float
      speed={floatSpeed} // 부유 속도
      floatIntensity={floatIntensity} // 부유 강도
      floatingRange={[0, 0.5]} // Y축 부유 범위 (0.5만큼 위아래로 움직임)
    >
      {content}
    </Float>
  ) : (
    content
  );
}
