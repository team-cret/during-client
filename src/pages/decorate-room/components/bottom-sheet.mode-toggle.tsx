import { useDecorateRoomStore } from '@/src/features';
import { COLOR_BASE_1, COLOR_BASE_3, COLOR_WHITE, convertHeight, convertWidth } from '@/src/shared';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

const animatinonConfig = {
  duration: 200,
  easing: Easing.bezier(0.57, -0.42, 0.46, 1.56),
};

const sharedValues = [
  {
    handleMarginLeft: convertWidth(6),
    shopFontWidth: convertWidth(54),
    shopFontColor: COLOR_WHITE,
    bagFontWidth: convertWidth(35),
    bagFontColor: COLOR_BASE_1,
  },
  {
    handleMarginLeft: convertWidth(41),
    shopFontWidth: convertWidth(35),
    shopFontColor: COLOR_BASE_1,
    bagFontWidth: convertWidth(54),
    bagFontColor: COLOR_WHITE,
  },
];

function ModeToggle() {
  const { mode, setMode } = useDecorateRoomStore();

  const handleMarginLeft = useSharedValue<number>(sharedValues[mode].handleMarginLeft);
  const shopFontWidth = useSharedValue<number>(sharedValues[mode].shopFontWidth);
  const shopFontColor = useSharedValue<string>(sharedValues[mode].shopFontColor);
  const bagFontWidth = useSharedValue<number>(sharedValues[mode].bagFontWidth);
  const bagFontColor = useSharedValue<string>(sharedValues[mode].bagFontColor);

  function toggleMode() {
    if (mode === 0) {
      setMode(1);
      handleMarginLeft.value = withTiming(sharedValues[1].handleMarginLeft, animatinonConfig);
      shopFontWidth.value = withTiming(sharedValues[1].shopFontWidth, animatinonConfig);
      shopFontColor.value = withTiming(sharedValues[1].shopFontColor, animatinonConfig);
      bagFontWidth.value = withTiming(sharedValues[1].bagFontWidth, animatinonConfig);
      bagFontColor.value = withTiming(sharedValues[1].bagFontColor, animatinonConfig);
    } else {
      setMode(0);
      handleMarginLeft.value = withTiming(sharedValues[0].handleMarginLeft, animatinonConfig);
      shopFontWidth.value = withTiming(sharedValues[0].shopFontWidth, animatinonConfig);
      shopFontColor.value = withTiming(sharedValues[0].shopFontColor, animatinonConfig);
      bagFontWidth.value = withTiming(sharedValues[0].bagFontWidth, animatinonConfig);
      bagFontColor.value = withTiming(sharedValues[0].bagFontColor, animatinonConfig);
    }
  }

  return (
    <Pressable style={styles.container} onPress={toggleMode}>
      <Animated.View
        style={{
          left: handleMarginLeft,
          ...styles.handle,
        }}
      />
      <Animated.Text style={[styles.modeText, { width: shopFontWidth, color: shopFontColor }]}>
        상점
      </Animated.Text>
      <Animated.Text style={[styles.modeText, { width: bagFontWidth, color: bagFontColor }]}>
        가방
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(101),
    height: convertHeight(32),
    backgroundColor: COLOR_BASE_3,
    borderRadius: convertWidth(16),

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  handle: {
    width: convertWidth(54),
    height: convertHeight(25),
    borderRadius: convertHeight(12.5),

    backgroundColor: COLOR_BASE_1,
    position: 'absolute',
  },

  modeText: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
  },
});

export { ModeToggle };
