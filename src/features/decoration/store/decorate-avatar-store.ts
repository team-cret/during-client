import { create } from 'zustand';

type State = {
  mode: number; // 0 : shop, 1 : bag
  category: '헤어' | '상의' | '하의' | '신발';
};

const defaultState: State = {
  mode: 1,
  category: '헤어',
};

type Action = {
  setMode: (mode: number) => void;
  setCategory: (category: '헤어' | '상의' | '하의' | '신발') => void;
};

const useDecorateAvatarStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
  setMode: (mode) => set({ mode }),
  setCategory: (category) => set({ category }),
}));

export { useDecorateAvatarStore };
