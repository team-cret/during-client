import { convertHeight, convertWidth, HeadLineText, SpaceFlexBox } from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { BirthdayTextInput } from './input-birthday.text-input';

function InputBirthday() {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={34} />
      <HeadLineText title={`생년월일을\n입력해주세요`} subTitle={`듀링에 오신 것을 환영합니다.`} />
      <SpaceFlexBox flex={42} />
      <BirthdayTextInput />
      <SpaceFlexBox flex={310} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(613),

    alignItems: 'center',
  },
});

export { InputBirthday };
