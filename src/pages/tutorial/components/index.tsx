import { COLOR_BASE_1, COLOR_PRIMARY_GREEN_DARK, convertHeight, convertWidth } from '@/src/shared';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

const indexConfig = {
  animatinonConfig: {
    duration: 300,
    easing: Easing.bezier(0.1, 0.71, 0.37, 0.9),
  },
  backgroundColor: {
    selected: COLOR_PRIMARY_GREEN_DARK,
    unselected: COLOR_BASE_1,
  },
  width: {
    selected: convertWidth(14),
    unselected: convertWidth(7),
  },
};

function Index({ selected }: { selected: boolean }) {
  const backgroundColor = useSharedValue(
    selected ? indexConfig.backgroundColor.selected : indexConfig.backgroundColor.unselected
  );
  const width = useSharedValue(
    selected ? indexConfig.width.selected : indexConfig.width.unselected
  );

  useEffect(() => {
    backgroundColor.value = withTiming(
      selected ? indexConfig.backgroundColor.selected : indexConfig.backgroundColor.unselected,
      indexConfig.animatinonConfig
    );
    width.value = withTiming(
      selected ? indexConfig.width.selected : indexConfig.width.unselected,
      indexConfig.animatinonConfig
    );
  }, [selected]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          width,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: convertHeight(7),
    borderRadius: convertWidth(7),
    marginHorizontal: convertWidth(2.5),
  },
});

export { Index };
