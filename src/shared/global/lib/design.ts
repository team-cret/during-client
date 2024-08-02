import { Dimensions } from 'react-native';

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

function convertWidth(width: number): number {
  return SCREEN_WIDTH * (width / DESIGN_WIDTH);
}

function convertHeight(height: number): number {
  return SCREEN_HEIGHT * (height / DESIGN_HEIGHT);
}

export { convertWidth, convertHeight };
