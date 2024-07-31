import { Pressable, StyleProp, Text, TextStyle, View } from 'react-native';

import {
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_PRIMARY_GREEN_DARK,
  COLOR_PRIMARY_GREEN,
  COLOR_BASE_1,
  convertWidth,
  convertHeight,
} from '../../global/index';

import CloseIcon from '@/src/shared/assets/icons/navigation/close.svg';
import DeleteIcon from '@/src/shared/assets/icons/interaction/delete.svg';
import BackIcon from '@/src/shared/assets/icons/navigation/back.svg';

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
function RadioButton({ onPress, isSelected }: { onPress: () => void; isSelected: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...{
          height: convertHeight(20),
          aspectRatio: 1,
          borderRadius: 100,
          // borderColor: isSelected ? "black" : "gray",
          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: COLOR_BASE_3,
        },
        ...(isSelected
          ? {
              backgroundColor: 'white',
              borderWidth: 3,
              borderColor: COLOR_PRIMARY_GREEN_DARK,
            }
          : {}),
      }}
    >
      {isSelected && (
        <View
          style={{
            width: convertWidth(10),
            height: convertHeight(10),
            borderRadius: 100,

            backgroundColor: COLOR_PRIMARY_GREEN_DARK,
          }}
        />
      )}
    </Pressable>
  );
}

////Bar Buttons
function BarButtonGreen({
  onPress,
  text,
  ifDisabled = false,
}: {
  onPress: () => void;
  text: string;
  ifDisabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: convertHeight(42),
        width: convertWidth(331),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',

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
