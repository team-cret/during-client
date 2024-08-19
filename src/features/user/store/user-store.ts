import { getMemberProfileInfoAPI, updateMemberProfileInfoAPI } from '@/src/entities';
import { termsOptional, termsRequired } from '@/src/shared';
import { create } from 'zustand';

type State = {
  id: string;
  birth: Date | null;
  invitationCode: string;
  lastReadChatId: number;
  name: string | null;
  requiredTermsAgreed: boolean;
  role: 'ROLE_SINGLE' | 'ROLE_COUPLE' | null;
};

const defaultState: State = {
  id: '',
  birth: null,
  invitationCode: '',
  lastReadChatId: 0,
  name: null,
  requiredTermsAgreed: false,
  role: null,
};

type Action = {
  getUserInfo: () => Promise<boolean>;
  updateUserInfo: ({
    nickname,
    birthday,
    ifRequiredAgreed,
    ifOptionalAgreed,
  }: {
    nickname?: string;
    birthday?: {
      year: string;
      month: string;
      day: string;
    };
    ifRequiredAgreed: boolean[];
    ifOptionalAgreed: boolean[];
  }) => Promise<boolean>;
};

const useUserStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  getUserInfo: async () => {
    const memberInfo = await getMemberProfileInfoAPI();
    if (memberInfo === null) return false;
    set({
      id: memberInfo.id,
      birth: memberInfo.birth == null ? null : new Date(memberInfo.birth),
      invitationCode: memberInfo.invitationCode,
      lastReadChatId: memberInfo.lastReadChatId,
      name: memberInfo.name,
      requiredTermsAgreed: memberInfo.requiredTermsAgreed,
      role: memberInfo.role,
    });
    return true;
  },

  updateUserInfo: async ({ nickname, birthday, ifRequiredAgreed, ifOptionalAgreed }) => {
    const result = await updateMemberProfileInfoAPI({
      nickname,
      birthday,
      agreedTermsId: [
        ...ifRequiredAgreed
          .map((val, idx) => {
            if (val) return termsRequired[idx].id;
            else return -1;
          })
          .filter((val) => val !== -1),
        ...ifOptionalAgreed
          .map((val, idx) => {
            if (val) return termsOptional[idx].id;
            else return -1;
          })
          .filter((val) => val !== -1),
      ],
      disagreedTermsId: [
        ...ifRequiredAgreed
          .map((val, idx) => {
            if (!val) return termsRequired[idx].id;
            else return -1;
          })
          .filter((val) => val !== -1),
        ...ifOptionalAgreed
          .map((val, idx) => {
            if (!val) return termsOptional[idx].id;
            else return -1;
          })
          .filter((val) => val !== -1),
      ],
    });
    if (result === null) return false;

    set((state) => ({
      ...state,
      name: nickname ?? state.name,
      birth: birthday
        ? new Date(parseInt(birthday.year), parseInt(birthday.month) - 1, parseInt(birthday.day))
        : state.birth,
      requiredTermsAgreed:
        ifRequiredAgreed !== null && ifOptionalAgreed !== null ? true : state.requiredTermsAgreed,
    }));
    return true;
  },
}));

export { useUserStore };
