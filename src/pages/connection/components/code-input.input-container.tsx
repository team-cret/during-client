import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  SpaceFlexBox,
} from '@/src/shared';
import { useState } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

function convertInvitationCode(val: string) {
  return val
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .substring(0, 10);
}

function InputContainer() {
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={23} />
      <KeyboardAvoidingView>
        <TextInput
          style={styles.input}
          cursorColor={COLOR_BASE_1}
          value={inputValue}
          onChangeText={(val) => setInputValue(convertInvitationCode(val))}
        />
      </KeyboardAvoidingView>
      <SpaceFlexBox flex={23} />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>확인</Text>
      </Pressable>
      <SpaceFlexBox flex={8} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: COLOR_BASE_3,
    borderRadius: convertHeight(8),
    width: convertWidth(66),
    height: convertHeight(37),

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_2,
    opacity: 0.3,
  },
});

export { InputContainer };
