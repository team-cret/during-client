import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  HorizontalSizedBox,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

import CreditIcon from '@/src/shared/assets/icons/decoration/credit.svg';

function UpperButtons() {
  return (
    <View style={styles.container}>
      <View style={styles.blackButton}>
        <Text style={styles.blackButtonText}>초기화</Text>
      </View>
      <View style={styles.creditButton}>
        <CreditIcon width={convertWidth(14)} />
        <HorizontalSizedBox width={convertWidth(13)} />
        <Text style={styles.creditButtonText}>5403000</Text>
      </View>
      <View style={styles.blackButton}>
        <Text style={styles.blackButtonText}>완료</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    height: convertHeight(40),

    position: 'absolute',
    top: convertHeight(80),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  blackButton: {
    height: convertHeight(40),
    backgroundColor: COLOR_BASE_1,
    borderRadius: convertHeight(20),

    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: convertWidth(15),
  },

  blackButtonText: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_WHITE,
  },

  creditButton: {
    height: convertHeight(40),
    backgroundColor: 'white',
    borderRadius: convertHeight(20),

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: convertWidth(19),
  },
  creditButtonText: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_2,
  },
});

export { UpperButtons };
