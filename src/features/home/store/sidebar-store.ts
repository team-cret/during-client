import { create } from 'zustand';

type State = {
  ifSideBarOpen: boolean;
};

const defaultState: State = {
  ifSideBarOpen: false,
};

type Action = {
  openSideBar: () => void;
  closeSideBar: () => void;
};

const useSideBarStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
  openSideBar: () =>
    set((state) => ({
      ...state,
      ifSideBarOpen: true,
    })),
  closeSideBar: () =>
    set((state) => ({
      ...state,
      ifSideBarOpen: false,
    })),
}));

export { useSideBarStore };
