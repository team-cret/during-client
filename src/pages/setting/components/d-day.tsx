import { COLOR_BASE_1, convertHeight, convertWidth } from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DDayIcon from '@/src/shared/assets/icons/setting/d-day.svg';
import ArrorIcon from '@/src/shared/assets/icons/setting/right-arrow.svg';

function DDay() {
  return (
    <View style={styles.container}>
      <DDayIcon width={convertWidth(13)} height={convertHeight(16)} />
      <Text style={styles.text}>D+ 105</Text>
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

export { DDay };
