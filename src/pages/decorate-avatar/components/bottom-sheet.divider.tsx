import { useDecorateAvatarStore } from '@/src/features';
import {
  avatarDecorationCategories,
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

function Divider() {
  const { category } = useDecorateAvatarStore();

  const categoryLineLeft = useSharedValue<number>(convertWidth(30));
  useEffect(() => {
    categoryLineLeft.value = withTiming(
      convertWidth(30) + convertWidth(46) * avatarDecorationCategories.indexOf(category),
      animatinonConfig
    );
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
