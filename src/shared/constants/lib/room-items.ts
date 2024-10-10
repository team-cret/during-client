import { ImageSourcePropType } from 'react-native';
import { roomDecorationCategories } from './decoration';
import { GLTFObject, RoomObjects } from '../../assets/models/models';

const roomItemList = [
  '베이지색 배경',
  '노란색 침대',
  '베이지색 책상',
  '큰 베이지색 서랍',
  '작은 베이지색 서랍',
  '베이지색 아령',
  '노란색 3종 액자',
  '둥근 화분',
  '흰색 소파',
  '갈색 스탠드',
  '갈색 창문',
  '회색 배경',
  '회색 침대',
  '갈색 책상',
  '큰 갈색 서랍',
  '작은 갈색 서랍',
  '검정색 아령',
  '검정색 3종 액자',
  '사각 화분',
  '검정색 소파',
  '검정색 스탠드',
  '검정색 블라인드 창문',
  '분홍색 배경',
  '분홍색 침대',
  '분홍색 책상',
  '흰색 큰 서랍',
  '하늘색 자명종 서랍',
  '하늘색 아령',
  '하늘색 3종 액자',
  '베이지색 낮은 책상',
  '분홍색 소파',
  '흰색 스탠드',
  '분홍색 창문',
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
    name: '베이지색 배경',
    price: 15,
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
    name: '노란색 침대',
    price: 25,
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
    name: '베이지색 책상',
    price: 25,
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
    name: '큰 베이지색 서랍',
    price: 20,
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
    name: '작은 베이지색 서랍',
    price: 15,
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
    name: '베이지색 아령',
    price: 10,
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
    name: '노란색 3종 액자',
    price: 15,
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
    name: '둥근 화분',
    price: 10,
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
    name: '흰색 소파',
    price: 20,
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
    name: '갈색 스탠드',
    price: 10,
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
    name: '갈색 창문',
    price: 15,
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
    name: '회색 배경',
    price: 15,
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
    name: '회색 침대',
    price: 25,
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
    name: '갈색 책상',
    price: 25,
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
    name: '큰 갈색 서랍',
    price: 20,
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
    name: '작은 갈색 서랍',
    price: 15,
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
    name: '검정색 아령',
    price: 10,
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
    name: '검정색 3종 액자',
    price: 15,
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
    name: '사각 화분',
    price: 10,
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
    name: '검정색 소파',
    price: 20,
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
    name: '검정색 스탠드',
    price: 10,
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
    name: '검정색 블라인드 창문',
    price: 15,
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
    name: '분홍색 배경',
    price: 15,
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
    name: '분홍색 침대',
    price: 25,
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
    name: '분홍색 책상',
    price: 25,
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
    name: '흰색 큰 서랍',
    price: 20,
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
    name: '하늘색 자명종 서랍',
    price: 15,
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
    name: '하늘색 아령',
    price: 10,
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
    name: '하늘색 3종 액자',
    price: 15,
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
    name: '베이지색 낮은 책상',
    price: 10,
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
    name: '분홍색 소파',
    price: 20,
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
    name: '흰색 스탠드',
    price: 10,
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
    name: '분홍색 창문',
    price: 15,
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
