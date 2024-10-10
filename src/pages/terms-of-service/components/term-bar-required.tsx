import {
  COLOR_BASE_1,
  RadioButton,
  COLOR_PRIMARY_GREEN_DARK,
  COLOR_BASE_2,
  HorizontalSizedBox,
  convertWidth,
  convertHeight,
} from '@/src/shared';
import { Linking, Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import NavigateIcon from '@/src/shared/assets/icons/navigation/navigate.svg';

function TermBarRequired({
  isSelected,
  term,
  radioOnPress,
}: {
  isSelected: boolean;
  term: {
    title: string;
    subTitle: string;
  };
  radioOnPress: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.TextRequired}>필수</Text>
      <View style={styles.TermsContainer}>
        <Pressable
          style={styles.TermButtonContainer}
          onPress={() => {
            Linking.openURL(
              `https://pond-receipt-8ec.notion.site/during-1690805faa6b4926b8c3da291bfbd9ed?pvs=4`
            );
          }}
        >
          <Text style={styles.TermTitle}>{term.title}</Text>
          <HorizontalSizedBox width={convertWidth(9)} />
          <NavigateIcon height={convertHeight(6)} />
        </Pressable>
        <Text style={styles.TermSubTitle}>{term.subTitle}</Text>
      </View>
      <RadioButton onPress={radioOnPress} isSelected={isSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
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

export { TermBarRequired };
