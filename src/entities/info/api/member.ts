import { fetchAPI } from '../../auth/api/middleware';

async function getMemberProfileInfo() {
  return fetchAPI({
    method: 'GET',
    path: 'api/v0/info/member',
  }).then((res) => {
    if (res === null) return null;
    return {
      brith: res.memberInfo.birth,
      coupleId: res.memberInfo.coupleId,
      id: res.memberInfo.id,
      invitationCode: res.memberInfo.invitationCode,
      lastReadChatId: res.memberInfo.lastReadChatId,
      name: res.memberInfo.name,
      requiredTermsAgreed: res.memberInfo.requiredTermsAgreed,
      role: res.memberInfo.role,
    };
  });
}

async function updateMemberProfileInfo({
  memberId,
  nickname,
  birthday,
  profileImageUrl,
  agreedTermsId,
  disagreedTermsId,
}: {
  memberId: string;
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
    params: {
      memberId,
    },
    body: {
      updateData: {
        name: nickname ? nickname : null,
        birth: birthday ? `${birthday.year}-${birthday.month}-${birthday.day}` : null,
        profileImageUrl: profileImageUrl ? profileImageUrl : null,
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

export { getMemberProfileInfo, updateMemberProfileInfo };
