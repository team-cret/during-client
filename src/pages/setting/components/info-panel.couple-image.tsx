import {
  COLOR_BASE_3,
  COLOR_SECONDARY_PINK_LIGHT,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { StyleSheet, View } from 'react-native';

import HeartIcon from '@/src/shared/assets/icons/setting/heart.svg';

function CoupleImage() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>
      <View style={styles.imageContainer}></View>
      <View style={styles.heartContainer}>
        <HeartIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(226),
    height: convertHeight(106),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imageContainer: {
    height: convertHeight(106),
    aspectRatio: 1,
    backgroundColor: COLOR_BASE_3,
    borderRadius: convertHeight(7),
  },

  heartContainer: {
    width: convertWidth(25),
    height: convertHeight(22),

    shadowColor: COLOR_SECONDARY_PINK_LIGHT,
    shadowOffset: {
      width: 0,
      height: convertHeight(3),
    },
    shadowRadius: convertHeight(8),
    shadowOpacity: 1,

    position: 'absolute',
    left: convertWidth(113),
    top: convertHeight(45),
    transform: [
      {
        translateX: convertWidth(-12.5),
      },
    ],
  },
});

export { CoupleImage };
