import { isValidDate, isValidNickName } from '@/src/shared';
import { create } from 'zustand';

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
  curStep: 'birthDay' | 'nickName';
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

const useInfoInputStore = create<State & Action>((set) => ({
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
  continueStep: () =>
    set((state) => {
      if (!state.ifCurStepValid) return state;
      switch (state.curStep) {
        case 'birthDay':
          return { ...state, curStep: 'nickName', ifCurStepValid: state.nickName.ifValid };
        case 'nickName':
          return state;
      }
    }),
}));

export { useInfoInputStore };
