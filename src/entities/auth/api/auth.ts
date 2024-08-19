import { logError, setUserToken } from '@/src/shared';

async function trySignInUpAPI({
  accessToken,
  platform,
}: {
  accessToken: string;
  platform: 'NAVER' | 'KAKAO' | 'APPLE' | 'GOOGLE';
}) {
  return fetch(`${process.env.EXPO_PUBLIC_DURING_SERVER_URL!}/api/v0/auth/oauth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
      provider: platform,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        logError(`${process.env.EXPO_PUBLIC_DURING_SERVER_URL!}/api/v0/auth/oauth ${res.status}`);
        return false;
      }
      return res.json();
    })
    .then((res) => {
      switch (res.code) {
        case 1:
          return res.result;
        default:
          logError(`${process.env.EXPO_PUBLIC_DURING_SERVER_URL!}/api/v0/auth/oauth ${res.code}`);
          return false;
      }
    })
    .then((res) => {
      setUserToken({
        accessToken: res.tokenInfo.accessToken,
        refreshToken: res.tokenInfo.refreshToken,
      });
      return true;
    });
}

export { trySignInUpAPI };
