import { convertWidth, SpaceFlexBox } from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { Step } from './stepper.step';
import { useInfoInputStore } from '@/src/features';

function InfoSetupStepper() {
  const {
    birthDay: { ifValid: birthDayValid },
    nickName: { ifValid: nickNameValid },
    curStep,
  } = useInfoInputStore();
  return (
    <View style={styles.container}>
      <Step
        ifCurStep={curStep === 'birthDay'}
        ifValid={birthDayValid}
        stepNum={1}
        stepText="생일"
      />
      <Step
        ifCurStep={curStep === 'nickName'}
        ifValid={nickNameValid}
        stepNum={2}
        stepText="닉네임"
      />
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
