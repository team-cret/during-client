const avatarMotionTypes = ['solo', 'multi', 'object'] as const;

const avatarMotionList = [
  'idle',
  'laugh',
  'angry',
  'love-you',
  'shy',
  'cheer-up',
  'hug-me',
  'waving',
  'tired',
  'hug',
  'kiss',
  'pat',
  'be-patted',
  'eat',
  'study',
  'exercise',
  'sleep',
  'sleep-left',
  'sleep-right',
] as const;

type AvatarMotion = {
  id: number;
  name: (typeof avatarMotionList)[number];
  price: number;
  category: (typeof avatarMotionTypes)[number];
};
