import { BarButtonGreen, COLOR_BACKGROUND, SpaceFlexBox } from '@/src/shared';
import { InfoSetupAppBar } from './components/app-bar';
import { StyleSheet, View } from 'react-native';
import { InputBirthday } from './components/input-birthday';
import { InputNickname } from './components/input-nickname';
import { useInfoInputStore } from '@/src/features';

function InfoSetupPage() {
  const { curStep, ifCurStepValid, continueStep } = useInfoInputStore();
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={45} />
      <InfoSetupAppBar />

      {curStep === 'birthDay' ? <InputBirthday /> : <InputNickname />}

      <BarButtonGreen text="완료" onPress={continueStep} ifDisabled={!ifCurStepValid} />
      <SpaceFlexBox flex={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    alignItems: 'center',
  },
});

export { InfoSetupPage };
