import {
  avatarDecorationCategories,
  avatarDecorationCategoriesType,
  AvatarItem,
  RoomItem,
  roomItems,
} from '@/src/shared';
import THREE from 'three';
import { create } from 'zustand';

type State = {
  background: RoomItem;
  objects: Array<{
    item: RoomItem;
    position: THREE.Vector3;
    rotation: number;
  }>;
  isObjectExists: Array<Array<boolean>>;

  myAvatar: {
    style: {
      [key in avatarDecorationCategoriesType]: AvatarItem | null;
    };
    position: THREE.Vector3;
    rotation: number;
    animation: number;
  };
  otherAvatar: {
    style: {
      [key in avatarDecorationCategoriesType]: AvatarItem | null;
    };
    position: THREE.Vector3;
    rotation: number;
    animation: number;
  };
};

const defaultState: State = {
  background: roomItems[0],
  objects: [],
  isObjectExists: Array.from({ length: 12 }, () => Array.from({ length: 12 }, () => false)),
  myAvatar: {
    style: {
      헤어: null,
      상의: null,
      하의: null,
      신발: null,
    },
    position: new THREE.Vector3(-1, -1, -1),
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
    position: new THREE.Vector3(-1, -1, -1),
    rotation: 0,
    animation: 0,
  },
};

type Action = {
  initRoom: () => void;
  updateMyAvatarStyle: ({
    style,
  }: {
    style: {
      [key in avatarDecorationCategoriesType]: AvatarItem | null;
    };
  }) => void;
  updateRoom: ({
    background,
    objects,
  }: {
    background: RoomItem | null;
    objects: Array<{
      item: RoomItem;
      position: THREE.Vector3;
      rotation: number;
    }>;
  }) => void;
  updateMyAvatarPosition: (position: THREE.Vector3) => void;
};

const useRoomStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  initRoom: () => {
    const objects = [
      {
        item: roomItems[1],
        position: new THREE.Vector3(0, 0, 0),
        rotation: 0,
      },
      {
        item: roomItems[3],
        position: new THREE.Vector3(7, 0, 5),
        rotation: 0,
      },
    ];
    const isObjectExists = Array.from({ length: 12 }, () =>
      Array.from({ length: 12 }, () => false)
    );
    for (const object of objects) {
      for (
        let i = 0;
        i < (object.rotation % 2 === 0 ? object.item.size.width : object.item.size.depth);
        i++
      ) {
        for (
          let j = 0;
          j < (object.rotation % 2 === 1 ? object.item.size.width : object.item.size.depth);
          j++
        ) {
          isObjectExists[object.position.z + i][object.position.x + j] = true;
        }
      }
    }

    set({
      ...defaultState,
      objects,
      isObjectExists,
      myAvatar: {
        ...defaultState.myAvatar,
        position: new THREE.Vector3(8, 0, 8),
        rotation: 0,
      },
    });
  },
  updateMyAvatarStyle: ({ style }) => {
    set((state) => ({
      ...state,
      myAvatar: {
        ...state.myAvatar,
        style,
      },
    }));
  },
  updateRoom: ({ background, objects }) => {
    const newIsObjectExists = Array.from({ length: 12 }, () =>
      Array.from({ length: 12 }, () => false)
    );
    for (const object of objects) {
      for (
        let i = 0;
        i < (object.rotation % 2 === 0 ? object.item.size.width : object.item.size.depth);
        i++
      ) {
        for (
          let j = 0;
          j < (object.rotation % 2 === 1 ? object.item.size.width : object.item.size.depth);
          j++
        ) {
          newIsObjectExists[object.position.z + i][object.position.x + j] = true;
        }
      }
    }

    set((state) => ({
      ...state,
      background: background !== null ? background : state.background,
      isObjectExists: newIsObjectExists,
      objects,
      myAvatar: {
        ...state.myAvatar,
        route: [],
      },
      otherAvatar: {
        ...state.otherAvatar,
        route: [],
      },
    }));
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
