import { View } from 'react-native';

function SpaceFlexBox({ flex }: { flex: number }) {
  return <View style={{ flex: flex }} />;
}

function HorizontalSizedBox({ width }: { width: number }) {
  return <View style={{ width: width }} />;
}

function VerticalSizedBox({ height }: { height: number }) {
  return <View style={{ height: height }} />;
}

export { SpaceFlexBox, HorizontalSizedBox, VerticalSizedBox };
