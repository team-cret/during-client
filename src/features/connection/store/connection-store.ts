import { requestCoupleConnectionAPI } from '@/src/entities';
import { isValidInvitationCode } from '@/src/shared';
import { create } from 'zustand';

type State = {
  invitationCode: string;
  ifValid: boolean;
};

const defaultState: State = {
  invitationCode: '',
  ifValid: false,
};

type Action = {
  setInvitationCode: (invitationCode: string) => void;
  requestConnection: () => Promise<boolean>;
};

const useConnectionStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  setInvitationCode: (invitationCode) => {
    const ifValid = isValidInvitationCode(invitationCode);
    set((state) => ({ ...state, invitationCode, ifValid }));
  },

  requestConnection: async () => {
    const { invitationCode, ifValid } = get();
    if (!ifValid) return false;
    return requestCoupleConnectionAPI({ invitationCode });
  },
}));

export { useConnectionStore };
