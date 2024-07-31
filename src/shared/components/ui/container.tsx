import { View } from "react-native";

function SpaceFlexBox({ flex }: { flex: number }) {
  return <View style={{ flex: flex }} />;
}

function HorizontalSizedBox({ width }: { width: number }) {
  return <View style={{ width: width }} />;
}

export { SpaceFlexBox, HorizontalSizedBox };
