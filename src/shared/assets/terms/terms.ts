const termsRequired: Array<{
  id: number;
  title: string;
  subTitle: string;
}> = [
  {
    id: 1,
    title: '서비스 이용약관',
    subTitle: '서비스 제공을 위해 필요한 약관에 동의해주세요.',
  },
  {
    id: 2,
    title: '개인정보 수집 및 이용동의',
    subTitle: '서비스에 필요한 개인정보 수집에 동의해주세요.',
  },
];

const termsOptional: Array<{
  id: number;
  title: string;
  subTitle: string;
}> = [];

export { termsRequired, termsOptional };
