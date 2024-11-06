import { convertDateToHumanFormat, convertDateToStringHSS } from '@/src/shared';
import { fetchAPI } from '../../auth/api/middleware';

async function getAiChatAPI(): Promise<
  Array<{
    text: string;
    isUser: boolean;
    date: string;
  }>
> {
  return fetchAPI({
    path: `api/v0/service/pet-chat`,
    method: 'GET',
  }).then((res) => {
    if (!res) return [];
    return res.result.map(
      ({ content, date, sender }: { content: string; date: string; sender: 'PERSON' | 'PET' }) => ({
        text: content,
        isUser: sender === 'PERSON',
        date: convertDateToStringHSS(new Date(date)),
      })
    );
  });
}

async function sendAiChatAPI({ message }: { message: string }): Promise<string> {
  return fetchAPI({
    path: `api/v0/service/pet-chat`,
    body: {
      content: message,
      date: new Date(),
    },
    method: 'POST',
  }).then((res) => {
    if (!res) return '메시지 전송에 실패했습니다. 다시 시도해 주세요';
    if (!res.petChatResponse) return '메시지 전송에 실패했습니다. 다시 시도해 주세요';
    if (!res.petChatResponse.message) return '메시지 전송에 실패했습니다. 다시 시도해 주세요';
    return res.petChatResponse.message;
  });
}

async function refreshAiChatAPI(): Promise<boolean> {
  return fetchAPI({
    path: `api/v0/service/pet-chat`,
    method: 'DELETE',
  }).then((res) => {
    return res ?? false;
  });
}

export { getAiChatAPI, sendAiChatAPI, refreshAiChatAPI };
