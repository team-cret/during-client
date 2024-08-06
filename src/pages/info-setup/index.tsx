import { BarButtonGreen, COLOR_BACKGROUND, NavProp, SpaceFlexBox } from '@/src/shared';
import { InfoSetupAppBar } from './components/app-bar';
import { StyleSheet, View } from 'react-native';
import { InputBirthday } from './components/input-birthday';
import { InputNickname } from './components/input-nickname';
import { useInfoInputStore, useUserStore } from '@/src/features';
import { useEffect } from 'react';
import { parse } from '@babel/core';
import { useNavigation } from 'expo-router';

function InfoSetupPage() {
  const navigation = useNavigation<NavProp<'info-setup/index'>>();

  const { curStep, ifCurStepValid, continueStep, setBirthDay, birthDay, nickName } =
    useInfoInputStore();

  const { birth, name, updateUserInfo } = useUserStore();
  useEffect(() => {
    if (birth !== null) {
      setBirthDay({
        year: birth.getFullYear().toString(),
        month: (birth.getMonth() + 1).toString(),
        day: birth.getDate().toString(),
      });
      continueStep();
    }
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
