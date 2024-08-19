import { getUserToken, logError, logInfo, NavProp, setUserToken } from '@/src/shared';

async function fetchAPI({
  method,
  path,
  params,
  body,
  headers,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: object;
  path: string;
  body?: object;
  headers?: object;
  enableAuth?: boolean;
}) {
  //요청
  const url = new URL(`${process.env.EXPO_PUBLIC_DURING_SERVER_URL!}/${path}`);
  logInfo(`http [${method}] ${url}`);
  url.search = new URLSearchParams({ ...params }).toString();

  //토큰 가져오기
  const token = await getUserToken();
  if (token === null) {
    logError('accessToken is null');
    return null;
  }

  //결과
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.accessToken}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    logError(`${url} ${res.status}`);
    return null;
  }

  const resBody: any = await res.json();

  if (resBody.code === undefined) {
    logError(`${url} unknown error`);
    return null;
  }
  if (resBody.code < 0) logError(`${url} ${resBody.code}`);

  switch (resBody.code) {
    case 1:
      if (resBody.result === null) return true;
      return resBody.result;
    case -40:
      //token 만료
      if (!(await refreshTokensAPI())) {
        logError('refresh token failed');
        return null;
      }

      //새토큰 가져오기
      const newToken = await getUserToken();
      if (newToken === null) {
        logError('accessToken is null');
        return null;
      }

      //재요청
      const newRes = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newToken.accessToken}`,
          ...headers,
        },
        body: JSON.stringify(body),
      });
      if (!newRes.ok) {
        logError(`${url} ${newRes.status}`);
        return null;
      } else {
        const newResBody: any = await newRes.json();
        if (newResBody.code === undefined) {
          logError(`${url} unknown error`);
          return null;
        }
        if (newResBody.code === 1) {
          if (newResBody.result === null) return true;
          return newResBody.result;
        } else {
          logError(`${url} ${newResBody.code}`);
          return null;
        }
      }
    default:
      logError(`${url} ${resBody.code}`);
      return null;
  }
}

async function refreshTokensAPI() {
  logInfo(`http [POST] ${process.env.EXPO_PUBLIC_DURING_SERVER_URL!}/api/v0/auth/token/refresh`);

  const token = await getUserToken();
  if (token === null) {
    logError('token is null');
    return false;
  }
  if (token.refreshToken === null) {
    logError('refreshToken is null');
    return false;
  }

  const newToken = await fetch(
    `${process.env.EXPO_PUBLIC_DURING_SERVER_URL!}/api/v0/auth/token/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.refreshToken}`,
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        logError(res.statusText);
        return null;
      }
      return res.json();
    })
    .then((res) => {
      if (res.code === undefined) {
        logError(`refresh token API : unknown error`);
        return null;
      }
      switch (res.code) {
        case 1:
          return {
            accessToken: res.result.tokenInfo.accessToken,
            refreshToken: res.result.tokenInfo.refreshToken,
          };
        case -40:
        //리프레시도 만료된 상황.
        //로직 처리하기
        default:
          logError(`/api/v0/auth/token/refresh ${res.code}`);
          return null;
      }
    });
  if (newToken === null) return false;
  await setUserToken(newToken);
  return true;
}

export { fetchAPI };
