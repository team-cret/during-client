import { StyleSheet } from "react-native";
import { COLOR_BASE_1, COLOR_BASE_2 } from "../../global/lib/colors";

const textStyles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "Pretendard-SemiBold",
    color: COLOR_BASE_1,
  },

  subTitle: {
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    color: COLOR_BASE_2,
  },

  miniTitle: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    color: COLOR_BASE_1,
  },

  subText: {
    fontSize: 12,
    fontFamily: "Pretendard-Regular",
    color: COLOR_BASE_2,
  },
});

export { textStyles };
