import {
  chatWebSocketOpen,
  deleteCoupleChatAPI,
  getCoupleChatAPI,
  sendCoupleChatAPI,
} from '@/src/entities';
import { MESSAGE_PAGE_SIZE } from '@/src/shared';
import { create } from 'zustand';

type State = {
  input: {
    message: string;
    ifValid: boolean;
  };
  chatCollection: Array<{
    topId: number;
    bottomId: number;
    chatList: Array<Chat>;
  }>;
};

const defaultState: State = {
  input: {
    message: '',
    ifValid: false,
  },
  chatCollection: [],
};

type Action = {
  setInputMessage: ({ message }: { message: string }) => void;
  sendMessage: ({ ifAi }: { ifAi: boolean }) => void;
  deleteMessage: ({ messageId }: { messageId: number }) => void;
  getMessages: ({
    basisChatId,
    scrollType,
  }: {
    basisChatId: number;
    scrollType: 'BEFORE' | 'AFTER' | 'BOTH';
  }) => void;
  appendMessage: (chat: Chat) => void;
  removeMessage: ({ messageId }: { messageId: number }) => void;
  startChat: ({ lastChatId }: { lastChatId: number }) => void;
};

const useChatStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  setInputMessage: ({ message }) => {
    set((state) => ({
      ...state,
      input: {
        message,
        ifValid: message.length > 0,
      },
    }));
  },
  sendMessage: ({ ifAi }) => {
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

  getMessages: ({ basisChatId, scrollType }) => {
    getCoupleChatAPI({ chatId: basisChatId, scrollType }).then((res) => {
      if (res === null || res.length === 0) return;

      //새로운 메시지 삽입
      const newChatCollection = get().chatCollection;
      for (var i = 0; i < newChatCollection.length; i++) {
        if (newChatCollection[i].bottomId < res[0].id) continue;
        newChatCollection.splice(i, 0, {
          topId: res[0].id,
          bottomId: res[res.length - 1].id,
          chatList: res,
        });
        break;
      }

      //메시지 콜렉션끼리 겹치는 부분 합치기
      for (var i = 0; i < newChatCollection.length - 1; i++) {
        if (newChatCollection[i].bottomId < newChatCollection[i + 1].topId) continue;
        newChatCollection[i].chatList = newChatCollection[i].chatList.concat(
          newChatCollection[i + 1].chatList
        );
        //id 중복되는것 빼기
        newChatCollection[i].chatList = newChatCollection[i].chatList.filter(
          (chat, index, self) => self.findIndex((t) => t.id === chat.id) === index
        );
        newChatCollection[i].chatList.sort((a, b) => a.id - b.id);
        newChatCollection[i].topId = newChatCollection[i].chatList[0].id;
        newChatCollection[i].bottomId =
          newChatCollection[i].chatList[newChatCollection[i].chatList.length - 1].id;

        newChatCollection.splice(i + 1, 1);
        i--;
      }

      set((state) => ({
        ...state,
        chatCollection: newChatCollection.filter((collection) => collection.chatList.length > 0),
      }));
    });
  },

  appendMessage: (chat: Chat) => {
    if (get().chatCollection.length === 0) {
      set((state) => ({
        ...state,
        chatCollection: [
          {
            topId: chat.id,
            bottomId: chat.id,
            chatList: [chat],
          },
        ],
      }));
    } else {
      set((state) => {
        state.chatCollection.splice(state.chatCollection.length - 1, 1, {
          topId: state.chatCollection[state.chatCollection.length - 1].topId,
          bottomId: chat.id,
          chatList: state.chatCollection[state.chatCollection.length - 1].chatList.concat(chat),
        });
        return {
          ...state,
          chatCollection: state.chatCollection,
        };
      });
    }
  },

  removeMessage: ({ messageId }) => {
    // deleteCoupleChatAPI({ deleteId: messageId }).then((res) => {
    //   if (res !== null) {
    //     set((state) => ({
    //       ...state,
    //       chatCollection: state.chatCollection
    //         .map((collection) => {
    //           if (!(collection.topId <= messageId && messageId <= collection.bottomId))
    //             return collection;
    //           else {
    //             const newChatList = collection.chatList.filter((chat) => chat.id !== messageId);
    //             if (newChatList.length === 0)
    //               return {
    //                 topId: 0,
    //                 bottomId: 0,
    //                 chatList: [],
    //               };
    //             return {
    //               topId: newChatList[0].id,
    //               bottomId: newChatList[newChatList.length - 1].id,
    //               chatList: newChatList,
    //             };
    //           }
    //         })
    //         .filter((collection) => collection.chatList.length > 0),
    //     }));
    //   }
    // });
  },

  startChat: ({ lastChatId }: { lastChatId: number }) => {
    getCoupleChatAPI({ chatId: lastChatId, scrollType: 'BOTH' }).then((res) => {
      if (res === null || res.length === 0) return;
      set((state) => ({
        ...state,
        chatCollection: [
          {
            topId: res[0].id,
            bottomId: res[res.length - 1].id,
            chatList: res,
          },
        ],
      }));
      chatWebSocketOpen({ appendMessage: get().appendMessage });
    });
  },
}));

export { useChatStore };
