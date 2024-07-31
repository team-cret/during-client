import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_4,
  COLOR_SECONDARY_PINK_DARK,
  convertHeight,
  convertWidth,
  DeleteButton,
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
    width: convertWidth(331),
    height: convertHeight(85),

    alignItems: 'center',
  },

  inputContainer: {
    width: convertWidth(331),
    height: convertHeight(51),
    borderRadius: convertHeight(10),

    backgroundColor: COLOR_BASE_4,

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  textInput: {
    width: convertWidth(245),
    height: convertHeight(25),

    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,

    fontWeight: 'normal',
  },

  errorLine: {
    width: convertWidth(302),
    height: convertHeight(1),
    backgroundColor: COLOR_SECONDARY_PINK_DARK,
  },

  subTextBox: {
    width: convertWidth(331),
    height: convertHeight(16),
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
