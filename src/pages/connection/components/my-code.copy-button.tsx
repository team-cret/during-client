import {
  COLOR_BASE_2,
  COLOR_WHITE,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SpaceFlexBox,
} from "@/src/shared";
import { StyleSheet, Text, View } from "react-native";
import CopyIcon from "@/src/shared/assets/icons/interaction/copy.svg";

function CopyButton() {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={13} />
      <CopyIcon height={SCREEN_HEIGHT * (11 / DESIGN_HEIGHT)} />
      <SpaceFlexBox flex={4} />
      <Text style={styles.text}>코드 복사하기</Text>
      <SpaceFlexBox flex={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_WHITE,
    width: SCREEN_WIDTH * (91 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (26 / DESIGN_HEIGHT),

    borderRadius: SCREEN_HEIGHT * (13 / DESIGN_HEIGHT),

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 9.5,
    fontFamily: "Pretendard-SemiBold",
    color: COLOR_BASE_2,

    lineHeight: SCREEN_HEIGHT * (11 / DESIGN_HEIGHT),
  },
});

export { CopyButton };
