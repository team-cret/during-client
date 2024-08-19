const termsRequired: Array<{
  id: number;
  title: string;
  subTitle: string;
}> = [
  {
    id: 1,
    title: '서비스 이용약관',
    subTitle: '서비스 이용약관 부제',
  },
  {
    id: 2,
    title: '개인정보 수집 및 이용동의',
    subTitle: '개인정보 수집 및 이용동의 부제',
  },
];

const termsOptional: Array<{
  id: number;
  title: string;
  subTitle: string;
}> = [
  {
    id: 3,
    title: '민감정보 수집동의',
    subTitle: '민감정보 수집동의 부제',
  },
  {
    id: 4,
    title: '마케팅 정보 수신',
    subTitle: '마케팅 정보 수신 부제',
  },
];

export { termsRequired, termsOptional };
