import { useDecorateAvatarStore } from '@/src/features';
import {
  avatarDecorationCategories,
  avatarDecorationCategoriesType,
  COLOR_BASE_1,
  COLOR_SECONDARY_PINK_DARK,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, SharedValue, useSharedValue, withTiming } from 'react-native-reanimated';

const animatinonConfig = {
  duration: 200,
  easing: Easing.bezier(0.57, -0.42, 0.46, 1.56),
};

function IndexRow() {
  const { category, setCategory } = useDecorateAvatarStore();

  const hairTextColor: SharedValue<string>[] = avatarDecorationCategories.map((c) =>
    useSharedValue<string>(category === c ? COLOR_SECONDARY_PINK_DARK : COLOR_BASE_1)
  );

  function changeCategory(category: avatarDecorationCategoriesType) {
    setCategory(category);
    avatarDecorationCategories.forEach((c, i) => {
      if (category === c)
        hairTextColor[i].value = withTiming(COLOR_SECONDARY_PINK_DARK, animatinonConfig);
      else hairTextColor[i].value = withTiming(COLOR_BASE_1, animatinonConfig);
    });
  }

  return (
    <View style={styles.container}>
      {avatarDecorationCategories.map((c, i) => (
        <Pressable key={i} onPress={() => changeCategory(c)}>
          <Animated.Text style={[styles.text, { color: hairTextColor[i] }]}>{c}</Animated.Text>
        </Pressable>
      ))}
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
