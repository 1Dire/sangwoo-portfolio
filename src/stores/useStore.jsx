import { create } from 'zustand';

const useStore = create((set) => ({
  characterPosition: { x: 0, y: 0, z: 0 },
  setCharacterPosition: (newPosition) => {

    set({ characterPosition: newPosition });
  },
  activeButton: null, // 어떤 버튼이 활성화되었는지 추적
  setActiveButton: (buttonIndex) => {
    // console.log("Active Button Set:", buttonIndex);  // 활성화된 버튼 로그
    set({ activeButton: buttonIndex + 1 });
  }, // 버튼 활성화
  clearActiveButton: () => {
    // console.log("Active Button Cleared");  // 버튼 비활성화 로그
    set({ activeButton: null });
  }, // 버튼 비활성화
}));

export default useStore;
