const GOOGLE_OAUTH_SCOPE = 'https://www.googleapis.com/auth/userinfo.email';

async function getGoogleToken(code: string) {
  try {
    return await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        client_id: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!,
        client_secret: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET!,
        redirect_uri: process.env.EXPO_PUBLIC_REDIRECT_URI!,
        grant_type: 'authorization_code',
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

export { getGoogleToken, GOOGLE_OAUTH_SCOPE };
