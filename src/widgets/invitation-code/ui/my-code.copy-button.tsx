import {
  COLOR_BASE_2,
  COLOR_WHITE,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SpaceFlexBox,
  textStyles,
} from "@/src/shared";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import CopyIcon from "@/src/shared/assets/icons/interaction/copy.svg";

function CopyButton() {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={13} />
      <CopyIcon
        height={Dimensions.get("window").height * (11 / DESIGN_HEIGHT)}
      />
      <SpaceFlexBox flex={4} />
      <Text style={styles.text}>코드 복사하기</Text>
      <SpaceFlexBox flex={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_WHITE,
    width: Dimensions.get("window").width * (91 / DESIGN_WIDTH),
    height: Dimensions.get("window").height * (26 / DESIGN_HEIGHT),

    borderRadius: Dimensions.get("window").height * (13 / DESIGN_HEIGHT),

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 9.5,
    fontFamily: "Pretendard-SemiBold",
    color: COLOR_BASE_2,

    lineHeight: Dimensions.get("window").height * (11 / DESIGN_HEIGHT),
  },
});

export { CopyButton };
