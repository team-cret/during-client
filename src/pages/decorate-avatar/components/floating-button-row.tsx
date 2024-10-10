import { COLOR_BACKGROUND, COLOR_BASE_2_30, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, View } from 'react-native';

import BagIcon from '@/src/shared/assets/icons/decoration/bag.svg';
import ResetIcon from '@/src/shared/assets/icons/decoration/reset.svg';

function FloatingButtonRow() {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <BagIcon width={convertWidth(22)} />
      </View>
      <View style={[styles.button, { opacity: 0 }]}>
        <ResetIcon width={convertWidth(26)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(332),
    height: convertHeight(43),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: convertWidth(45),
    height: convertHeight(42),
    backgroundColor: COLOR_BACKGROUND,

    borderRadius: convertWidth(23),

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: COLOR_BASE_2_30,
    shadowOffset: {
      width: 0,
      height: convertHeight(4),
    },
    shadowRadius: convertWidth(10),
    elevation: 5,
  },
});

export { FloatingButtonRow };
