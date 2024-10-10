import { requestCoupleConnectionAPI } from '@/src/entities';
import { isValidInvitationCode } from '@/src/shared';
import { create } from 'zustand';

type State = {
  invitationCode: string;
  ifValid: boolean;
};

const defaultState: State = {
  invitationCode: '',
  ifValid: true,
};

type Action = {
  setInvitationCode: (val: string) => void;
  requestConnection: () => Promise<boolean>;
};

const useConnectionStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  setInvitationCode: (val) => {
    const ifValid = isValidInvitationCode(val);
    set((state) => ({ ...state, invitationCode: val, ifValid }));
  },

  requestConnection: async () => {
    const { invitationCode, ifValid } = get();
    if (!ifValid) return false;
    return requestCoupleConnectionAPI({ invitationCode });
  },
}));

export { useConnectionStore };
