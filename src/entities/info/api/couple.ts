import { fetchAPI } from '../../auth/api/middleware';

async function getCoupleProfileInfoAPI() {
  return fetchAPI({
    method: 'GET',
    path: 'api/v0/info/couple',
  }).then((res) => {
    if (res === null) return null;
    return res.coupleInfo;
  });
}

async function disconnectCoupleAPI(): Promise<boolean> {
  return fetchAPI({
    method: 'DELETE',
    path: 'api/v0/info/couple',
  }).then((res) => {
    return res ?? false;
  });
}

export { getCoupleProfileInfoAPI, disconnectCoupleAPI };
