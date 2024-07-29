import { Dimensions, Text, View } from "react-native";

import {
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  COLOR_BASE_2,
  COLOR_BASE_1,
} from "../../global/index";
import { textStyles } from "../../styles/lib/text";

function HeadLineText({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <View
      style={{
        width: Dimensions.get("window").width * (331 / DESIGN_WIDTH),
        height: Dimensions.get("window").height * (129 / DESIGN_HEIGHT),

        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          ...textStyles.title,
          ...{
            width: "100%",
            height: "59.15%",
          },
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          ...textStyles.subTitle,
          ...{
            width: "100%",
            height: "30.98%",
          },
        }}
      >
        {subTitle}
      </Text>
    </View>
  );
}

export { HeadLineText };
