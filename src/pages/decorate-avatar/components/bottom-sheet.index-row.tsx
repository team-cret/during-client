import { useDecorateAvatarStore } from '@/src/features';
import { COLOR_BASE_1, COLOR_SECONDARY_PINK_DARK, convertHeight, convertWidth } from '@/src/shared';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

const animatinonConfig = {
  duration: 200,
  easing: Easing.bezier(0.57, -0.42, 0.46, 1.56),
};

function IndexRow() {
  const { category, setCategory } = useDecorateAvatarStore();

  const hairTextColor = useSharedValue<string>(
    category === '헤어' ? COLOR_SECONDARY_PINK_DARK : COLOR_BASE_1
  );
  const topsTextColor = useSharedValue<string>(
    category === '상의' ? COLOR_SECONDARY_PINK_DARK : COLOR_BASE_1
  );
  const bottomsTextColor = useSharedValue<string>(
    category === '하의' ? COLOR_SECONDARY_PINK_DARK : COLOR_BASE_1
  );
  const shoesTextColor = useSharedValue<string>(
    category === '신발' ? COLOR_SECONDARY_PINK_DARK : COLOR_BASE_1
  );

  function changeCategory(category: '헤어' | '상의' | '하의' | '신발') {
    setCategory(category);

    switch (category) {
      case '헤어':
        hairTextColor.value = withTiming(COLOR_SECONDARY_PINK_DARK, animatinonConfig);
        topsTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        bottomsTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        shoesTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        break;
      case '상의':
        hairTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        topsTextColor.value = withTiming(COLOR_SECONDARY_PINK_DARK, animatinonConfig);
        bottomsTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        shoesTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        break;
      case '하의':
        hairTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        topsTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        bottomsTextColor.value = withTiming(COLOR_SECONDARY_PINK_DARK, animatinonConfig);
        shoesTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        break;
      case '신발':
        hairTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        topsTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        bottomsTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        shoesTextColor.value = withTiming(COLOR_SECONDARY_PINK_DARK, animatinonConfig);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => changeCategory('헤어')}>
        <Animated.Text style={[styles.text, { color: hairTextColor }]}>헤어</Animated.Text>
      </Pressable>
      <Pressable onPress={() => changeCategory('상의')}>
        <Animated.Text style={[styles.text, { color: topsTextColor }]}>상의</Animated.Text>
      </Pressable>
      <Pressable onPress={() => changeCategory('하의')}>
        <Animated.Text style={[styles.text, { color: bottomsTextColor }]}>하의</Animated.Text>
      </Pressable>
      <Pressable onPress={() => changeCategory('신발')}>
        <Animated.Text style={[styles.text, { color: shoesTextColor }]}>신발</Animated.Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: convertHeight(22),
    marginTop: convertHeight(7),

    flexDirection: 'row',
  },

  text: {
    width: convertWidth(25),
    height: convertHeight(22),
    marginRight: convertWidth(21),

    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
    lineHeight: convertHeight(22),
  },
});

export { IndexRow };
