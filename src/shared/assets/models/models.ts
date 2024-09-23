import { useGLTF } from '@react-three/drei/native';

import Avatar from './avatar/avatar.glb';
import AvatarOther from './avatar/avatar-other.glb';

import Room1Background from './room1/background.glb';
import Room1Bed from './room1/bed.glb';
import Room1Desk from './room1/desk.glb';
import Room1DrawerBig from './room1/drawer-big.glb';
import Room1DrawerSmall from './room1/drawer-small.glb';
import Room1Dumbbell from './room1/dumbbell.glb';
import Room1Frame from './room1/frame.glb';
import Room1Plant from './room1/plant.glb';
import Room1Sofa from './room1/sofa.glb';
import Room1Lamp from './room1/lamp.glb';
import Room1Window from './room1/window.glb';
import Room2Background from './room2/background.glb';
import Room2Bed from './room2/bed.glb';
import Room2Desk from './room2/desk.glb';
import Room2DrawerBig from './room2/drawer-big.glb';
import Room2DrawerSmall from './room2/drawer-small.glb';
import Room2Dumbbell from './room2/dumbbell.glb';
import Room2Frame from './room2/frame.glb';
import Room2Plant from './room2/plant.glb';
import Room2Sofa from './room2/sofa.glb';
import Room2Lamp from './room2/lamp.glb';
import Room2Window from './room2/window.glb';
import Room3Background from './room3/background.glb';
import Room3Bed from './room3/bed.glb';
import Room3Desk from './room3/desk.glb';
import Room3DrawerBig from './room3/drawer-big.glb';
import Room3DrawerSmall from './room3/drawer-small.glb';
import Room3Dumbbell from './room3/dumbbell.glb';
import Room3Frame from './room3/frame.glb';
import Room3DeskSmall from './room3/desk-small.glb';
import Room3Sofa from './room3/sofa.glb';
import Room3Lamp from './room3/lamp.glb';

type GLTFObject = {
  src: string;
};

const AvatarObject: { [key: string]: GLTFObject } = {
  avatar: {
    src: Avatar,
  },
  avatarOther: {
    src: AvatarOther,
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
  room1Frame: {
    src: Room1Frame,
  },
  room1Dumbbell: {
    src: Room1Dumbbell,
  },
  room1Plant: {
    src: Room1Plant,
  },
  room1Sofa: {
    src: Room1Sofa,
  },
  room1Lamp: {
    src: Room1Lamp,
  },
  room1Window: {
    src: Room1Window,
  },
  room2Background: {
    src: Room2Background,
  },
  room2Bed: {
    src: Room2Bed,
  },
  room2Desk: {
    src: Room2Desk,
  },
  room2DrawerBig: {
    src: Room2DrawerBig,
  },
  room2DrawerSmall: {
    src: Room2DrawerSmall,
  },
  room2Frame: {
    src: Room2Frame,
  },
  room2Dumbbell: {
    src: Room2Dumbbell,
  },
  room2Plant: {
    src: Room2Plant,
  },
  room2Sofa: {
    src: Room2Sofa,
  },
  room2Lamp: {
    src: Room2Lamp,
  },
  room2Window: {
    src: Room2Window,
  },
  room3Background: {
    src: Room3Background,
  },
  room3Bed: {
    src: Room3Bed,
  },
  room3Desk: {
    src: Room3Desk,
  },
  room3DrawerBig: {
    src: Room3DrawerBig,
  },
  room3DrawerSmall: {
    src: Room3DrawerSmall,
  },
  room3Frame: {
    src: Room3Frame,
  },
  room3Dumbbell: {
    src: Room3Dumbbell,
  },
  room3DeskSmall: {
    src: Room3DeskSmall,
  },
  room3Lamp: {
    src: Room3Lamp,
  },
  room3Sofa: {
    src: Room3Sofa,
  },
};

function preloadGLTFObjects() {
  // Object.keys(AvatarObject).forEach((key) => {
  //   useGLTF.preload(AvatarObject[key].src);
  // });
  useGLTF.preload(AvatarObject.avatar.src);

  Object.keys(RoomObjects).forEach((key) => {
    useGLTF.preload(RoomObjects[key].src);
  });
}

// preloadGLTFObjects();

export { AvatarObject, RoomObjects, preloadGLTFObjects, GLTFObject };
