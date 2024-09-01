import { ImageSourcePropType } from 'react-native';
import { roomDecorationCategories } from './decoration';

const roomItemList = ['room1Desk'] as const;

type RoomItem = {
  id: number;
  name: (typeof roomItemList)[number];
  price: number;
  image: ImageSourcePropType;
  category: (typeof roomDecorationCategories)[number];
};

const roomItems: RoomItem[] = [
  {
    id: 1,
    name: 'room1Desk',
    price: 100,
    image: require('@/src/shared/assets/images/room-items/room-1-desk.png'),
    category: '가구',
  },
  {
    id: 2,
    name: 'room1Desk',
    price: 100,
    image: require('@/src/shared/assets/images/room-items/room-1-desk.png'),
    category: '가구',
  },
  {
    id: 3,
    name: 'room1Desk',
    price: 100,
    image: require('@/src/shared/assets/images/room-items/room-1-desk.png'),
    category: '가구',
  },
  {
    id: 4,
    name: 'room1Desk',
    price: 100,
    image: require('@/src/shared/assets/images/room-items/room-1-desk.png'),
    category: '가구',
  },
  {
    id: 5,
    name: 'room1Desk',
    price: 100,
    image: require('@/src/shared/assets/images/room-items/room-1-desk.png'),
    category: '가구',
  },
  {
    id: 6,
    name: 'room1Desk',
    price: 100,
    image: require('@/src/shared/assets/images/room-items/room-1-desk.png'),
    category: '가구',
  },
];

export { roomItemList, roomItems, RoomItem };
