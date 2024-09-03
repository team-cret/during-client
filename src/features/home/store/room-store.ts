import { RoomItem, roomItems } from '@/src/shared';
import THREE from 'three';
import { create } from 'zustand';

type State = {
  background: RoomItem;
  objects: Array<{
    item: RoomItem;
    position: THREE.Vector3;
  }>;
};

const defaultState: State = {
  background: roomItems[0],
  objects: [
    {
      item: roomItems[1],
      position: new THREE.Vector3(0, 0, 0),
    },
    {
      item: roomItems[3],
      position: new THREE.Vector3(7, 0, 5),
    },
  ],
};

type Action = {
  updateRoom: ({
    background,
    objects,
  }: {
    background: RoomItem | null;
    objects: Array<{
      item: RoomItem;
      position: THREE.Vector3;
    }>;
  }) => void;
};

const useRoomStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
  updateRoom: ({ background, objects }) => {
    set((state) => ({
      ...state,
      background: background !== null ? background : state.background,
      objects,
    }));
  },
}));

export { useRoomStore };
