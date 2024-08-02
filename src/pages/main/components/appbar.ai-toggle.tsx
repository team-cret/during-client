import {
  COLOR_BASE_1,
  COLOR_BASE_2_30,
  COLOR_PRIMARY_GREEN,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

function AIToggle() {
  return (
    <View style={styles.container}>
      <View style={styles.handle}>
        <Text style={styles.text}>AI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(36),
    height: convertHeight(22),
    backgroundColor: COLOR_PRIMARY_GREEN,

    marginTop: convertHeight(16),
    borderRadius: 100,

    flexDirection: 'row',
    alignItems: 'center',
  },

  handle: {
    width: convertWidth(17),
    height: convertHeight(17),
    backgroundColor: COLOR_WHITE,
    borderRadius: 100,

    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: convertWidth(2),

    shadowColor: COLOR_BASE_1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
  },

  text: {
    fontSize: 9.6,
    fontFamily: 'Pretendard-Bold',
    color: COLOR_BASE_2_30,
  },
});

export { AIToggle };
