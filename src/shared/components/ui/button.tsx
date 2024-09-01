import { Image, Pressable, StyleProp, Text, TextStyle, View } from 'react-native';

import {
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_PRIMARY_GREEN_DARK,
  COLOR_PRIMARY_GREEN,
  COLOR_BASE_1,
  convertWidth,
  convertHeight,
  COLOR_WHITE,
} from '../../global/index';

import CloseIcon from '@/src/shared/assets/icons/navigation/close.svg';
import DeleteIcon from '@/src/shared/assets/icons/interaction/delete.svg';
import BackIcon from '@/src/shared/assets/icons/navigation/back.svg';
import Animated, {
  Easing,
  ReduceMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

////Icon Buttons
function CloseButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: convertHeight(20),
        justifyContent: 'center',
      }}
    >
      <CloseIcon />
    </Pressable>
  );
}

function DeleteButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: convertHeight(16),
        aspectRatio: 1,
        justifyContent: 'center',
      }}
    >
      <DeleteIcon />
    </Pressable>
  );
}

////Icon Tex Buttons
function BackIconTextButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        height: convertHeight(16),
        width: convertWidth(53),
      }}
    >
      <BackIcon height={convertHeight(6)} />

      <Text
        style={{
          fontSize: 12,
          color: COLOR_BASE_2,
          fontFamily: 'Pretendard-Regular',

          lineHeight: convertHeight(12),
        }}
      >
        뒤로가기
      </Text>
    </Pressable>
  );
}

////Toggle Buttons
const toggleAnimationConfig = {
  duration: 200,
  easing: Easing.bezier(0.57, -0.42, 0.46, 1.56),
};

function RadioButton({ onPress, isSelected }: { onPress: () => void; isSelected: boolean }) {
  const innerCirlcleWidth = useSharedValue<number>(0);
  const borderWidth = useSharedValue<number>(0);
  const backgroundColor = useSharedValue<string>(COLOR_BASE_3);

  useEffect(() => {
    if (isSelected) {
      innerCirlcleWidth.value = withTiming(convertWidth(10), toggleAnimationConfig);
      borderWidth.value = withTiming(convertWidth(3), toggleAnimationConfig);
      backgroundColor.value = withTiming(COLOR_WHITE, toggleAnimationConfig);
    } else {
      innerCirlcleWidth.value = withTiming(0, toggleAnimationConfig);
      borderWidth.value = withTiming(0, toggleAnimationConfig);
      backgroundColor.value = withTiming(COLOR_BASE_3, toggleAnimationConfig);
    }
    innerCirlcleWidth.value = withTiming(isSelected ? convertWidth(10) : 0, toggleAnimationConfig);
  }, [isSelected]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={{
          height: convertHeight(20),
          aspectRatio: 1,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: COLOR_PRIMARY_GREEN_DARK,

          backgroundColor,
          borderWidth,
        }}
      >
        <Animated.View
          style={{
            width: innerCirlcleWidth,
            aspectRatio: 1,
            borderRadius: 100,
            backgroundColor: COLOR_PRIMARY_GREEN_DARK,
          }}
        />
      </Animated.View>
    </Pressable>
  );
}

////Bar Buttons
function BarButtonGreen({
  onPress,
  text,
  ifDisabled = false,
  bottom,
}: {
  onPress: () => void;
  text: string;
  ifDisabled?: boolean;
  bottom?: number | undefined;
}) {
  return (
    <Pressable
      onPress={ifDisabled ? null : onPress}
      style={{
        height: convertHeight(42),
        width: convertWidth(331),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',

        position: bottom === undefined ? 'relative' : 'absolute',
        bottom: bottom === undefined ? 0 : bottom,

        backgroundColor: ifDisabled ? COLOR_BASE_3 : COLOR_PRIMARY_GREEN,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Pretendard-SemiBold',
          color: ifDisabled ? COLOR_BASE_2 : COLOR_BASE_1,
          opacity: ifDisabled ? 0.3 : 1,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}

////Text Buttons
function TextButton({
  onPress,
  text,
  textStyle,
}: {
  onPress: () => void;
  text: string;
  textStyle: StyleProp<TextStyle>;
}) {
  return (
    <Pressable onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
}

export { CloseButton, DeleteButton, BackIconTextButton, RadioButton, BarButtonGreen, TextButton };
