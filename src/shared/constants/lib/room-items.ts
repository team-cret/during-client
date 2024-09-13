import { ImageSourcePropType } from 'react-native';
import { roomDecorationCategories } from './decoration';
import { GLTFObject, RoomObjects } from '../../assets/models/models';

const roomItemList = [
  'room1Background',
  'room1Bed',
  'room1Desk',
  'room1DrawerBig',
  'room1DrawerSmall',
  'room1Dumbbell',
  'room1Frame',
  'room1Plant',
  'room1Sofa',
  'room1Lamp',
  'room1Window',
  'room2Background',
  'room2Bed',
  'room2Desk',
  'room2DrawerBig',
  'room2DrawerSmall',
  'room2Dumbbell',
  'room2Frame',
  'room2Plant',
  'room2Sofa',
  'room2Lamp',
  'room2Window',
  'room3Background',
  'room3Bed',
  'room3Desk',
  'room3DrawerBig',
  'room3DrawerSmall',
  'room3Dumbbell',
  'room3Frame',
  'room3DeskSmall',
  'room3Sofa',
  'room3Lamp',
  'room3Window',
] as const;

type RoomItem = {
  name: (typeof roomItemList)[number];
  price: number;
  object: GLTFObject;
  image: ImageSourcePropType;
  category: (typeof roomDecorationCategories)[number];
  size: {
    width: number;
    depth: number;
    height: number;
  };
};

const roomItems: { [key: string]: RoomItem } = {
  '1': {
    name: 'room1Background',
    price: 0,
    object: RoomObjects.room1Background,
    image: require('@/src/shared/assets/images/room-items/room-1-background.png'),
    category: '배경',
    size: {
      width: 12,
      depth: 12,
      height: 12,
    },
  },
  '2': {
    name: 'room1Bed',
    price: 0,
    object: RoomObjects.room1Bed,
    image: require('@/src/shared/assets/images/room-items/room-1-bed.png'),
    category: '가구',
    size: {
      width: 6,
      depth: 7,
      height: 3,
    },
  },
  '3': {
    name: 'room1Desk',
    price: 0,
    object: RoomObjects.room1Desk,
    image: require('@/src/shared/assets/images/room-items/room-1-desk.png'),
    category: '가구',
    size: {
      width: 4,
      depth: 5,
      height: 4,
    },
  },
  '4': {
    name: 'room1DrawerBig',
    price: 0,
    object: RoomObjects.room1DrawerBig,
    image: require('@/src/shared/assets/images/room-items/room-1-drawer-big.png'),
    category: '가구',
    size: {
      width: 2,
      depth: 2,
      height: 3,
    },
  },
  '5': {
    name: 'room1DrawerSmall',
    price: 0,
    object: RoomObjects.room1DrawerSmall,
    image: require('@/src/shared/assets/images/room-items/room-1-drawer-small.png'),
    category: '가구',
    size: {
      width: 1,
      depth: 2,
      height: 3,
    },
  },
  '6': {
    name: 'room1Dumbbell',
    price: 0,
    object: RoomObjects.room1Dumbbell,
    image: require('@/src/shared/assets/images/room-items/room-1-dumbbell.png'),
    category: '가구',
    size: {
      width: 1,
      depth: 1,
      height: 1,
    },
  },
  '7': {
    name: 'room1Frame',
    price: 0,
    object: RoomObjects.room1Frame,
    image: require('@/src/shared/assets/images/room-items/room-1-frame.png'),
    category: '장식',
    size: {
      width: 7,
      depth: 1,
      height: 4,
    },
  },
  '8': {
    name: 'room1Plant',
    price: 0,
    object: RoomObjects.room1Plant,
    image: require('@/src/shared/assets/images/room-items/room-1-plant.png'),
    category: '가구',
    size: {
      width: 3,
      depth: 3,
      height: 3,
    },
  },
  '9': {
    name: 'room1Sofa',
    price: 0,
    object: RoomObjects.room1Sofa,
    image: require('@/src/shared/assets/images/room-items/room-1-sofa.png'),
    category: '가구',
    size: {
      width: 6,
      depth: 3,
      height: 3,
    },
  },
  '10': {
    name: 'room1Lamp',
    price: 0,
    object: RoomObjects.room1Lamp,
    image: require('@/src/shared/assets/images/room-items/room-1-lamp.png'),
    category: '가구',
    size: {
      width: 2,
      depth: 2,
      height: 6,
    },
  },
  '11': {
    name: 'room1Window',
    price: 0,
    object: RoomObjects.room1Window,
    image: require('@/src/shared/assets/images/room-items/room-1-window.png'),
    category: '장식',
    size: {
      width: 5,
      depth: 1,
      height: 6,
    },
  },
  '12': {
    name: 'room2Background',
    price: 0,
    object: RoomObjects.room2Background,
    image: require('@/src/shared/assets/images/room-items/room-2-background.png'),
    category: '배경',
    size: {
      width: 12,
      depth: 12,
      height: 12,
    },
  },
  '13': {
    name: 'room2Bed',
    price: 0,
    object: RoomObjects.room2Bed,
    image: require('@/src/shared/assets/images/room-items/room-2-bed.png'),
    category: '가구',
    size: {
      width: 6,
      depth: 7,
      height: 3,
    },
  },
  '14': {
    name: 'room2Desk',
    price: 0,
    object: RoomObjects.room2Desk,
    image: require('@/src/shared/assets/images/room-items/room-2-desk.png'),
    category: '가구',
    size: {
      width: 4,
      depth: 5,
      height: 4,
    },
  },
  '15': {
    name: 'room2DrawerBig',
    price: 0,
    object: RoomObjects.room2DrawerBig,
    image: require('@/src/shared/assets/images/room-items/room-2-drawer-big.png'),
    category: '가구',
    size: {
      width: 2,
      depth: 2,
      height: 3,
    },
  },
  '16': {
    name: 'room2DrawerSmall',
    price: 0,
    object: RoomObjects.room2DrawerSmall,
    image: require('@/src/shared/assets/images/room-items/room-2-drawer-small.png'),
    category: '가구',
    size: {
      width: 1,
      depth: 2,
      height: 3,
    },
  },
  '17': {
    name: 'room2Dumbbell',
    price: 0,
    object: RoomObjects.room2Dumbbell,
    image: require('@/src/shared/assets/images/room-items/room-2-dumbbell.png'),
    category: '가구',
    size: {
      width: 1,
      depth: 1,
      height: 1,
    },
  },
  '18': {
    name: 'room2Frame',
    price: 0,
    object: RoomObjects.room2Frame,
    image: require('@/src/shared/assets/images/room-items/room-2-frame.png'),
    category: '장식',
    size: {
      width: 5,
      depth: 1,
      height: 4,
    },
  },
  '19': {
    name: 'room2Plant',
    price: 0,
    object: RoomObjects.room2Plant,
    image: require('@/src/shared/assets/images/room-items/room-2-plant.png'),
    category: '가구',
    size: {
      width: 1,
      depth: 1,
      height: 2,
    },
  },
  '20': {
    name: 'room2Sofa',
    price: 0,
    object: RoomObjects.room2Sofa,
    image: require('@/src/shared/assets/images/room-items/room-2-sofa.png'),
    category: '가구',
    size: {
      width: 6,
      depth: 3,
      height: 3,
    },
  },
  '21': {
    name: 'room2Lamp',
    price: 0,
    object: RoomObjects.room2Lamp,
    image: require('@/src/shared/assets/images/room-items/room-2-lamp.png'),
    category: '가구',
    size: {
      width: 2,
      depth: 3,
      height: 6,
    },
  },
  '22': {
    name: 'room2Window',
    price: 0,
    object: RoomObjects.room2Window,
    image: require('@/src/shared/assets/images/room-items/room-2-window.png'),
    category: '장식',
    size: {
      width: 7,
      depth: 1,
      height: 7,
    },
  },
  '23': {
    name: 'room3Background',
    price: 0,
    object: RoomObjects.room3Background,
    image: require('@/src/shared/assets/images/room-items/room-3-background.png'),
    category: '배경',
    size: {
      width: 12,
      depth: 12,
      height: 12,
    },
  },
  '24': {
    name: 'room3Bed',
    price: 0,
    object: RoomObjects.room3Bed,
    image: require('@/src/shared/assets/images/room-items/room-3-bed.png'),
    category: '가구',
    size: {
      width: 6,
      depth: 7,
      height: 3,
    },
  },
  '25': {
    name: 'room3Desk',
    price: 0,
    object: RoomObjects.room3Desk,
    image: require('@/src/shared/assets/images/room-items/room-3-desk.png'),
    category: '가구',
    size: {
      width: 4,
      depth: 5,
      height: 4,
    },
  },
  '26': {
    name: 'room3DrawerBig',
    price: 0,
    object: RoomObjects.room3DrawerBig,
    image: require('@/src/shared/assets/images/room-items/room-3-drawer-big.png'),
    category: '가구',
    size: {
      width: 2,
      depth: 2,
      height: 3,
    },
  },
  '27': {
    name: 'room3DrawerSmall',
    price: 0,
    object: RoomObjects.room3DrawerSmall,
    image: require('@/src/shared/assets/images/room-items/room-3-drawer-small.png'),
    category: '가구',
    size: {
      width: 1,
      depth: 2,
      height: 3,
    },
  },
  '28': {
    name: 'room3Dumbbell',
    price: 0,
    object: RoomObjects.room3Dumbbell,
    image: require('@/src/shared/assets/images/room-items/room-3-dumbbell.png'),
    category: '가구',
    size: {
      width: 1,
      depth: 1,
      height: 1,
    },
  },
  '29': {
    name: 'room3Frame',
    price: 0,
    object: RoomObjects.room3Frame,
    image: require('@/src/shared/assets/images/room-items/room-3-frame.png'),
    category: '장식',
    size: {
      width: 9,
      depth: 1,
      height: 4,
    },
  },
  '30': {
    name: 'room3DeskSmall',
    price: 0,
    object: RoomObjects.room3DeskSmall,
    image: require('@/src/shared/assets/images/room-items/room-3-desk-small.png'),
    category: '가구',
    size: {
      width: 4,
      depth: 3,
      height: 2,
    },
  },
  '31': {
    name: 'room3Sofa',
    price: 0,
    object: RoomObjects.room3Sofa,
    image: require('@/src/shared/assets/images/room-items/room-3-sofa.png'),
    category: '가구',
    size: {
      width: 6,
      depth: 3,
      height: 3,
    },
  },
  '32': {
    name: 'room3Lamp',
    price: 0,
    object: RoomObjects.room3Lamp,
    image: require('@/src/shared/assets/images/room-items/room-3-lamp.png'),
    category: '가구',
    size: {
      width: 2,
      depth: 2,
      height: 5,
    },
  },
  '33': {
    name: 'room3Window',
    price: 0,
    object: RoomObjects.room3Window,
    image: require('@/src/shared/assets/images/room-items/room-3-window.png'),
    category: '장식',
    size: {
      width: 7,
      depth: 1,
      height: 6,
    },
  },
};

export { roomItems, RoomItem };
