import {
  Dimensions,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
} from "react-native";

import {
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_PRIMARY_GREEN_DARK,
  COLOR_PRIMARY_GREEN,
  COLOR_BASE_1,
} from "../../global/index";

import CloseIcon from "@/src/shared/assets/icons/navigation/close.svg";
import BackIcon from "@/src/shared/assets/icons/navigation/back.svg";

////Icon Buttons
function CloseButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: Dimensions.get("window").height * (20 / DESIGN_HEIGHT),
        justifyContent: "center",
      }}
    >
      <CloseIcon />
    </Pressable>
  );
}

////Icon Tex Buttons
function BackIconTextButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        height: Dimensions.get("window").height * (16 / DESIGN_HEIGHT),
        width: Dimensions.get("window").width * (53 / DESIGN_WIDTH),
      }}
    >
      <BackIcon
        height={Dimensions.get("window").height * (6 / DESIGN_HEIGHT)}
      />

      <Text
        style={{
          fontSize: 12,
          color: COLOR_BASE_2,
          fontFamily: "Pretendard-Regular",

          lineHeight: Dimensions.get("window").height * (12 / DESIGN_HEIGHT),
        }}
      >
        뒤로가기
      </Text>
    </Pressable>
  );
}

////Toggle Buttons
function RadioButton({
  onPress,
  isSelected,
}: {
  onPress: () => void;
  isSelected: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...{
          height: Dimensions.get("window").height * (20 / DESIGN_HEIGHT),
          aspectRatio: 1,
          borderRadius: 100,
          // borderColor: isSelected ? "black" : "gray",
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: COLOR_BASE_3,
        },
        ...(isSelected
          ? {
              backgroundColor: "white",
              borderWidth: 3,
              borderColor: COLOR_PRIMARY_GREEN_DARK,
            }
          : {}),
      }}
    >
      {isSelected && (
        <View
          style={{
            width: Dimensions.get("window").width * (10 / DESIGN_WIDTH),
            height: Dimensions.get("window").height * (10 / DESIGN_HEIGHT),
            borderRadius: 100,

            backgroundColor: COLOR_PRIMARY_GREEN_DARK,
          }}
        />
      )}
    </Pressable>
  );
}

////Bar Buttons
function BarButtonGreen({
  onPress,
  text,
  ifDisabled = false,
}: {
  onPress: () => void;
  text: string;
  ifDisabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: Dimensions.get("window").height * (42 / DESIGN_HEIGHT),
        width: Dimensions.get("window").width * (331 / DESIGN_WIDTH),
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: ifDisabled ? COLOR_BASE_3 : COLOR_PRIMARY_GREEN,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Pretendard-SemiBold",
          color: ifDisabled ? COLOR_BASE_2 : COLOR_BASE_1,
          opacity: ifDisabled ? 0.3 : 1,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}

////Text Buttons
function TextButton({
  onPress,
  text,
  textStyle,
}: {
  onPress: () => void;
  text: string;
  textStyle: StyleProp<TextStyle>;
}) {
  return (
    <Pressable onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
}

export {
  CloseButton,
  BackIconTextButton,
  RadioButton,
  BarButtonGreen,
  TextButton,
};
