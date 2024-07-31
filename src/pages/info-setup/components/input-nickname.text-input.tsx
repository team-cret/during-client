import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_4,
  COLOR_SECONDARY_PINK_DARK,
  DeleteButton,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SpaceFlexBox,
} from '@/src/shared';
import { Text, View } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';

function NicknameTextInput() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} cursorColor={COLOR_BASE_1} />
        <DeleteButton onPress={() => {}} />
      </View>
      <View style={styles.errorLine} />
      <SpaceFlexBox flex={1} />
      <View style={styles.subTextBox}>
        <Text style={styles.errorText}>
          {` · 닉네임은 한글, 영어 대소문자, 숫자만 입력가능합니다.`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * (331 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (85 / DESIGN_HEIGHT),

    alignItems: 'center',
  },

  inputContainer: {
    width: SCREEN_WIDTH * (331 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (51 / DESIGN_HEIGHT),
    borderRadius: SCREEN_HEIGHT * (10 / DESIGN_HEIGHT),

    backgroundColor: COLOR_BASE_4,

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  textInput: {
    width: SCREEN_WIDTH * (245 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (25 / DESIGN_HEIGHT),

    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,

    fontWeight: 'normal',
  },

  errorLine: {
    width: SCREEN_WIDTH * (302 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (1 / DESIGN_HEIGHT),
    backgroundColor: COLOR_SECONDARY_PINK_DARK,
  },

  subTextBox: {
    width: SCREEN_WIDTH * (331 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (16 / DESIGN_HEIGHT),
  },

  errorText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_SECONDARY_PINK_DARK,
  },

  hintText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,
  },
});

export { NicknameTextInput };
