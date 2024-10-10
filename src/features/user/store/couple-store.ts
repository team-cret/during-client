import { disconnectCoupleAPI, getCoupleProfileInfoAPI } from '@/src/entities';
import { takeAttendanceAPI } from '@/src/entities/event';
import { create } from 'zustand';

type State = {
  id: string;
  cashPoint: number;
  startDate: Date;
  endDate: string;
  state: 'CONNECT' | 'BROKEN' | null;
  memberInfoList: Array<{
    id: string;
    name: string;
    profileImageUrl: string;
  }>;
};

const defaultState: State = {
  id: '',
  cashPoint: 0,
  startDate: new Date(),
  endDate: '',
  state: null,
  memberInfoList: [
    {
      id: '',
      name: '',
      profileImageUrl: '',
    },
  ],
};

type Action = {
  getCoupleInfo: () => Promise<boolean>;
  disconnectCouple: () => Promise<boolean>;
  takeAttendance: () => Promise<boolean>;
};

const useCoupleStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
  getCoupleInfo: async () => {
    const res = await getCoupleProfileInfoAPI();
    if (res === null) return false;

    set({
      id: res.id,
      cashPoint: res.cashPoint,
      startDate: new Date(res.startDate),
      endDate: res.endDate,
      state: res.state,
      memberInfoList: res.memberInfoList,
    });
    return true;
  },
  disconnectCouple: async () => {
    return await disconnectCoupleAPI();
  },

  takeAttendance: async () => {
    return await takeAttendanceAPI();
  },
}));

export { useCoupleStore };
