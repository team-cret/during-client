import { convertDateToStringFullDate, getUserToken, logError, logInfo } from '@/src/shared';
import { fetchAPI } from '../../auth/api/middleware';

async function getCoupleChatAPI({
  coupleChatId,
  size,
  type,
}: {
  coupleChatId: string;
  size: number;
  type: 'before' | 'after' | 'both';
}): Promise<Array<{
  id: number;
  type: 'TEXT' | 'IMAGE' | 'VIDEO';
  content: string;
  date: Date;
  sendMemberInfo: {
    id: string;
    name: string;
  };
  readCount: number;
  replyInfo: {
    id: number;
    messageType: 'TEXT' | 'IMAGE' | 'VIDEO';
    content: string;
  } | null;
}> | null> {
  return fetchAPI({
    path: `api/v0/service/couple-chat/${coupleChatId}`,
    params: {
      size,
      type,
    },
    method: 'GET',
  });
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

async function chatWebSocketOpen({ appendMessage }: { appendMessage: (message: any) => void }) {
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
    `${process.env.EXPO_PUBLIC_DURING_WEBSOCKET_URL!}/ws/couple-chat/connect?token=${
      token.accessToken
    }`
  );
  ws.onopen = () => {
    logInfo('websocket connected');
  };
  ws.onmessage = (e) => {
    const message = JSON.parse(e.data);
    console.log(message);
    appendMessage({
      id: message.id,
      type: message.messageType,
      content: message.content,
      date: new Date(message.date),
      sendMemberInfo: {
        id: message.sendMemberInfo.id,
        name: message.sendMemberInfo.name,
      },
      readCount: message.readCount,
      // replyInfo: {
      //   id: message.replyInfo.id,
      //   content: message.replyInfo.content,
      // },
      replyInfo: {
        id: null,
        content: null,
      },
    });
  };
  ws.onclose = () => {
    logInfo('websocket closed');
  };
}

export { getCoupleChatAPI, sendCoupleChatAPI, deleteCoupleChatAPI, chatWebSocketOpen };
