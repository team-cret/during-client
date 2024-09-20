import { fetchAPI } from '../../auth/api/middleware';

async function getMemberProfileInfoAPI() {
  return fetchAPI({
    method: 'GET',
    path: 'api/v0/info/member',
  }).then((res) => {
    if (res === null) return null;
    return {
      birth: res.memberInfo.birth,
      id: res.memberInfo.id,
      invitationCode: res.memberInfo.invitationCode,
      lastReadChatId: res.memberInfo.lastReadChatId,
      name: res.memberInfo.name,
      requiredTermsAgreed: res.memberInfo.requiredTermsAgreed,
      role: res.memberInfo.role,
    };
  });
}

async function updateMemberProfileInfoAPI({
  nickname,
  birthday,
  profileImageUrl,
  agreedTermsId,
  disagreedTermsId,
}: {
  nickname?: string;
  profileImageUrl?: string;
  birthday?: {
    year: string;
    month: string;
    day: string;
  };
  agreedTermsId?: Array<number>;
  disagreedTermsId?: Array<number>;
}) {
  return fetchAPI({
    method: 'PUT',
    path: 'api/v0/info/member',
    body: {
      updateData: {
        name: nickname ? nickname : null,
        birth: birthday
          ? `${birthday.year.padStart(4, '0')}-${birthday.month.padStart(
              2,
              '0'
            )}-${birthday.day.padStart(2, '0')}`
          : '1900-01-01',
        profileImageUrl: profileImageUrl ?? null,
      },
      agreedTerms: agreedTermsId?.map((id) => {
        return {
          id: id,
        };
      }),
      revokedTerms: disagreedTermsId?.map((id) => {
        return {
          id: id,
        };
      }),
    },
  });
}

async function deleteMemberAPI() {
  return fetchAPI({
    method: 'DELETE',
    path: 'api/v0/info/member',
  }).then((res) => {
    if (res === null) return false;
    return true;
  });
}

async function requestCoupleConnectionAPI({ invitationCode }: { invitationCode: string }) {
  return fetchAPI({
    path: 'api/v0/info/member/couple-request',
    method: 'POST',
    body: {
      invitationCode,
    },
  }).then((res) => {
    if (res === null) return false;
    return true;
  });
}

async function acceptCoupleConnectionAPI({
  noticeId,
  sendMemberId,
}: {
  noticeId: number;
  sendMemberId: string;
}) {
  return fetchAPI({
    path: 'api/v0/info/member/couple-accept',
    method: 'POST',
    body: {
      noticeId,
      sendMemberId,
    },
  }).then((res) => {
    if (res === null) return false;
    return true;
  });
}

async function getNotificationListAPI() {
  return fetchAPI({
    path: 'api/v0/info/member/notifications',
    method: 'GET',
  }).then((res) => {
    if (res === null) return [];
    return res.noticeInfo;
  });
}

async function deleteMemberNotificationAPI({ noticeId }: { noticeId: number }) {
  return fetchAPI({
    path: 'api/v0/info/member/notifications',
    method: 'DELETE',
    params: {
      noticeId,
    },
  }).then((res) => {
    if (res === null) return false;
    return true;
  });
}

async function readChatAPI({ chatId }: { chatId: number }): Promise<boolean> {
  return fetchAPI({
    path: 'api/v0/info/member/chat-accept',
    method: 'PUT',
    params: {
      lastReadChatId: chatId,
    },
  }).then((res) => {
    return res ?? false;
  });
}

export {
  getMemberProfileInfoAPI,
  updateMemberProfileInfoAPI,
  deleteMemberAPI,
  requestCoupleConnectionAPI,
  acceptCoupleConnectionAPI,
  getNotificationListAPI,
  deleteMemberNotificationAPI,
  readChatAPI,
};
