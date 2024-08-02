import { convertWidth, SpaceFlexBox } from '@/src/shared';
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
    width: convertWidth(77),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export { InfoSetupStepper };
