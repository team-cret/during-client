import { create } from 'zustand';

type State = {
  isAIOn: boolean;
};

const defaultState: State = {
  isAIOn: false,
};

type Action = {
  setIsAIOn: (isAIOn: boolean) => void;
};

const useChatAIStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
  setIsAIOn: (isAIOn) => {
    set({ isAIOn });
  },
}));

export { useChatAIStore };
