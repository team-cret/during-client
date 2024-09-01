import {
  BarButtonGreen,
  COLOR_BASE_2,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  useNavigationBarHeight,
} from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { Item } from './purchase-bottom-sheet.item';
import { useDecorateRoomStore } from '@/src/features';
import { useEffect } from 'react';

const animatinonConfig = {
  duration: 300,
  easing: Easing.bezier(0.1, 0.71, 0.37, 0.9),
};

function PurchaseBottomSheet() {
  const navigationBarSize = useNavigationBarHeight();

  const height = convertHeight(634) - navigationBarSize;
  const bottom = useSharedValue<number>(-height);

  const { isPurchaseMode, setIsPurchaseMode, purchaseItems } = useDecorateRoomStore();
  useEffect(() => {
    bottom.value = withTiming(isPurchaseMode ? 0 : -height, animatinonConfig);
  }, [isPurchaseMode]);

  function onCancel() {
    setIsPurchaseMode(false);
  }

  return (
    <Animated.View style={[styles.container, { bottom, height }]}>
      <View style={styles.cancelBar}>
        <Pressable onPress={onCancel}>
          <Text style={styles.cancleText}>취소</Text>
        </Pressable>
      </View>
      {purchaseItems.map((item, index) => {
        return <Item key={index} purchaseItem={item} />;
      })}
      <BarButtonGreen text="구매" onPress={() => {}} bottom={convertHeight(23)} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: convertWidth(375),

    borderTopLeftRadius: convertWidth(30),
    borderTopRightRadius: convertWidth(30),

    backgroundColor: COLOR_WHITE,
    position: 'absolute',

    paddingTop: convertHeight(19),

    alignItems: 'center',
  },

  cancelBar: {
    width: convertWidth(338),
    height: convertHeight(22),
  },

  cancleText: {
    width: convertWidth(25),
    lineHeight: convertHeight(22),
    textAlign: 'center',
    marginLeft: convertWidth(3),

    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: COLOR_BASE_2,
  },
});

export { PurchaseBottomSheet };
