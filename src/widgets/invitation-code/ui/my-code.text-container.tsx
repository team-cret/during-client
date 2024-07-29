import { DESIGN_HEIGHT, textStyles } from "@/src/shared";
import { Dimensions, StyleSheet, Text, View } from "react-native";

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
    height: Dimensions.get("window").height * (67 / DESIGN_HEIGHT),
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  titleText: {
    ...textStyles.miniTitle,
    lineHeight: Dimensions.get("window").height * (22 / DESIGN_HEIGHT),
  },

  contentText: {
    ...textStyles.title,
    lineHeight: Dimensions.get("window").height * (42 / DESIGN_HEIGHT),
  },
});

export { TextContainer };
