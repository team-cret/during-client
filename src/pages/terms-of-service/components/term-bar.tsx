import {
  COLOR_BASE_1,
  RadioButton,
  COLOR_PRIMARY_GREEN_DARK,
  COLOR_BASE_2,
  HorizontalSizedBox,
  convertWidth,
  convertHeight,
} from '@/src/shared';
import { Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import NavigateIcon from '@/src/shared/assets/icons/navigation/navigate.svg';

function TermTotalBar({
  isSelected,
  radioOnPress,
}: {
  isSelected: boolean;
  radioOnPress: () => void;
}) {
  return (
    <View style={stylesTermTotalBar.container}>
      <Text style={stylesTermTotalBar.title}>약관 전체동의</Text>
      <RadioButton onPress={radioOnPress} isSelected={isSelected} />
    </View>
  );
}

const stylesTermTotalBar = StyleSheet.create({
  container: {
    width: convertWidth(327),
    height: convertHeight(44),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },
});

function TermBar({
  isSelected,
  term,
  radioOnPress,
}: {
  isSelected: boolean;
  term: {
    type: 'required' | 'optional';
    title: string;
    subTitle: string;
  };
  radioOnPress: () => void;
}) {
  return (
    <View style={stylesTermBar.container}>
      {term.type === 'required' ? (
        <Text style={stylesTermBar.TextRequired}>필수</Text>
      ) : (
        <Text style={stylesTermBar.TextOption}>선택</Text>
      )}
      <View style={stylesTermBar.TermsContainer}>
        <Pressable style={stylesTermBar.TermButtonContainer}>
          <Text style={stylesTermBar.TermTitle}>{term.title}</Text>
          <HorizontalSizedBox width={convertWidth(9)} />
          <NavigateIcon height={convertHeight(6)} />
        </Pressable>
        <Text style={stylesTermBar.TermSubTitle}>{term.subTitle}</Text>
      </View>
      <RadioButton onPress={radioOnPress} isSelected={isSelected} />
    </View>
  );
}

const stylesTermBar = StyleSheet.create({
  container: {
    width: convertWidth(327),
    height: convertHeight(44),
    marginTop: convertHeight(21),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  TextRequired: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_PRIMARY_GREEN_DARK,
  },

  TextOption: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_2,
  },

  TermsContainer: {
    width: convertWidth(244),
    height: '100%',
  },

  TermButtonContainer: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  TermTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },

  TermSubTitle: {
    marginTop: convertHeight(5),
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,
  },
});

export { TermTotalBar, TermBar };
