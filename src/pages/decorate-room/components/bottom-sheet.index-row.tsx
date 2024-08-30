import { useDecorateRoomStore } from '@/src/features';
import { COLOR_BASE_1, COLOR_SECONDARY_PINK_DARK, convertHeight, convertWidth } from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

const animatinonConfig = {
  duration: 200,
  easing: Easing.bezier(0.57, -0.42, 0.46, 1.56),
};

function IndexRow() {
  const { category, setCategory } = useDecorateRoomStore();

  const backgroundTextColor = useSharedValue<string>(
    category === '배경' ? COLOR_SECONDARY_PINK_DARK : COLOR_BASE_1
  );
  const furnitureTextColor = useSharedValue<string>(
    category === '가구' ? COLOR_SECONDARY_PINK_DARK : COLOR_BASE_1
  );
  const accessoryTextColor = useSharedValue<string>(
    category === '소품' ? COLOR_SECONDARY_PINK_DARK : COLOR_BASE_1
  );

  function changeCategory(category: '배경' | '가구' | '소품') {
    setCategory(category);

    switch (category) {
      case '배경':
        backgroundTextColor.value = withTiming(COLOR_SECONDARY_PINK_DARK, animatinonConfig);
        furnitureTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        accessoryTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        break;
      case '가구':
        backgroundTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        furnitureTextColor.value = withTiming(COLOR_SECONDARY_PINK_DARK, animatinonConfig);
        accessoryTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        break;
      case '소품':
        backgroundTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        furnitureTextColor.value = withTiming(COLOR_BASE_1, animatinonConfig);
        accessoryTextColor.value = withTiming(COLOR_SECONDARY_PINK_DARK, animatinonConfig);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => changeCategory('배경')}>
        <Animated.Text style={[styles.text, { color: backgroundTextColor }]}>배경</Animated.Text>
      </Pressable>
      <Pressable onPress={() => changeCategory('가구')}>
        <Animated.Text style={[styles.text, { color: furnitureTextColor }]}>가구</Animated.Text>
      </Pressable>
      <Pressable onPress={() => changeCategory('소품')}>
        <Animated.Text style={[styles.text, { color: accessoryTextColor }]}>소품</Animated.Text>
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
