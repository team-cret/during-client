import {
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SpaceFlexBox,
} from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { Step } from './stepper.step';

function InfoSetupStepper() {
  return (
    <View style={styles.container}>
      <Step />
      <Step />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * (77 / DESIGN_WIDTH),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export { InfoSetupStepper };
