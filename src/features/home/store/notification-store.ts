import {
  acceptCoupleConnectionAPI,
  deleteMemberNotificationAPI,
  getNotificationListAPI,
} from '@/src/entities';
import { create } from 'zustand';

type State = {
  notificationList: Array<{
    id: number;
    type: 'INVITATION';
    sendMember: {
      id: string;
      name: string;
    };
  }>;
};

const defaultState: State = {
  notificationList: [],
};

type Action = {
  getNotificationList: () => void;
  deleteNotification: (id: number) => void;
  acceptCoupleConnection: (id: number) => Promise<boolean>;
};

const useNotificationStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  getNotificationList: async () => {
    const notificationList = await getNotificationListAPI();
    set((state) => ({ ...state, notificationList }));
  },

  deleteNotification: async (id) => {
    //삭제 요청
    const res = await deleteMemberNotificationAPI({ noticeId: id });

    if (res) {
      set((state) => ({
        ...state,
        notificationList: state.notificationList.filter((notification) => notification.id !== id),
      }));
    }
  },

  acceptCoupleConnection: async (id) => {
    if (get().notificationList.find((notification) => notification.id === id) === undefined)
      return false;
    if (
      get().notificationList.find((notification) => notification.id === id)?.type !== 'INVITATION'
    )
      return false;

    const res = await acceptCoupleConnectionAPI({
      noticeId: id,
      sendMemberId: get().notificationList.find((notification) => notification.id === id)
        ?.sendMember.id!,
    });
    if (res) {
      get().deleteNotification(id);
      set((state) => ({
        ...state,
        notificationList: state.notificationList.filter((notification) => notification.id !== id),
      }));
      return true;
    } else {
      return false;
    }
  },
}));

export { useNotificationStore };
