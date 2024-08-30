import { useDecorateRoomStore } from '@/src/features';
import {
  COLOR_BASE_3,
  COLOR_SECONDARY_PINK_DARK,
  convertHeight,
  convertWidth,
  HorizontalDivider,
} from '@/src/shared';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

const animatinonConfig = {
  duration: 200,
  easing: Easing.bezier(0.57, -0.42, 0.46, 1.56),
};

const categoryLineLeftValue = {
  배경: convertWidth(31),
  가구: convertWidth(77),
  소품: convertWidth(123),
};

function Divider() {
  const { category } = useDecorateRoomStore();

  const categoryLineLeft = useSharedValue<number>(categoryLineLeftValue[category]);
  useEffect(() => {
    categoryLineLeft.value = withTiming(categoryLineLeftValue[category], animatinonConfig);
  }, [category]);

  return (
    <View style={styles.container}>
      <HorizontalDivider
        color={COLOR_BASE_3}
        width={convertWidth(390)}
        height={convertHeight(3)}
        upperFlex={1}
        lowerFlex={1}
        lineHeight={convertHeight(1)}
      />
      <Animated.View style={[styles.categoryLine, { left: categoryLineLeft }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(390),
    height: convertHeight(3),
  },

  categoryLine: {
    width: convertWidth(25),
    height: convertHeight(3),
    backgroundColor: COLOR_SECONDARY_PINK_DARK,
    position: 'absolute',
  },
});

export { Divider };
