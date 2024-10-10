const avatarMotionTypes = ['solo', 'multi', 'object'] as const;

const avatarMotionList = [
  'idle',
  'laugh',
  'angry',
  'love',
  'shy',
  'cheer',
  'hug-me',
  'hi',
  'tired',
  'hug',
  'kiss',
  'pat',
  'eat',
  'labtop',
  'exercise',
  'sleep',
] as const;

type AvatarMotion = {
  name: (typeof avatarMotionList)[number];
  price: number;
  playTime: number;
  category: (typeof avatarMotionTypes)[number];
};

const avatarMotions: {
  [key: string]: AvatarMotion;
} = {
  '1000': {
    name: 'laugh',
    price: 0,
    playTime: 5000,
    category: 'solo',
  },
  '1001': {
    name: 'angry',
    price: 0,
    playTime: 5000,
    category: 'solo',
  },
  '1002': {
    name: 'love',
    price: 0,
    playTime: 5000,
    category: 'solo',
  },
  '1003': {
    name: 'shy',
    price: 0,
    playTime: 5000,
    category: 'solo',
  },
  '1004': {
    name: 'cheer',
    price: 0,
    playTime: 5000,
    category: 'solo',
  },
  '1005': {
    name: 'hug-me',
    price: 0,
    playTime: 5000,
    category: 'solo',
  },
  '1006': {
    name: 'hi',
    price: 0,
    playTime: 5000,
    category: 'solo',
  },
  '1007': {
    name: 'tired',
    price: 0,
    playTime: 5000,
    category: 'solo',
  },
  '2000': {
    name: 'hug',
    price: 0,
    playTime: 5000,
    category: 'multi',
  },
  '2001': {
    name: 'kiss',
    price: 0,
    playTime: 5000,
    category: 'multi',
  },
  '2002': {
    name: 'pat',
    price: 0,
    playTime: 5000,
    category: 'multi',
  },
  '3000': {
    name: 'eat',
    price: 0,
    playTime: 5000,
    category: 'object',
  },
  '3001': {
    name: 'labtop',
    price: 0,
    playTime: 5000,
    category: 'object',
  },
  '3003': {
    name: 'exercise',
    price: 0,
    playTime: 5000,
    category: 'object',
  },
  '3004': {
    name: 'sleep',
    price: 0,
    playTime: 5000,
    category: 'object',
  },
};

export { avatarMotions };
