import { ImageSourcePropType } from 'react-native';
import { roomDecorationCategories } from './decoration';
import { GLTFObject, RoomObjects } from '../../assets/models/models';

const roomItemList = [
  'room1Background',
  'room1Bed',
  'room1Desk',
  'room1DrawerBig',
  'room1DrawerSmall',
  'room1Lamp',
  'room1Sofa',
] as const;

type RoomItem = {
  id: number;
  name: (typeof roomItemList)[number];
  price: number;
  object: GLTFObject;
  image: ImageSourcePropType;
  category: (typeof roomDecorationCategories)[number];
};

const roomItems: RoomItem[] = [
  {
    id: 1,
    name: 'room1Background',
    price: 100,
    object: RoomObjects.room1Background,
    image: require('@/src/shared/assets/images/room-items/room-1-background.png'),
    category: '배경',
  },
  {
    id: 2,
    name: 'room1Bed',
    price: 100,
    object: RoomObjects.room1Bed,
    image: require('@/src/shared/assets/images/room-items/room-1-bed.png'),
    category: '가구',
  },
  {
    id: 3,
    name: 'room1Desk',
    price: 100,
    object: RoomObjects.room1Desk,
    image: require('@/src/shared/assets/images/room-items/room-1-desk.png'),
    category: '가구',
  },
  {
    id: 4,
    name: 'room1DrawerBig',
    price: 100,
    object: RoomObjects.room1DrawerBig,
    image: require('@/src/shared/assets/images/room-items/room-1-drawer-big.png'),
    category: '가구',
  },
  {
    id: 5,
    name: 'room1DrawerSmall',
    price: 100,
    object: RoomObjects.room1DrawerSmall,
    image: require('@/src/shared/assets/images/room-items/room-1-drawer-small.png'),
    category: '가구',
  },
  {
    id: 6,
    name: 'room1Lamp',
    price: 100,
    object: RoomObjects.room1Lamp,
    image: require('@/src/shared/assets/images/room-items/room-1-lamp.png'),
    category: '가구',
  },
  {
    id: 7,
    name: 'room1Sofa',
    price: 100,
    object: RoomObjects.room1Sofa,
    image: require('@/src/shared/assets/images/room-items/room-1-sofa.png'),
    category: '가구',
  },
];

export { roomItemList, roomItems, RoomItem };
