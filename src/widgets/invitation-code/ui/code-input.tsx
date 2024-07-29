import {
  COLOR_BASE_4,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SpaceFlexBox,
  textStyles,
} from "@/src/shared";
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * (140 / DESIGN_HEIGHT),
    alignItems: "center",
  },

  titleText: {
    ...textStyles.miniTitle,
    width: Dimensions.get("window").width * (331 / DESIGN_WIDTH),
  },

  inputContainer: {
    width: Dimensions.get("window").width * (331 / DESIGN_WIDTH),
    height: Dimensions.get("window").height * (51 / DESIGN_HEIGHT),
    backgroundColor: "tomato",
  },
});

export { InvitationCodeInput };
