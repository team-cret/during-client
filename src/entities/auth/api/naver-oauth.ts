const NAVER_OAUTH_STATE = 'test';

async function getNaverToken(code: string) {
  try {
    return await fetch('https://nid.naver.com/oauth2.0/token', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.EXPO_PUBLIC_NAVER_CLIENT_ID!,
        client_secret: process.env.EXPO_PUBLIC_NAVER_CLIENT_SECRET!,
        code: code,
        state: 'test',
      }).toString(),
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          case 401:
            throw new Error('unauthorized');
          case 500:
            throw new Error('Internal Server Error');
        }
      })
      .then((res) => {
        return res.access_token;
      });
  } catch (e) {
    console.error(e);
  }
  return '';
}

export { getNaverToken, NAVER_OAUTH_STATE };
