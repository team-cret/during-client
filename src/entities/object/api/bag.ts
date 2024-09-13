import { fetchAPI } from '../../auth/api/middleware';

async function getAvatarBagAPI(): Promise<Array<string>> {
  return fetchAPI({
    path: `api/v0/object/bag/avatar`,
    method: 'GET',
  }).then(
    (res: {
      avatarBagInfo: Array<{
        id: number;
        name: string;
        majorCategory: string;
        subCategory: string;
        totalQuantity: number;
        usedQuantity: number;
      }>;
    }) => {
      if (res === null) return [];
      return res.avatarBagInfo.map((item) => item.id.toString());
    }
  );
}

async function getRoomItemBagAPI(): Promise<Array<string>> {
  return fetchAPI({
    path: `api/v0/object/bag/furniture`,
    method: 'GET',
  }).then(
    (res: {
      furnitureBagInfo: Array<{
        id: number;
        name: string;
        majorCategory: string;
        subCategory: string;
        totalQuantity: number;
        usedQuantity: number;
      }>;
    }) => {
      if (res === null) return [];
      return res.furnitureBagInfo.map((item) => item.id.toString());
    }
  );
}

export { getAvatarBagAPI, getRoomItemBagAPI };
