import {
  chatWebSocketOpen,
  deleteCoupleChatAPI,
  getCoupleChatAPI,
  readChatAPI,
  sendCoupleChatAPI,
} from '@/src/entities';
import { isValidChatMessage } from '@/src/shared';
import { create } from 'zustand';

type State = {
  input: {
    message: string;
    ifValid: boolean;
  };
  chatList: Array<Chat>;
  isScrollBottom: boolean;
  isChatMode: boolean;
};

const defaultState: State = {
  input: {
    message: '',
    ifValid: false,
  },
  chatList: [],
  isScrollBottom: true,
  isChatMode: false,
};

type Action = {
  startChat: ({ lastChatId }: { lastChatId: number }) => void;
  setInputMessage: ({ message }: { message: string }) => void;
  setIsScrollBottom: (isScrollBottom: boolean) => void;
  setIsChatMode: (isChatMode: boolean) => void;

  sendMessage: ({ ifAi }: { ifAi: boolean }) => void;
  deleteMessage: ({ messageId }: { messageId: number }) => void;
  getMessages: ({
    basisChatId,
    scrollType,
  }: {
    basisChatId: number;
    scrollType: 'BEFORE' | 'AFTER' | 'BOTH' | 'INIT';
  }) => Promise<boolean>;

  //API 콜이 아닌, 내부 상태만 변경하는 메서드들
  appendMessage: (chat: Chat) => void;
  removeMessage: ({ messageId }: { messageId: number }) => void;
  readMessage: ({ startChatId, endChatId }: { startChatId: number; endChatId: number }) => void;
};

const useChatStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  startChat: ({ lastChatId }: { lastChatId: number }) => {
    getCoupleChatAPI({ chatId: lastChatId, scrollType: 'INIT' }).then((res) => {
      if (res === null) return;
      chatWebSocketOpen({ appendMessage: get().appendMessage, readMessage: get().readMessage });
      if (res.length == 0) return;

      readChatAPI({ chatId: res[res.length - 1].id });
      set((state) => ({
        ...state,
        chatList: res,
      }));
    });
  },

  setInputMessage: ({ message }) => {
    set((state) => ({
      ...state,
      input: {
        message,
        ifValid: message.length > 0,
      },
    }));
  },
  setIsScrollBottom: (isScrollBottom) => {
    set((state) => ({
      ...state,
      isScrollBottom,
    }));
  },
  setIsChatMode: (isChatMode) => {
    set((state) => ({
      ...state,
      isChatMode,
    }));
  },

  sendMessage: ({ ifAi }) => {
    if (!isValidChatMessage(get().input.message)) return;
    sendCoupleChatAPI({
      type: 'TEXT',
      content: get().input.message,
      date: new Date(),
      aiToggle: ifAi,
      replyId: null,
    });
  },
  deleteMessage: ({ messageId }) => {
    deleteCoupleChatAPI({ deleteId: messageId });
  },

  getMessages: async ({ basisChatId, scrollType }) => {
    return await getCoupleChatAPI({ chatId: basisChatId, scrollType }).then((res) => {
      if (res === null || res.length === 0) return false;

      if (scrollType === 'BEFORE') {
        set((state) => ({
          ...state,
          chatList: [...res, ...state.chatList],
        }));
      } else if (scrollType === 'AFTER') {
        set((state) => ({
          ...state,
          chatList: [...state.chatList, ...res],
        }));
      } else {
        set((state) => ({
          ...state,
          chatList: res,
        }));
      }

      return true;
    });
  },

  appendMessage: (chat: Chat) => {
    set((state) => ({
      ...state,
      chatList: [...state.chatList, chat],
    }));
  },

  removeMessage: ({ messageId }) => {
    set((state) => ({
      ...state,
      chatList: state.chatList.filter((chat) => chat.id !== messageId),
    }));
  },

  readMessage: ({ startChatId, endChatId }) => {
    const newChatList = get().chatList.map((chat) => {
      if (startChatId < chat.id && chat.id <= endChatId) {
        return {
          ...chat,
          readCount: chat.readCount + 1,
        };
      }
      return chat;
    });

    set((state) => ({
      ...state,
      chatList: newChatList,
    }));
  },
}));

export { useChatStore };
