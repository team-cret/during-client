import {
  convertDateToStringFullDate,
  convertDateToStringHSS,
  getUserToken,
  logError,
  logInfo,
  MESSAGE_PAGE_SIZE,
  setUserToken,
} from '@/src/shared';
import { fetchAPI } from '../../auth/api/middleware';
import { readChatAPI } from '../../info';

import * as THREE from 'three';

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
  return fetchAPI({
    path: 'api/v0/service/couple-chat',
    method: 'POST',
    body: {
      type,
      content,
      date: convertDateToStringFullDate(date),
      aiToggle,
      replyId,
    },
  }).then((res) => {
    return res ?? false;
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
  moveAvatar,
  initRoom,
  getCoupleInfo,
}: {
  appendMessage: (chat: Chat) => void;
  readMessage: ({ startChatId, endChatId }: { startChatId: number; endChatId: number }) => void;
  setMotion: (isMyInfo: boolean, motionId: string) => void;
  moveAvatar: (isMyInfo: boolean, position: THREE.Vector3) => void;
  initRoom: ({ userRole }: { userRole: 'ROLE_SINGLE' | 'ROLE_COUPLE' | null }) => void;
  getCoupleInfo: () => void;
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
      case 'AVATAR_MOVE':
        moveAvatar(
          message.isMyInfo,
          new THREE.Vector3(message.moveInfo.x, message.moveInfo.y, message.moveInfo.z)
        );
        break;
      case 'ROOM_UPDATE':
        initRoom({ userRole: 'ROLE_COUPLE' });
        break;
      case 'COUPLE_UPDATE':
        getCoupleInfo();
        break;
      case 'AVATAR_UPDATE':
        initRoom({ userRole: 'ROLE_COUPLE' });
        break;
      case 'MEMBER_DELETE':
      case 'COUPLE_DELETE':
        setUserToken({ accessToken: null, refreshToken: null });
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
