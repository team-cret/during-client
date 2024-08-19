import { isValidDate, isValidNickName } from '@/src/shared';
import { create } from 'zustand';
import { useUserStore } from '../../user';

type State = {
  birthDay: {
    year: string;
    month: string;
    day: string;
    ifValid: boolean;
  };
  nickName: {
    nickName: string;
    ifValid: boolean;
  };
  curStep: 'birthDay' | 'nickName' | 'done';
  ifCurStepValid: boolean;
};

const defaultState: State = {
  birthDay: {
    year: '',
    month: '',
    day: '',
    ifValid: false,
  },
  nickName: {
    nickName: '',
    ifValid: false,
  },
  curStep: 'birthDay',
  ifCurStepValid: false,
};

type Action = {
  setBirthDay: ({ year, month, day }: { year?: string; month?: string; day?: string }) => void;
  clearBrithDay: () => void;
  setNickName: (value: string) => void;
  clearNickName: () => void;
  continueStep: () => void;
};

const useInfoInputStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  setBirthDay: ({ year, month, day }) =>
    set((state) => {
      if (year == undefined) year = state.birthDay.year;
      if (month == undefined) month = state.birthDay.month;
      if (day == undefined) day = state.birthDay.day;

      if (isNaN(Number(year)) || isNaN(Number(month)) || isNaN(Number(day))) return state;

      const ifValid = isValidDate(year, month, day);
      return {
        ...state,
        birthDay: { year, month, day, ifValid },
        ifCurStepValid: ifValid,
      };
    }),
  clearBrithDay: () =>
    set((state) => ({ ...state, birthDay: defaultState.birthDay, ifCurStepValid: false })),
  setNickName: (nickName) =>
    set((state) => {
      const ifValid = isValidNickName(nickName);
      return {
        ...state,
        nickName: { nickName, ifValid },
        ifCurStepValid: ifValid,
      };
    }),
  clearNickName: () =>
    set((state) => ({ ...state, nickName: defaultState.nickName, ifCurStepValid: false })),
  continueStep: async () => {
    if (!get().ifCurStepValid) return;
    switch (get().curStep) {
      case 'birthDay':
        set({ curStep: 'nickName' });
        break;
      case 'nickName':
        set({ curStep: 'done' });
        break;
    }
  },
}));

export { useInfoInputStore };
