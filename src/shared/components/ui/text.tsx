import { Dimensions, Text, View } from "react-native";

import {
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  BASE_2,
  BASE_1,
} from "../../global/index";

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
      <View
        style={{
          width: "100%",
          height: "59.15%",
        }}
      >
        <TitleText text={title} />
      </View>
      <View
        style={{
          width: "100%",
          height: "30.98%",
        }}
      >
        <SubTitleText text={subTitle} />
      </View>
    </View>
  );
}

function TitleText({ text }: { text: string }) {
  return (
    <Text
      style={{
        fontSize: 30,
        fontWeight: 600,
        color: BASE_1,
      }}
    >
      {text}
    </Text>
  );
}

function SubTitleText({ text }: { text: string }) {
  return (
    <Text
      style={{
        fontSize: 14,
        fontWeight: 500,
        color: BASE_2,
      }}
    >
      {text}
    </Text>
  );
}

export { HeadLineText };
