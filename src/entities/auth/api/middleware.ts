import { getUserToken, logError, logInfo, NavProp, setUserToken } from '@/src/shared';
import { DURING_SERVER_URL } from '@env';
import { useNavigation } from 'expo-router';

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
  //토큰 가져오기
  const token = await getUserToken();
  if (token === null) {
    logError('token is null');
    return null;
  }
  if (token.accessToken === null) {
    logError('accessToken is null');
    return null;
  }

  //요청
  const url = new URL(`${DURING_SERVER_URL}/${path}`);
  url.search = new URLSearchParams({ ...params }).toString();
  logInfo(`http [${method}] ${url}`);

  const fetchConfig = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.accessToken}`,
      ...headers,
    },
    body: JSON.stringify(body),
  };

  //결과
  const res = await fetch(url, fetchConfig);

  if (!res.ok) {
    logError(`${url} ${res.status}`);
    return null;
  }

  const resBody: any = await res.json();

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

      //재요청
      const newRes = await fetch(url, fetchConfig);
      if (!newRes.ok) {
        logError(`${url} ${newRes.status}`);
        return null;
      } else {
        const newResBody: any = await newRes.json();
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
  const token = await getUserToken();
  if (token === null) {
    logError('token is null');
    return null;
  }
  if (token.refreshToken === null) {
    logError('refreshToken is null');
    return null;
  }

  return await fetch(`${DURING_SERVER_URL}/api/v0/auth/token/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.refreshToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        logError(res.statusText);
        return null;
      }
      return res.json();
    })
    .then((res) => {
      switch (res.code) {
        case 1:
          setUserToken({
            accessToken: res.tokenInfo.accessToken,
            refreshToken: res.tokenInfo.refreshToken,
          });
          return true;
        case -40:
        //리프레시도 만료된 상황.
        //로직 처리하기
        default:
          logError(res.code);
          return null;
      }
    });
}

export { fetchAPI };
