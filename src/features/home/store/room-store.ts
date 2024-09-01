import { RoomItem, roomItems } from '@/src/shared';
import { Vector3 } from '@react-three/fiber';
import { create } from 'zustand';

type State = {
  background: RoomItem;
  objects: Array<{
    item: RoomItem;
    position: Vector3;
  }>;
};

const defaultState: State = {
  background: roomItems[0],
  objects: [
    {
      item: roomItems[1],
      position: [0, 0, 0],
    },
    {
      item: roomItems[2],
      position: [7, 0, 5],
    },
  ],
};

type Action = {};

const useRoomStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
}));

export { useRoomStore };
