const roomDecorationCategories = ['배경', '가구', '소품'] as const;
const avatarDecorationCategories = ['헤어', '상의', '하의', '신발'] as const;
type roomDecorationCategoriesType = (typeof roomDecorationCategories)[number];
type avatarDecorationCategoriesType = (typeof avatarDecorationCategories)[number];

export {
  roomDecorationCategories,
  avatarDecorationCategories,
  roomDecorationCategoriesType,
  avatarDecorationCategoriesType,
};
