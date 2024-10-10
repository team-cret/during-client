import { View } from 'react-native';
import { COLOR_BASE_3 } from '../../global';
import { SpaceFlexBox } from './container';

/**
 * HorizontalDivider component
 * @param width width of the divider
 * @param height height of the divider
 * @param lineHeight height of the line
 * @param upperFlex flex of the upper space
 * @param lowerFlex flex of the lower space
 * @param color color of the line
 */
function HorizontalDivider({
  width,
  height,
  lineHeight,
  upperFlex,
  lowerFlex,
  color = COLOR_BASE_3,
}: {
  width: number;
  height: number;
  lineHeight: number;
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
          width: '100%',
          height: lineHeight,
          backgroundColor: color,
        }}
      />
      <SpaceFlexBox flex={lowerFlex} />
    </View>
  );
}

export { HorizontalDivider };
