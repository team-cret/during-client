import { getMemberProfileInfo, updateMemberProfileInfo } from '@/src/entities';
import { termsOptional, termsRequired } from '@/src/shared';
import { create } from 'zustand';

type State = {
  birth: Date | null;
  coupleId: string;
  id: string;
  invitationCode: string;
  lastReadChatId: number;
  name: string | null;
  requiredTermsAgreed: boolean;
  role: 'ROLE_SINGLE' | 'ROLE_COUPLE';
};

const defaultState: State = {
  birth: null,
  coupleId: '',
  id: '',
  invitationCode: '',
  lastReadChatId: 0,
  name: null,
  requiredTermsAgreed: false,
  role: 'ROLE_SINGLE',
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
    const memberInfo = await getMemberProfileInfo();
    if (memberInfo === null) return false;

    set(memberInfo);
    return true;
  },

  updateUserInfo: async ({ nickname, birthday, ifRequiredAgreed, ifOptionalAgreed }) => {
    const result = await updateMemberProfileInfo({
      memberId: get().id,
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
