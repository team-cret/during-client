import { StyleSheet, View } from 'react-native';
import { TermBar, TermTotalBar } from './term-bar';
import { convertHeight, convertWidth, HorizontalDivider } from '@/src/shared';
import { useState } from 'react';

const terms: Array<{
  type: 'required' | 'optional';
  title: string;
  subTitle: string;
}> = [
  {
    type: 'required',
    title: '서비스 이용약관',
    subTitle: '서비스 이용약관 부제',
  },
  {
    type: 'required',
    title: '개인정보 수집 및 이용동의',
    subTitle: '개인정보 수집 및 이용동의 부제',
  },
  {
    type: 'optional',
    title: '민감정보 수집동의',
    subTitle: '민감정보 수집동의 부제',
  },
  {
    type: 'optional',
    title: '마케팅 정보 수신',
    subTitle: '마케팅 정보 수신 부제',
  },
];

function TermsOfService() {
  const [termsIsSelected, setTermsIsSelected] = useState<Array<boolean>>(
    Array.from({ length: terms.length }, () => false)
  );

  return (
    <View style={styles.container}>
      <TermTotalBar
        isSelected={termsIsSelected.every((isSelected) => isSelected)}
        radioOnPress={
          termsIsSelected.every((isSelected) => isSelected)
            ? () => setTermsIsSelected(Array.from({ length: terms.length }, () => false))
            : () => setTermsIsSelected(Array.from({ length: terms.length }, () => true))
        }
      />
      <HorizontalDivider
        width={convertWidth(375)}
        height={convertHeight(15)}
        lineHeight={1}
        upperFlex={3}
        lowerFlex={11}
      />
      {terms.map((term, index) => (
        <TermBar
          key={index}
          isSelected={termsIsSelected[index]}
          term={term}
          radioOnPress={() => {
            const newTermsIsSelected = [...termsIsSelected];
            newTermsIsSelected[index] = !termsIsSelected[index];
            setTermsIsSelected(newTermsIsSelected);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: convertHeight(320),

    alignItems: 'center',
  },
});

export { TermsOfService };
