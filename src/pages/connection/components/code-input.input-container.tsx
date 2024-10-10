import { useConnectionStore } from '@/src/features';
import {
  COLOR_BASE_1,
  COLOR_BASE_2_30,
  COLOR_BASE_3,
  COLOR_PRIMARY_GREEN,
  COLOR_SECONDARY_PINK_DARK,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  NavProp,
  SpaceFlexBox,
} from '@/src/shared';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

const animationConfig = {
  duration: 300,
  easing: Easing.bezier(0.57, -0.42, 0.46, 1.56),
};

function InputContainer() {
  const navigation = useNavigation<NavProp<'connection/index'>>();
  const { invitationCode, ifValid, setInvitationCode, requestConnection } = useConnectionStore();

  const buttonBackgroundColor = useSharedValue<string>(COLOR_BASE_3);
  const buttonTextColor = useSharedValue<string>(COLOR_BASE_2_30);
  useEffect(() => {
    if (invitationCode.length === 10 && ifValid) {
      buttonBackgroundColor.value = withTiming(COLOR_PRIMARY_GREEN, animationConfig);
      buttonTextColor.value = withTiming(COLOR_BASE_1, animationConfig);
    } else {
      buttonBackgroundColor.value = withTiming(COLOR_BASE_3, animationConfig);
      buttonTextColor.value = withTiming(COLOR_BASE_2_30, animationConfig);
    }
  }, [ifValid, invitationCode]);

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <SpaceFlexBox flex={23} />
        <TextInput
          style={styles.input}
          cursorColor={COLOR_BASE_1}
          value={invitationCode}
          onChangeText={setInvitationCode}
          autoCapitalize="characters"
        />
        <SpaceFlexBox flex={23} />
        <Pressable
          onPress={() => {
            requestConnection().then((res) => {
              if (res) navigation.navigate('main/index');
            });
          }}
        >
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: buttonBackgroundColor,
            }}
          >
            <Animated.Text style={{ ...styles.buttonText, color: buttonTextColor }}>
              확인
            </Animated.Text>
          </Animated.View>
        </Pressable>
        <SpaceFlexBox flex={8} />
      </View>
      {!ifValid && <View style={styles.divider} />}
      {!ifValid && <View style={{ flex: 1 }} />}
      {!ifValid && <Text style={styles.errorText}>{'  ·  초대코드가 올바르지 않습니다.'}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    height: convertHeight(85),

    alignItems: 'flex-start',
  },

  textInputContainer: {
    width: convertWidth(331),
    height: convertHeight(51),
    backgroundColor: COLOR_WHITE,
    borderRadius: convertHeight(10),

    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    width: convertWidth(210),
    height: convertHeight(25),

    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
    fontWeight: 'normal',
  },

  button: {
    borderRadius: convertHeight(8),
    width: convertWidth(66),
    height: convertHeight(37),

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
  },

  divider: {
    width: convertWidth(303),
    height: convertHeight(1),
    backgroundColor: COLOR_SECONDARY_PINK_DARK,
    marginLeft: convertWidth(13),
  },

  errorText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_SECONDARY_PINK_DARK,
  },
});

export { InputContainer };
