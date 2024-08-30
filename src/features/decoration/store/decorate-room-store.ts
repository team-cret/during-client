import { create } from 'zustand';

type State = {
  mode: number; // 0 : shop, 1 : bag
  category: '배경' | '가구' | '소품';
};

const defaultState: State = {
  mode: 1,
  category: '배경',
};

type Action = {
  setMode: (mode: number) => void;
  setCategory: (category: '배경' | '가구' | '소품') => void;
};

const useDecorateRoomStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
  setMode: (mode) => set({ mode }),
  setCategory: (category) => set({ category }),
}));

export { useDecorateRoomStore };
