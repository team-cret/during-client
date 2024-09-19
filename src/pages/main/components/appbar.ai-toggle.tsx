import { useChatAIStore } from '@/src/features';
import {
  COLOR_BASE_1,
  COLOR_BASE_2_30,
  COLOR_BASE_4,
  COLOR_PRIMARY_GREEN,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

const animatinonConfig = {
  duration: 200,
  easing: Easing.bezier(0.57, -0.42, 0.46, 1.56),
};
function AIToggle() {
  const { isAIOn, setIsAIOn } = useChatAIStore();

  //animation Values
  const handleMarginLeft = useSharedValue<number>(isAIOn ? 2 : 17);
  const backgroundColor = useSharedValue<string>(isAIOn ? COLOR_PRIMARY_GREEN : COLOR_BASE_4);

  function toggleAI() {
    if (isAIOn) {
      setIsAIOn(false);
      handleMarginLeft.value = withTiming(convertWidth(17), animatinonConfig);
      backgroundColor.value = withTiming(COLOR_BASE_4, animatinonConfig);
    } else {
      setIsAIOn(true);
      handleMarginLeft.value = withTiming(convertWidth(2), animatinonConfig);
      backgroundColor.value = withTiming(COLOR_PRIMARY_GREEN, animatinonConfig);
    }
  }

  return (
    <Pressable onPress={toggleAI}>
      <Animated.View
        style={{
          backgroundColor,
          ...styles.container,
        }}
      >
        <Animated.View
          style={{
            marginLeft: handleMarginLeft,
            ...styles.handle,
          }}
        >
          <Text style={styles.text}>AI</Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(36),
    height: convertHeight(22),

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
