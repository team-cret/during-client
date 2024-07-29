import {
  COLOR_BASE_4,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SpaceFlexBox,
  textStyles,
} from "@/src/shared";
import { StyleSheet, Text, View } from "react-native";
import { InputContainer } from "./code-input.input-container";

function InvitationCodeInput() {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={26} />
      <Text style={styles.titleText}>연인 초대코드 입력</Text>
      <SpaceFlexBox flex={15} />
      <InputContainer />
      <SpaceFlexBox flex={26} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BASE_4,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * (140 / DESIGN_HEIGHT),
    alignItems: "center",
  },

  titleText: {
    ...textStyles.miniTitle,
    width: SCREEN_WIDTH * (331 / DESIGN_WIDTH),
  },

  inputContainer: {
    width: SCREEN_WIDTH * (331 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (51 / DESIGN_HEIGHT),
    backgroundColor: "tomato",
  },
});

export { InvitationCodeInput };
