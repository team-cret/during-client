import {
  getAvatarStyleAPI,
  getRoomInfoAPI,
  updateAvatarPosition,
  updateAvatarStyleAPI,
  updateRoomInfoAPI,
} from '@/src/entities';
import {
  avatarDecorationCategories,
  avatarDecorationCategoriesType,
  roomItems,
} from '@/src/shared';
import * as THREE from 'three';
import { create } from 'zustand';

type State = {
  id: number;
  name: string;
  thumbnailImageUrl: string;
  background: {
    id: number | null;
    itemId: string;
  };
  objects: Array<{
    id: number;
    itemId: string;
    position: THREE.Vector3;
    rotation: number;
  }>;
  isObjectExists: Array<Array<boolean>>;

  myAvatar: {
    style: {
      [key in avatarDecorationCategoriesType]: string | null;
    };
    position: THREE.Vector3;
    rotation: number;
    animation: string | null;
  };
  otherAvatar: {
    style: {
      [key in avatarDecorationCategoriesType]: string | null;
    };
    position: THREE.Vector3;
    rotation: number;
    animation: string | null;
  };
};

const defaultState: State = {
  id: 0,
  name: '',
  thumbnailImageUrl: '',
  background: {
    id: 0,
    itemId: '1',
  },
  objects: [],
  isObjectExists: Array.from({ length: 12 }, () => Array.from({ length: 12 }, () => false)),
  myAvatar: {
    style: {
      헤어: null,
      상의: null,
      하의: null,
      신발: null,
    },
    position: new THREE.Vector3(0, 0, 0),
    rotation: 0,
    animation: null,
  },
  otherAvatar: {
    style: {
      헤어: null,
      상의: null,
      하의: null,
      신발: null,
    },
    position: new THREE.Vector3(-2, -2, -2),
    rotation: 0,
    animation: null,
  },
};

type Action = {
  initRoom: ({ userRole }: { userRole: 'ROLE_SINGLE' | 'ROLE_COUPLE' | null }) => Promise<void>;
  updateMyAvatarStyle: ({
    style,
    userRole,
  }: {
    style: {
      [key in avatarDecorationCategoriesType]: string | null;
    };
    userRole: 'ROLE_SINGLE' | 'ROLE_COUPLE' | null;
  }) => void;
  setMotion: (isMyInfo: boolean, motionId: string | null) => void;
  updateRoom: ({
    background,
    objects,
    userRole,
  }: {
    background: {
      id: number | null;
      itemId: string;
    } | null;
    objects: Array<{
      id: number | null;
      itemId: string;
      position: THREE.Vector3;
      rotation: number;
    }> | null;
    userRole: 'ROLE_SINGLE' | 'ROLE_COUPLE' | null;
  }) => void;
  updateMyAvatarPosition: ({
    position,
    userRole,
  }: {
    position: THREE.Vector3;
    userRole: 'ROLE_SINGLE' | 'ROLE_COUPLE' | null;
  }) => void;

  //API 콜이 아닌, 내부 상태만 변경하는 메서드들
  moveAvatar: (isMyInfo: boolean, position: THREE.Vector3) => void;
};

const useRoomStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  initRoom: async ({ userRole }) => {
    if (userRole === 'ROLE_SINGLE') {
      return;
    }

    const { id, name, thumbnailImageUrl, background, objects } = await getRoomInfoAPI();

    const isObjectExists = Array.from({ length: 12 }, () =>
      Array.from({ length: 12 }, () => false)
    );

    for (const object of objects) {
      for (
        let i = 0;
        i <
        (object.rotation % 2 === 0
          ? roomItems[object.itemId].size.width
          : roomItems[object.itemId].size.depth);
        i++
      ) {
        for (
          let j = 0;
          j <
          (object.rotation % 2 === 1
            ? roomItems[object.itemId].size.width
            : roomItems[object.itemId].size.depth);
          j++
        ) {
          isObjectExists[Math.min(11, object.position.z + i)][Math.min(11, object.position.x + j)] =
            true;
        }
      }
    }

    const { myAvatarStyle, otherAvatarStyle } = await getAvatarStyleAPI();
    set({
      ...defaultState,
      id,
      name,
      thumbnailImageUrl,
      background: background ?? defaultState.background,
      objects,
      isObjectExists,
      myAvatar: {
        ...defaultState.myAvatar,
        style: myAvatarStyle
          ? {
              상의: myAvatarStyle.style['상의'] !== '' ? myAvatarStyle.style['상의'] : null,
              하의: myAvatarStyle.style['하의'] !== '' ? myAvatarStyle.style['하의'] : null,
              신발: myAvatarStyle.style['신발'] !== '' ? myAvatarStyle.style['신발'] : null,
              헤어: myAvatarStyle.style['헤어'] !== '' ? myAvatarStyle.style['헤어'] : null,
            }
          : defaultState.myAvatar.style,
        position: myAvatarStyle ? myAvatarStyle.position : defaultState.myAvatar.position,
      },
      otherAvatar: {
        ...defaultState.otherAvatar,
        style: otherAvatarStyle
          ? {
              상의: otherAvatarStyle.style['상의'] !== '' ? otherAvatarStyle.style['상의'] : null,
              하의: otherAvatarStyle.style['하의'] !== '' ? otherAvatarStyle.style['하의'] : null,
              신발: otherAvatarStyle.style['신발'] !== '' ? otherAvatarStyle.style['신발'] : null,
              헤어: otherAvatarStyle.style['헤어'] !== '' ? otherAvatarStyle.style['헤어'] : null,
            }
          : defaultState.otherAvatar.style,
        position: otherAvatarStyle ? otherAvatarStyle.position : defaultState.otherAvatar.position,
      },
    });
  },
  updateMyAvatarStyle: ({ style, userRole }) => {
    if (userRole === 'ROLE_SINGLE') {
      set((state) => ({
        ...state,
        myAvatar: {
          ...state.myAvatar,
          style: {
            ...style,
          },
        },
      }));
      return;
    }

    const addedProducts = [];
    const removedProduct = [];

    for (const category of avatarDecorationCategories) {
      if (get().myAvatar.style[category] === style[category]) continue;
      if (get().myAvatar.style[category] !== null)
        removedProduct.push({ id: get().myAvatar.style[category]! });
      if (style[category] !== null) addedProducts.push({ id: style[category] });
    }
    updateAvatarStyleAPI({ addProducts: addedProducts, removeProducts: removedProduct });
  },
  setMotion: (isMyInfo, motionId) => {
    set((state) => ({
      ...state,
      [isMyInfo ? 'myAvatar' : 'otherAvatar']: {
        ...state[isMyInfo ? 'myAvatar' : 'otherAvatar'],
        animation: motionId,
      },
    }));
  },
  updateRoom: ({ background, objects, userRole }) => {
    if (userRole === 'ROLE_SINGLE') {
      set((state) => ({
        ...state,
        background: background ?? state.background,
        objects: objects
          ? objects.map((object, idx) => {
              return {
                ...object,
                id: idx,
              };
            })
          : state.objects,
      }));

      return;
    }

    const addedObjects: Array<{
      itemId: string;
      position: THREE.Vector3;
      rotation: number;
    }> = [];
    const updatedObjects: Array<{
      id: number;
      position: THREE.Vector3;
      rotation: number;
    }> = [];
    const removedObjects: Array<{
      id: number;
      itemId: string;
    }> = [];

    if (background !== null && background.id === null) {
      addedObjects.push({
        itemId: background.itemId,
        position: new THREE.Vector3(0, 0, 0),
        rotation: 0,
      });
      if (get().background.id)
        removedObjects.push({ id: get().background.id!, itemId: get().background.itemId });
    }

    if (objects !== null) {
      for (const object of objects) {
        if (object.id === null)
          addedObjects.push({
            itemId: object.itemId,
            position: object.position,
            rotation: object.rotation,
          });
        else
          updatedObjects.push({
            id: object.id,
            position: object.position,
            rotation: object.rotation,
          });
      }
      for (const object of get().objects) {
        if (!objects.find((o) => o.id === object.id))
          removedObjects.push({ id: object.id, itemId: object.itemId });
      }
    }

    updateRoomInfoAPI({
      roomId: get().id,
      name: get().name,
      thumbnailImageUrl: get().thumbnailImageUrl,
      addedObjects,
      updatedObjects,
      removedObjects,
    });
  },
  updateMyAvatarPosition: ({ position, userRole }) => {
    if (userRole === 'ROLE_SINGLE') {
      console.log(position);
      position = new THREE.Vector3(Math.floor(position.x), 0, Math.floor(position.z));
      set((state) => ({
        ...state,
        myAvatar: {
          ...state.myAvatar,
          position,
        },
      }));
      return;
    }
    updateAvatarPosition({ x: position.x, y: position.y, z: position.z });
  },

  moveAvatar: (isMyInfo, position) => {
    position = new THREE.Vector3(position.x, 0, position.z);

    set((state) => ({
      ...state,
      [isMyInfo ? 'myAvatar' : 'otherAvatar']: {
        ...state[isMyInfo ? 'myAvatar' : 'otherAvatar'],
        position,
      },
    }));
  },
}));

export { useRoomStore };
