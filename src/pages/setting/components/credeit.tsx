import { COLOR_BASE_1, convertHeight, convertWidth } from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import CreditIcon from '@/src/shared/assets/icons/setting/credit.svg';
import ArrorIcon from '@/src/shared/assets/icons/setting/right-arrow.svg';

function Credit() {
  return (
    <View style={styles.container}>
      <CreditIcon width={convertWidth(14)} height={convertHeight(14)} />
      <Text style={styles.text}>5,403,000</Text>
      <Pressable style={styles.navigateContainer}>
        <ArrorIcon width={convertWidth(6)} height={convertHeight(9)} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: convertHeight(22),

    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,

    marginHorizontal: convertWidth(9),
    lineHeight: convertHeight(22),
    textAlign: 'center',
  },

  navigateContainer: {
    width: convertWidth(12),
    aspectRatio: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Credit };
