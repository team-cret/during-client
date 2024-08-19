declare type Chat = {
  id: number;
  messageType: 'TEXT' | 'IMAGE' | 'VIDEO';
  content: string;
  date: string;
  sendMemberInfo: {
    id: string;
    name: string;
  };
  readCount: number;
  replyMessage: {
    id: number;
    messageType: 'TEXT' | 'IMAGE' | 'VIDEO';
    content: string;
  } | null;
};
