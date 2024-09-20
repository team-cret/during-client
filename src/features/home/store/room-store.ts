import {
  getAvatarStyleAPI,
  getRoomInfoAPI,
  updateAvatarStyleAPI,
  updateRoomInfoAPI,
} from '@/src/entities';
import {
  avatarDecorationCategories,
  avatarDecorationCategoriesType,
  roomItems,
} from '@/src/shared';
import THREE from 'three';
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
    animation: number;
  };
  otherAvatar: {
    style: {
      [key in avatarDecorationCategoriesType]: string | null;
    };
    position: THREE.Vector3;
    rotation: number;
    animation: number;
  };
};

const defaultState: State = {
  id: 0,
  name: '',
  thumbnailImageUrl: '',
  background: {
    id: null,
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
    position: new THREE.Vector3(-2, -2, -2),
    rotation: 0,
    animation: 0,
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
    animation: 0,
  },
};

type Action = {
  initRoom: () => Promise<void>;
  updateMyAvatarStyle: ({
    style,
  }: {
    style: {
      [key in avatarDecorationCategoriesType]: string | null;
    };
  }) => void;
  updateRoom: ({
    background,
    objects,
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
  }) => void;
  updateMyAvatarPosition: (position: THREE.Vector3) => void;
};

const useRoomStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  initRoom: async () => {
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
          isObjectExists[object.position.z + i][object.position.x + j] = true;
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
        position: (myAvatarStyle ?? defaultState.myAvatar).position,
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
        position: (otherAvatarStyle ?? defaultState.otherAvatar).position,
      },
    });
  },
  updateMyAvatarStyle: ({ style }) => {
    const addedProducts = [];
    const removedProduct = [];

    for (const category of avatarDecorationCategories) {
      if (style[category] !== null && get().myAvatar.style[category] !== style[category])
        addedProducts.push({ id: style[category]! });
      else if (
        get().myAvatar.style[category] !== null &&
        get().myAvatar.style[category] !== style[category]
      )
        removedProduct.push({ id: get().myAvatar.style[category]! });
    }
    updateAvatarStyleAPI({ addProducts: addedProducts, removeProducts: removedProduct }).then(
      () => {
        get().initRoom();
      }
    );
  },
  updateRoom: ({ background, objects }) => {
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
    }).then(() => {
      get().initRoom();
    });
  },
  updateMyAvatarPosition: (position) => {
    position = new THREE.Vector3(
      Math.min(Math.floor(position.x), 11),
      0,
      Math.min(Math.floor(position.z), 11)
    );

    set((state) => ({
      ...state,
      myAvatar: {
        ...state.myAvatar,
        position,
      },
    }));
  },
}));

export { useRoomStore };
