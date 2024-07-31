import {
  COLOR_BASE_2,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/src/shared";
import { StyleSheet, Text, View } from "react-native";

function Step() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}></View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>닉네임</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * (26 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (40 / DESIGN_HEIGHT),

    justifyContent: "space-between",
    alignItems: "center",
  },

  iconContainer: {
    height: SCREEN_HEIGHT * (20 / DESIGN_HEIGHT),
    aspectRatio: 1,
    borderRadius: 100,

    backgroundColor: "blue",
  },

  textContainer: {
    width: SCREEN_WIDTH * (26 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (16 / DESIGN_HEIGHT),
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 10,
    fontFamily: "Pretendard-Regular",
    color: COLOR_BASE_2,

    textAlign: "center",
  },
});

export { Step };
