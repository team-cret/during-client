import { create } from 'zustand';

type State = {
  chats: Array<{
    text: string;
    ifRead: boolean;
    time: Date;
    ifMy: boolean;
  }>;
};

const defaultState: State = {
  // chats: [],
  chats: [
    {
      text: '오늘 밥 뭐먹었어?',
      ifRead: true,
      time: new Date('2024-08-05T10:00:00'),
      ifMy: false,
    },
    {
      text: '비밀임 ㅋㅋ',
      ifRead: true,
      time: new Date('2024-08-05T10:01:00'),
      ifMy: true,
    },
    {
      text: '오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?',
      ifRead: true,
      time: new Date('2024-08-05T10:02:00'),
      ifMy: false,
    },
    {
      text: '🤬',
      ifRead: true,
      time: new Date('2024-08-05T10:03:00'),
      ifMy: true,
    },
  ],
};

type Action = {
  addChat: (chat: { text: string; ifRead: boolean; time: Date; ifMy: boolean }) => void;
};

const useChatStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
  addChat: (chat) =>
    set((state) => ({
      ...state,
      chats: [...state.chats, chat],
    })),
}));

export { useChatStore };
