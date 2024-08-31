import { roomDecorationCategories, roomDecorationCategoriesType } from '@/src/shared';
import { create } from 'zustand';

type State = {
  mode: number; // 0 : shop, 1 : bag
  category: roomDecorationCategoriesType;
};

const defaultState: State = {
  mode: 1,
  category: roomDecorationCategories[0],
};

type Action = {
  setMode: (mode: number) => void;
  setCategory: (category: roomDecorationCategoriesType) => void;
};

const useDecorateRoomStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
  setMode: (mode) => set({ mode }),
  setCategory: (category) => set({ category }),
}));

export { useDecorateRoomStore };
