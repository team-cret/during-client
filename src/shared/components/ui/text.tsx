import { Text, View } from "react-native";

import {
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
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
        width: SCREEN_WIDTH * (331 / DESIGN_WIDTH),
        height: SCREEN_HEIGHT * (129 / DESIGN_HEIGHT),

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
