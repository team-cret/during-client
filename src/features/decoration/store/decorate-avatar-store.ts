import { avatarDecorationCategories, avatarDecorationCategoriesType } from '@/src/shared';
import { create } from 'zustand';

type State = {
  mode: number; // 0 : shop, 1 : bag
  category: avatarDecorationCategoriesType;
};

const defaultState: State = {
  mode: 1,
  category: avatarDecorationCategories[0],
};

type Action = {
  setMode: (mode: number) => void;
  setCategory: (category: avatarDecorationCategoriesType) => void;
};

const useDecorateAvatarStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
  setMode: (mode) => set({ mode }),
  setCategory: (category) => set({ category }),
}));

export { useDecorateAvatarStore };
