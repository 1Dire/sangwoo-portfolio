import { create } from "zustand";

const useStore = create((set) => ({
  fenceCount: 0,
  incrementFenceCount: () => set((state) => ({ fenceCount: state.fenceCount + 1 })),
}));

export default useStore;