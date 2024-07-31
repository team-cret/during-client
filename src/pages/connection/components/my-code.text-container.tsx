import { DESIGN_HEIGHT, SCREEN_HEIGHT, textStyles } from "@/src/shared";
import { StyleSheet, Text, View } from "react-native";

function TextContainer() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>나의 초대코드</Text>
      <Text style={styles.contentText}>DL3UBODAAD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * (67 / DESIGN_HEIGHT),
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  titleText: {
    ...textStyles.miniTitle,
    lineHeight: SCREEN_HEIGHT * (22 / DESIGN_HEIGHT),
  },

  contentText: {
    ...textStyles.title,
    lineHeight: SCREEN_HEIGHT * (42 / DESIGN_HEIGHT),
  },
});

export { TextContainer };
