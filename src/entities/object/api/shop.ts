import { fetchAPI } from '../../auth/api/middleware';

async function getAvatarShopAPI(): Promise<Array<string>> {
  return fetchAPI({
    path: `api/v0/object/shop/avatar`,
    method: 'GET',
  }).then(
    (res: {
      avatarProductInfo: Array<{
        id: number;
        name: string;
        price: number;
        majorCategory: string;
        subCategory: string;
      }>;
    }) => {
      if (res === null) return [];
      return res.avatarProductInfo.map((item) => item.id.toString());
    }
  );
}

async function purchaseAvatarObjectAPI(
  purchaseItems: Array<{
    id: string;
    isSelected: boolean;
  }>
): Promise<boolean> {
  return fetchAPI({
    path: `api/v0/object/shop/avatar`,
    method: 'POST',
    body: {
      products: purchaseItems.map((item) => ({ id: item.id })),
    },
  }).then((res: boolean | null) => {
    if (res === null) return false;
    return true;
  });
}

async function getRoomItemShopAPI(): Promise<Array<string>> {
  return fetchAPI({
    path: `api/v0/object/shop/furniture`,
    method: 'GET',
  }).then(
    (res: {
      furnitureProductInfo: Array<{
        id: number;
        name: string;
        price: number;
        majorCategory: string;
        subCategory: string;
      }>;
    }) => {
      if (res === null) return [];
      return res.furnitureProductInfo.map((item) => item.id.toString());
    }
  );
}

async function purchaseRoomItemAPI(
  purchaseItems: Array<{
    itemId: string;
  }>
): Promise<boolean> {
  return fetchAPI({
    path: `api/v0/object/shop/furniture`,
    method: 'POST',
    body: {
      products: purchaseItems.map((item) => ({ id: item.itemId })),
    },
  }).then((res: boolean | null) => {
    if (res === null) return false;
    return true;
  });
}

export { getAvatarShopAPI, purchaseAvatarObjectAPI, getRoomItemShopAPI, purchaseRoomItemAPI };
