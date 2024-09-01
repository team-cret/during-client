import { ImageSourcePropType } from 'react-native';
import { avatarDecorationCategories } from './decoration';

const avatarItemList = ['hair1'] as const;

type AvatarItem = {
  id: number;
  name: (typeof avatarItemList)[number];
  price: number;
  image: ImageSourcePropType;
  category: (typeof avatarDecorationCategories)[number];
};

const avatarItems: AvatarItem[] = [
  {
    id: 1,
    name: 'hair1',
    price: 100,
    image: require('@/src/shared/assets/images/room-items/room-1-desk.png'),
    category: '헤어',
  },
];

export { avatarItems, AvatarItem, avatarItemList };
