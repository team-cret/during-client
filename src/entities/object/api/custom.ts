import { avatarDecorationCategoriesType, avatarItems, roomItems } from '@/src/shared';
import { fetchAPI } from '../../auth/api/middleware';
import * as THREE from 'three';

async function getRoomInfoAPI(): Promise<{
  id: number;
  name: string;
  thumbnailImageUrl: string;
  background: {
    id: number;
    itemId: string;
  } | null;
  objects: Array<{
    id: number;
    itemId: string;
    position: THREE.Vector3;
    rotation: number;
  }>;
}> {
  return fetchAPI({
    path: `api/v0/object/custom/room`,
    method: 'GET',
  }).then(
    (res: {
      roomInfo: {
        id: number;
        name: string;
        thumbnailImageUrl: string;
        arrangements: Array<{
          id: number;
          productId: number;
          majorCategory: string;
          subCategory: string;
          x: number;
          y: number;
          z: number;
          rotate: number;
        }>;
      };
    }) => {
      if (res === null)
        return {
          id: 0,
          name: '',
          thumbnailImageUrl: '',
          background: null,
          objects: [],
        };

      const objects = res.roomInfo.arrangements.map((object) => ({
        id: object.id,
        itemId: object.productId.toString(),
        position: new THREE.Vector3(object.x, object.y, object.z),
        rotation: object.rotate,
      }));
      const background =
        objects.find((object) => roomItems[object.itemId].category === '배경') ?? null;
      return {
        id: res.roomInfo.id,
        name: res.roomInfo.name,
        thumbnailImageUrl: res.roomInfo.thumbnailImageUrl,
        background: background,
        objects: objects.filter((object) => roomItems[object.itemId].category !== '배경'),
      };
    }
  );
}

async function updateRoomInfoAPI({
  roomId,
  name,
  thumbnailImageUrl,
  addedObjects,
  updatedObjects,
  removedObjects,
}: {
  roomId: number;
  name: string;
  thumbnailImageUrl: string;
  addedObjects: Array<{
    itemId: string;
    position: THREE.Vector3;
    rotation: number;
  }>;
  updatedObjects: Array<{
    id: number;
    position: THREE.Vector3;
    rotation: number;
  }>;
  removedObjects: Array<{
    id: number;
    itemId: string;
  }>;
}): Promise<boolean> {
  return fetchAPI({
    path: `api/v0/object/custom/room`,
    method: 'PUT',
    body: {
      roomId,
      name,
      thumbnailImageUrl,
      addProducts: addedObjects.map((object) => ({
        id: Number(object.itemId),
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
        rotate: object.rotation,
      })),
      updateArrangements: updatedObjects.map((object) => ({
        id: object.id,
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
        rotate: object.rotation,
      })),
      removeArrangements: removedObjects.map((object) => ({
        id: object.id,
        productId: Number(object.itemId),
      })),
    },
  }).then((res: boolean) => {
    return res ?? false;
  });
}

async function getAvatarStyleAPI(): Promise<{
  myAvatarStyle: {
    style: {
      [key in avatarDecorationCategoriesType]: string | null;
    };
    position: THREE.Vector3;
  } | null;
  otherAvatarStyle: {
    style: {
      [key in avatarDecorationCategoriesType]: string | null;
    };
    position: THREE.Vector3;
  } | null;
}> {
  return fetchAPI({
    path: `api/v0/object/custom/avatar`,
    method: 'GET',
  }).then(
    (res: {
      avatarInfo: {
        myAvatarInfo: {
          id: number;
          memberId: string;
          x: number;
          y: number;
          z: number;
          products: Array<{
            id: number;
            majorCategory: string;
            subCategory: string;
          }>;
        };
        otherAvatarInfo: Array<{
          id: number;
          memberId: string;
          x: number;
          y: number;
          z: number;
          products: Array<{
            id: number;
            majorCategory: string;
            subCategory: string;
          }>;
        }>;
      };
    }) => {
      if (res === null)
        return {
          myAvatarStyle: null,
          otherAvatarStyle: null,
        };
      const myAvatarStyle = {
        style: {
          헤어: '',
          상의: '',
          하의: '',
          신발: '',
        },
        position: new THREE.Vector3(
          res.avatarInfo.myAvatarInfo.x,
          res.avatarInfo.myAvatarInfo.y,
          res.avatarInfo.myAvatarInfo.z
        ),
      };
      res.avatarInfo.myAvatarInfo.products.forEach((product) => {
        myAvatarStyle.style[avatarItems[product.id.toString()].category] = product.id.toString();
      });
      const otherAvatarStyle = {
        style: {
          헤어: '',
          상의: '',
          하의: '',
          신발: '',
        },
        position: new THREE.Vector3(
          res.avatarInfo.otherAvatarInfo[0].x,
          res.avatarInfo.otherAvatarInfo[0].y,
          res.avatarInfo.otherAvatarInfo[0].z
        ),
      };
      res.avatarInfo.otherAvatarInfo[0].products.forEach((product) => {
        otherAvatarStyle.style[avatarItems[product.id.toString()].category] = product.id.toString();
      });

      return {
        myAvatarStyle: myAvatarStyle,
        otherAvatarStyle: otherAvatarStyle,
      };
    }
  );
}

async function updateAvatarStyleAPI({
  addProducts,
  removeProducts,
}: {
  addProducts: Array<{ id: string }>;
  removeProducts: Array<{ id: string }>;
}): Promise<boolean> {
  return fetchAPI({
    path: `api/v0/object/custom/avatar`,
    method: 'PUT',
    body: {
      addProducts: addProducts.map((product) => ({ id: Number(product.id) })),
      removeProducts: removeProducts.map((product) => ({ id: Number(product.id) })),
    },
  }).then((res: boolean) => {
    return res ?? false;
  });
}

export { getRoomInfoAPI, updateRoomInfoAPI, getAvatarStyleAPI, updateAvatarStyleAPI };
