import { useGLTF } from '@react-three/drei/native';

import Avatar from './avatar/avatar.glb';

import Room1Background from './room1/background.glb';
import Room1Desk from './room1/desk.glb';

type GLTFObject = {
  src: string;
};

const AvatarObject: { [key: string]: GLTFObject } = {
  avatar: {
    src: Avatar,
  },
};

const RoomObject: { [key: string]: GLTFObject } = {
  room1Background: {
    src: Room1Background,
  },
  room1Desk: {
    src: Room1Desk,
  },
};

function preloadGLTFObjects() {
  Object.keys(AvatarObject).forEach((key) => {
    useGLTF.preload(AvatarObject[key].src);
  });

  Object.keys(RoomObject).forEach((key) => {
    useGLTF.preload(RoomObject[key].src);
  });
}

preloadGLTFObjects();

export { AvatarObject, RoomObject, preloadGLTFObjects };
