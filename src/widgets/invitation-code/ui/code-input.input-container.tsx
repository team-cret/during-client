import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_WHITE,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SpaceFlexBox,
} from "@/src/shared";
import { useState } from "react";
import {
  Dimensions,
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
    width: Dimensions.get("window").width * (331 / DESIGN_WIDTH),
    height: Dimensions.get("window").height * (51 / DESIGN_HEIGHT),
    backgroundColor: COLOR_WHITE,
    borderRadius: Dimensions.get("window").height * (10 / DESIGN_HEIGHT),

    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    width: Dimensions.get("window").width * (210 / DESIGN_WIDTH),
    height: Dimensions.get("window").height * (25 / DESIGN_HEIGHT),

    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    color: COLOR_BASE_1,
    fontWeight: "normal",
  },

  button: {
    backgroundColor: COLOR_BASE_3,
    borderRadius: Dimensions.get("window").height * (8 / DESIGN_HEIGHT),
    width: Dimensions.get("window").width * (66 / DESIGN_WIDTH),
    height: Dimensions.get("window").height * (37 / DESIGN_HEIGHT),

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
