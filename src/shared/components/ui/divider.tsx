import { View } from "react-native";
import { BASE_3 } from "../../global";
import { SpaceFlexBox } from "./container";

function HorizontalDivider({
  width,
  height,
  lineWidth,
  upperFlex,
  lowerFlex,
  color = BASE_3,
}: {
  width: number;
  height: number;
  lineWidth: number;
  upperFlex: number;
  lowerFlex: number;
  color?: string;
}) {
  return (
    <View
      style={{
        width: width,
        height: height,
      }}
    >
      <SpaceFlexBox flex={upperFlex} />
      <View
        style={{
          width: "100%",
          height: lineWidth,
          backgroundColor: color,
        }}
      />
      <SpaceFlexBox flex={lowerFlex} />
    </View>
  );
}

export { HorizontalDivider };
