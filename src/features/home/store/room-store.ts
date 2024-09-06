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
  objects: [
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
  ],
  myAvatar: {
    style: {
      헤어: null,
      상의: null,
      하의: null,
      신발: null,
    },
    position: new THREE.Vector3(8, 0, 7),
    rotation: 0.5,
    animation: 0,
  },
  otherAvatar: {
    style: {
      헤어: null,
      상의: null,
      하의: null,
      신발: null,
    },
    position: new THREE.Vector3(8, 0, 7),
    rotation: 0,
    animation: 0,
  },
};

type Action = {
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
};

const useRoomStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
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
    set((state) => ({
      ...state,
      background: background !== null ? background : state.background,
      objects,
    }));
  },
}));

export { useRoomStore };
