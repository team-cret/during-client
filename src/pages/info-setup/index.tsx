import { BarButtonGreen, COLOR_BACKGROUND, convertHeight, NavProp } from '@/src/shared';
import { InfoSetupAppBar } from './components/app-bar';
import { StyleSheet, View } from 'react-native';
import { InputBirthday } from './components/input-birthday';
import { InputNickname } from './components/input-nickname';
import { useInfoInputStore, useUserStore } from '@/src/features';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';

function InfoSetupPage() {
  const navigation = useNavigation<NavProp<'info-setup/index'>>();

  const { curStep, ifCurStepValid, setBirthDay, birthDay, nickName, setCurStep, continueStep } =
    useInfoInputStore();

  const { birth, name, updateUserInfo } = useUserStore();
  useEffect(() => {
    if (birth === null) return;
    setBirthDay({
      year: birth.getFullYear().toString(),
      month: (birth.getMonth() + 1).toString(),
      day: birth.getDate().toString(),
    });
    setCurStep('nickName');

    if (name === null) return;
    setCurStep('done');
  }, [birth, name]);

  useEffect(() => {
    if (curStep === 'done') {
      updateUserInfo({
        birthday: {
          year: birthDay.year,
          month: birthDay.month,
          day: birthDay.day,
        },
        nickname: nickName.nickName,
        ifRequiredAgreed: [],
        ifOptionalAgreed: [],
      }).then((res) => {
        if (res) navigation.navigate('main/index');
      });
    }
  }, [curStep]);

  return (
    <View style={styles.container}>
      <InfoSetupAppBar />

      {curStep === 'birthDay' ? <InputBirthday /> : <InputNickname />}

      <View style={styles.barButtonContainer}>
        <BarButtonGreen text="완료" onPress={continueStep} ifDisabled={!ifCurStepValid} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    alignItems: 'center',
  },

  barButtonContainer: {
    position: 'absolute',
    bottom: convertHeight(46),
  },
});

export { InfoSetupPage };
