import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_WHITE,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SpaceFlexBox,
} from "@/src/shared";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function convertInvitationCode(val: string) {
  return val
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .substring(0, 10);
}

function InputContainer() {
  const [inputValue, setInputValue] = useState("");

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
    width: SCREEN_WIDTH * (331 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (51 / DESIGN_HEIGHT),
    backgroundColor: COLOR_WHITE,
    borderRadius: SCREEN_HEIGHT * (10 / DESIGN_HEIGHT),

    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    width: SCREEN_WIDTH * (210 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (25 / DESIGN_HEIGHT),

    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    color: COLOR_BASE_1,
    fontWeight: "normal",
  },

  button: {
    backgroundColor: COLOR_BASE_3,
    borderRadius: SCREEN_HEIGHT * (8 / DESIGN_HEIGHT),
    width: SCREEN_WIDTH * (66 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (37 / DESIGN_HEIGHT),

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    color: COLOR_BASE_2,
    opacity: 0.3,
  },
});

export { InputContainer };
