import { useGLTF } from '@react-three/drei/native';

import Avatar from './avatar/avatar.glb';

import Room1Background from './room1/background.glb';
import Room1Bed from './room1/bed.glb';
import Room1Desk from './room1/desk.glb';
import Room1DrawerBig from './room1/drawer-big.glb';
import Room1DrawerSmall from './room1/drawer-small.glb';
import Room1Dumbbell from './room1/dumbbell.glb';
import Room1Plant from './room1/plant.glb';
import Room1Lamp from './room1/lamp.glb';
import Room1Sofa from './room1/sofa.glb';

type GLTFObject = {
  src: string;
};

const AvatarObject: { [key: string]: GLTFObject } = {
  avatar: {
    src: Avatar,
  },
};

const RoomObjects: { [key: string]: GLTFObject } = {
  room1Background: {
    src: Room1Background,
  },
  room1Bed: {
    src: Room1Bed,
  },
  room1Desk: {
    src: Room1Desk,
  },
  room1DrawerBig: {
    src: Room1DrawerBig,
  },
  room1DrawerSmall: {
    src: Room1DrawerSmall,
  },
  room1Dumbbell: {
    src: Room1Dumbbell,
  },
  room1Plant: {
    src: Room1Plant,
  },
  room1Lamp: {
    src: Room1Lamp,
  },
  room1Sofa: {
    src: Room1Sofa,
  },
};

function preloadGLTFObjects() {
  Object.keys(AvatarObject).forEach((key) => {
    useGLTF.preload(AvatarObject[key].src);
  });

  Object.keys(RoomObjects).forEach((key) => {
    useGLTF.preload(RoomObjects[key].src);
  });
}

// preloadGLTFObjects();

export { AvatarObject, RoomObjects, preloadGLTFObjects, GLTFObject };
