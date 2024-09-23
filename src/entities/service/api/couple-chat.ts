import {
  convertDateToStringFullDate,
  convertDateToStringHSS,
  getUserToken,
  logError,
  logInfo,
  MESSAGE_PAGE_SIZE,
} from '@/src/shared';
import { fetchAPI } from '../../auth/api/middleware';
import { readChatAPI } from '../../info';

async function getCoupleChatAPI({
  chatId,
  size = MESSAGE_PAGE_SIZE,
  scrollType,
}: {
  chatId: number;
  size?: number;
  scrollType: 'BEFORE' | 'AFTER' | 'BOTH' | 'INIT';
}): Promise<Array<Chat> | null> {
  return fetchAPI({
    path: `api/v0/service/couple-chat`,
    params: {
      chatId,
      size,
      scrollType,
    },
    method: 'GET',
  }).then(
    (
      res: {
        chatInfo: Array<Chat> | null;
      } | null
    ) => {
      if (res === null) return null;
      return res.chatInfo
        ? res.chatInfo.map((chat) => {
            return {
              ...chat,
              date: convertDateToStringHSS(new Date(chat.date)),
            };
          })
        : [];
    }
  );
}

async function sendCoupleChatAPI({
  type,
  content,
  date,
  aiToggle,
  replyId,
}: {
  type: 'TEXT' | 'IMAGE' | 'VIDEO';
  content: string;
  date: Date;
  aiToggle: boolean;
  replyId: number | null;
}) {
  fetchAPI({
    path: 'api/v0/service/couple-chat',
    method: 'POST',
    body: {
      type,
      content,
      date: convertDateToStringFullDate(date),
      aiToggle,
      replyId,
    },
  });
}

async function deleteCoupleChatAPI({ deleteId }: { deleteId: number }) {
  fetchAPI({
    path: `api/v0/service/couple-chat`,
    method: 'DELETE',
    params: {
      deleteId,
    },
  });
}

async function chatWebSocketOpen({
  appendMessage,
  readMessage,
  setMotion,
}: {
  appendMessage: (chat: Chat) => void;
  readMessage: ({ startChatId, endChatId }: { startChatId: number; endChatId: number }) => void;
  setMotion: (isMyInfo: boolean, motionId: string) => void;
}) {
  const token = await getUserToken();
  if (token === null) {
    logError('token is null');
    return null;
  }
  if (token.accessToken === null) {
    logError('accessToken is null');
    return null;
  }

  const ws = new WebSocket(
    `${process.env.EXPO_PUBLIC_DURING_WEBSOCKET_URL!}/api/v0/couple-chat/connect?token=${
      token.accessToken
    }`
  );
  ws.onopen = () => {
    logInfo('websocket connected');
  };
  ws.onmessage = (e) => {
    const message = JSON.parse(e.data);
    switch (message.actionType) {
      case 'MESSAGE_SEND':
        appendMessage({
          ...message.messageInfo,
          date: convertDateToStringHSS(new Date(message.messageInfo.date)),
        });
        readChatAPI({ chatId: message.messageInfo.id });
        break;
      case 'MESSAGE_ACCEPT':
        readMessage({
          startChatId: message.startChatId,
          endChatId: message.endChatId,
        });
        break;
      case 'MOTION_UPDATE':
        setMotion(message.isMyInfo, message.result['motion_id']);
        break;
      default:
        console.log(message);
        break;
    }
  };
  ws.onclose = () => {
    logInfo('websocket closed');
  };
}

export { getCoupleChatAPI, sendCoupleChatAPI, deleteCoupleChatAPI, chatWebSocketOpen };
