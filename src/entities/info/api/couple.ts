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

export { getCoupleProfileInfoAPI };
