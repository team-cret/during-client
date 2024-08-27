import { create } from 'zustand';

type State = {
  platform: 'NAVER' | 'KAKAO' | 'APPLE' | 'GOOGLE' | null;
  accessToken: string | null;
};

const defaultState: State = {
  platform: null,
  accessToken: null,
};

type Action = {
  setAuth: ({
    platform,
    accessToken,
  }: {
    platform?: 'NAVER' | 'KAKAO' | 'APPLE' | 'GOOGLE' | null;
    accessToken?: string | null;
  }) => void;
};

const useAuthStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
  setAuth: ({ platform, accessToken }) => {
    set((state) => ({
      platform: platform ?? state.platform,
      accessToken: accessToken ?? state.accessToken,
    }));
  },
}));

export { useAuthStore };
