import { CloseButton, convertHeight, convertWidth, SpaceFlexBox } from '@/src/shared';
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
    height: convertHeight(66),
    flexDirection: 'row',
    alignItems: 'center',
  },

  stepperContainer: {
    width: convertWidth(77),
    height: convertHeight(66),
    justifyContent: 'flex-end',
  },
});

export { InfoSetupAppBar };
