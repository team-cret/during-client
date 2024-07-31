import {
  CloseButton,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SpaceFlexBox,
} from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { InfoSetupStepper } from './stepper';

function InfoSetupAppBar() {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={23} />
      <View style={styles.stepperContainer}>
        <InfoSetupStepper />
      </View>
      <SpaceFlexBox flex={223} />
      <CloseButton
        onPress={() => {
          //enable 안됐을 때 처리하기
        }}
      />
      <SpaceFlexBox flex={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SCREEN_HEIGHT * (66 / DESIGN_HEIGHT),
    flexDirection: 'row',
    alignItems: 'center',
  },

  stepperContainer: {
    width: SCREEN_WIDTH * (77 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (66 / DESIGN_HEIGHT),
    justifyContent: 'flex-end',
  },
});

export { InfoSetupAppBar };
