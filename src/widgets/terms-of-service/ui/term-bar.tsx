import {
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  COLOR_BASE_1,
  RadioButton,
  COLOR_PRIMARY_GREEN_DARK,
  COLOR_BASE_2,
  HorizontalSizedBox,
  SpaceFlexBox,
} from "@/src/shared";
import { Pressable } from "react-native";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import NavigateIcon from "@/src/shared/assets/icons/navigation/navigate.svg";

function TermTotalBar({
  isSelected,
  radioOnPress,
}: {
  isSelected: boolean;
  radioOnPress: () => void;
}) {
  return (
    <View style={stylesTermTotalBar.container}>
      <Text style={stylesTermTotalBar.title}>약관 전체동의</Text>
      <RadioButton onPress={radioOnPress} isSelected={isSelected} />
    </View>
  );
}

const stylesTermTotalBar = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * (327 / DESIGN_WIDTH),
    height: Dimensions.get("window").height * (44 / DESIGN_HEIGHT),

    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    color: COLOR_BASE_1,
  },
});

function TermBar({
  isSelected,
  term,
  radioOnPress,
}: {
  isSelected: boolean;
  term: {
    type: "required" | "optional";
    title: string;
    subTitle: string;
  };
  radioOnPress: () => void;
}) {
  return (
    <View style={stylesTermBar.container}>
      {term.type === "required" ? (
        <Text style={stylesTermBar.TextRequired}>필수</Text>
      ) : (
        <Text style={stylesTermBar.TextOption}>선택</Text>
      )}
      <View style={stylesTermBar.TermsContainer}>
        <Pressable style={stylesTermBar.TermButtonContainer}>
          <Text style={stylesTermBar.TermTitle}>{term.title}</Text>
          <HorizontalSizedBox
            width={Dimensions.get("window").width * (9 / DESIGN_WIDTH)}
          />
          <NavigateIcon
            height={Dimensions.get("window").height * (6 / DESIGN_HEIGHT)}
          />
        </Pressable>
        <Text style={stylesTermBar.TermSubTitle}>{term.subTitle}</Text>
      </View>
      <RadioButton onPress={radioOnPress} isSelected={isSelected} />
    </View>
  );
}

const stylesTermBar = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * (327 / DESIGN_WIDTH),
    height: Dimensions.get("window").height * (44 / DESIGN_HEIGHT),
    marginTop: Dimensions.get("window").height * (21 / DESIGN_HEIGHT),

    flexDirection: "row",
    justifyContent: "space-between",
  },

  TextRequired: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    color: COLOR_PRIMARY_GREEN_DARK,
  },

  TextOption: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    color: COLOR_BASE_2,
  },

  TermsContainer: {
    width: Dimensions.get("window").width * (244 / DESIGN_WIDTH),
    height: "100%",
  },

  TermButtonContainer: {
    flexDirection: "row",

    alignItems: "center",
  },

  TermTitle: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    color: COLOR_BASE_1,
  },

  TermSubTitle: {
    marginTop: Dimensions.get("window").height * (5 / DESIGN_HEIGHT),
    fontSize: 12,
    fontFamily: "Pretendard-Regular",
    color: COLOR_BASE_2,
  },
});

export { TermTotalBar, TermBar };
