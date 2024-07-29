import {
  BarButtonGreen,
  COLOR_BASE_4,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SpaceFlexBox,
} from "@/src/shared";
import { Dimensions, StyleSheet, View } from "react-native";
import { TextContainer } from "./my-code.text-container";
import { CopyButton } from "./my-code.copy-button";

function MyInvitationCode() {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={28} />
      <View style={styles.invitationCodeContainer}>
        <TextContainer />
        <CopyButton />
      </View>
      <SpaceFlexBox flex={27} />
      <BarButtonGreen text="링크 공유하기" onPress={() => {}} />
      <SpaceFlexBox flex={23} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BASE_4,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * (187 / DESIGN_HEIGHT),
    alignItems: "center",
  },

  invitationCodeContainer: {
    width: Dimensions.get("window").width * (329 / DESIGN_WIDTH),
    height: Dimensions.get("window").height * (67 / DESIGN_HEIGHT),

    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export { MyInvitationCode };
