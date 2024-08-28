import { useGLTF } from '@react-three/drei/native';
import Room1Background from './room1/background.glb';
import Room1Desk from './room1/desk.glb';

type RoomObject = {
  [key: string]: {
    src: string;
  };
};

const RoomObject: RoomObject = {
  room1Background: {
    src: Room1Background,
  },
  room1Desk: {
    src: Room1Desk,
  },
};

Object.keys(RoomObject).forEach((obj: string) => {
  useGLTF.preload(RoomObject[obj].src);
});

export { RoomObject };
