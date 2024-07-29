import { View } from "react-native";

import {
  BackIconTextButton,
  CloseButton,
  DESIGN_HEIGHT,
  SCREEN_HEIGHT,
  SpaceFlexBox,
} from "@/src/shared";

function InfoSetupAppBar() {
  return (
    <View
      style={{
        width: "100%",
        height: SCREEN_HEIGHT * (66 / DESIGN_HEIGHT),

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SpaceFlexBox flex={24} />
      <BackIconTextButton onPress={() => {}} />
      <SpaceFlexBox flex={245} />
      <CloseButton onPress={() => {}} />
      <SpaceFlexBox flex={24} />
    </View>
  );
}

export { InfoSetupAppBar };
