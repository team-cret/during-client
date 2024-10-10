import {
  convertHeight,
  convertWidth,
  useNavigationBarHeight,
  useStatusbarHeight,
} from '@/src/shared';
import { Dimensions, StyleSheet } from 'react-native';
import { FloatingButtonRow } from './floating-button-row';
import { BottomSheet } from './bottom-sheet';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import Animated, { Easing, runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDecorateAvatarStore } from '@/src/features';

const bottomSheetConfig = {
  animatinonConfig: {
    duration: 300,
    easing: Easing.bezier(0.1, 0.71, 0.37, 0.9),
  },
  bottom: {
    'three-rows': convertHeight(0),
    'one-row': convertHeight(-170),
    'handle-only': convertHeight(-328),
  },
  velocityBoundary: 100,
  yBoundary: {
    'three-rows': convertHeight(497),
    'one-row': convertHeight(618),
  },
  height: convertHeight(431),
  unTocuableArea: convertHeight(73),
};

function BottomSection() {
  const screenHeight = Dimensions.get('screen').height;
  const stautsBarHeight = useStatusbarHeight();
  const navBarHeight = useNavigationBarHeight();
  const bottom = useSharedValue<number>(bottomSheetConfig.bottom['one-row']);
  const bottomStartOffset = useSharedValue(0);
  const { setBottomSheetMode } = useDecorateAvatarStore();

  const gesturePan = Gesture.Pan()
    .onBegin((event) => {
      bottomStartOffset.value = event.y;
    })
    .onEnd((event) => {
      if (bottomStartOffset.value < bottomSheetConfig.unTocuableArea) return;
      if (Math.abs(event.velocityY) > bottomSheetConfig.velocityBoundary) {
        if (event.velocityY > 0) {
          bottom.value = withTiming(
            bottomSheetConfig.bottom['handle-only'],
            bottomSheetConfig.animatinonConfig
          );
          runOnJS(setBottomSheetMode)('handle-only');
        } else {
          bottom.value = withTiming(
            bottomSheetConfig.bottom['three-rows'],
            bottomSheetConfig.animatinonConfig
          );
          runOnJS(setBottomSheetMode)('three-rows');
        }
      } else {
        if (event.absoluteY - stautsBarHeight < bottomSheetConfig.yBoundary['three-rows']) {
          bottom.value = withTiming(
            bottomSheetConfig.bottom['three-rows'],
            bottomSheetConfig.animatinonConfig
          );
          runOnJS(setBottomSheetMode)('three-rows');
        } else if (event.absoluteY - stautsBarHeight < bottomSheetConfig.yBoundary['one-row']) {
          bottom.value = withTiming(
            bottomSheetConfig.bottom['one-row'],
            bottomSheetConfig.animatinonConfig
          );
          runOnJS(setBottomSheetMode)('one-row');
        } else {
          bottom.value = withTiming(
            bottomSheetConfig.bottom['handle-only'],
            bottomSheetConfig.animatinonConfig
          );
          runOnJS(setBottomSheetMode)('handle-only');
        }
      }
    })
    .onChange((event) => {
      if (bottomStartOffset.value < bottomSheetConfig.unTocuableArea) return;
      const newBottom =
        screenHeight -
        (event.absoluteY - bottomStartOffset.value) -
        bottomSheetConfig.height -
        navBarHeight;
      if (newBottom > bottomSheetConfig.bottom['three-rows']) return;
      if (newBottom < bottomSheetConfig.bottom['handle-only']) return;
      bottom.value = newBottom;
    });

  return (
    <GestureDetector gesture={gesturePan}>
      <Animated.View
        style={[
          styles.container,
          {
            bottom,
          },
        ]}
      >
        <FloatingButtonRow />
        <BottomSheet />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(390),
    height: bottomSheetConfig.height,

    position: 'absolute',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export { BottomSection };
