import { COLOR_BASE_1, COLOR_WHITE, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, View } from 'react-native';

function SideBar() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(75),
    height: convertHeight(309),

    backgroundColor: COLOR_WHITE,

    position: 'absolute',
    top: 0,
    right: 0,

    borderTopLeftRadius: convertWidth(20),
    borderBottomLeftRadius: convertWidth(20),

    shadowColor: COLOR_BASE_1,
    shadowOffset: {
      width: 0,
      height: convertHeight(4),
    },
    shadowOpacity: 0.08,
  },
});

export { SideBar };
