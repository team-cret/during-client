import { getAiChatAPI, refreshAiChatAPI, sendAiChatAPI } from '@/src/entities';
import { convertDateToStringHSS } from '@/src/shared';
import { create } from 'zustand';

type State = {
  input: {
    val: string;
    ifValid: boolean;
    ifSendable: boolean;
  };

  chatList: Array<{
    text: string;
    isUser: boolean;
    date: string;
  }>;
};

const defaultState: State = {
  input: {
    val: '',
    ifValid: false,
    ifSendable: true,
  },

  chatList: [],
};

type Action = {
  initChatList: () => void;
  refreshChatList: () => void;
  sendChat: () => void;
  updateInput: (message: string) => void;
};

const useAiChatStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  initChatList: () => {
    getAiChatAPI().then((res) => {
      if (!res) return;
      set((state) => ({
        ...state,
        chatList: res,
      }));
    });
  },

  refreshChatList: () => {
    refreshAiChatAPI().then((res) => {
      if (!res) return;
      set((state) => ({
        ...state,
        chatList: [],
      }));
    });
  },

  sendChat: () => {
    if (!get().input.ifValid) return;
    if (!get().input.ifSendable) return;

    set((state) => ({
      ...state,
      input: {
        ...state.input,
        ifValid: false,
        ifSendable: false,
      },
    }));

    sendAiChatAPI({ message: get().input.val }).then((res) => {
      set((state) => ({
        ...state,
        chatList: [
          ...state.chatList,
          {
            text: state.input.val,
            isUser: true,
            date: convertDateToStringHSS(new Date()),
          },
          {
            text: res,
            isUser: false,
            date: convertDateToStringHSS(new Date()),
          },
        ],
        input: {
          ...state.input,
          val: '',
          ifSendable: true,
        },
      }));
    });
  },

  updateInput: (message) => {
    set((state) => ({
      ...state,
      input: {
        ...state.input,
        val: message,
        ifValid: message.length > 0,
      },
    }));
  },
}));

export { useAiChatStore };
