import { termsOptional, termsRequired } from '@/src/shared';
import { create } from 'zustand';

type State = {
  ifAllAgreed: boolean;
  ifRequiredAgreed: boolean[];
  ifOptionalAgreed: boolean[];
  ifRequiredAllAgreed: boolean;
};

const defaultState: State = {
  ifAllAgreed: false,
  ifRequiredAgreed: Array.from({ length: termsRequired.length }, () => false),
  ifOptionalAgreed: Array.from({ length: termsOptional.length }, () => false),
  ifRequiredAllAgreed: false,
};

type Action = {
  toggleIfAllAgreed: () => void;
  toggleIfRequiredAgreed: (idx: number) => void;
  toggleIfOptionalAgreed: (idx: number) => void;
};

const useTermsOfServiceInputStore = create<State & Action>((set) => ({
  ...defaultState,

  // actions
  toggleIfAllAgreed: () =>
    set((state) => {
      const newIfAllAgreed = !state.ifAllAgreed;
      return {
        ifAllAgreed: newIfAllAgreed,
        ifRequiredAgreed: Array.from({ length: termsRequired.length }, () => newIfAllAgreed),
        ifOptionalAgreed: Array.from({ length: termsOptional.length }, () => newIfAllAgreed),
        ifRequiredAllAgreed: newIfAllAgreed,
      };
    }),

  toggleIfRequiredAgreed: (idx) =>
    set((state) => {
      const newIfRequiredAgreed = state.ifRequiredAgreed.map((v, i) => (i === idx ? !v : v));
      const newIfRequiredAllAgreed = newIfRequiredAgreed.every((v) => v);
      const newIfAllAgreed = newIfRequiredAllAgreed && state.ifOptionalAgreed.every((v) => v);
      return {
        ifAllAgreed: newIfAllAgreed,
        ifRequiredAgreed: newIfRequiredAgreed,
        ifOptionalAgreed: state.ifOptionalAgreed,
        ifRequiredAllAgreed: newIfRequiredAllAgreed,
      };
    }),

  toggleIfOptionalAgreed: (idx) =>
    set((state) => {
      const newIfOptionalAgreed = state.ifOptionalAgreed.map((v, i) => (i === idx ? !v : v));
      const newIfAllAgreed =
        newIfOptionalAgreed.every((v) => v) && state.ifRequiredAgreed.every((v) => v);
      return {
        ifAllAgreed: newIfAllAgreed,
        ifRequiredAgreed: state.ifRequiredAgreed,
        ifOptionalAgreed: newIfOptionalAgreed,
        ifRequiredAllAgreed: state.ifRequiredAllAgreed,
      };
    }),
}));

export { useTermsOfServiceInputStore };
