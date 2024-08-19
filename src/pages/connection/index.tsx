import {
  COLOR_BACKGROUND,
  convertHeight,
  HeadLineText,
  SpaceFlexBox,
  TextButton,
  textStyles,
} from '@/src/shared';
import { BackCancelAppBar } from '@/src/widgets';
import { StyleSheet, Text, View } from 'react-native';
import { MyInvitationCode } from './components/my-code';
import { InvitationCodeInput } from './components/code-input';

function ConnectionPage() {
  return (
    <View style={styles.container}>
      <BackCancelAppBar backDisabled />
      <SpaceFlexBox flex={34} />
      <HeadLineText
        title={`듀링에 연인을 초대하고\n행복한 대화를 나눠요.`}
        subTitle={`나의 초대코드로 초대 또는 연인 초대코드\n입력으로 연결을 완료할 수 있습니다.`}
      />
      <SpaceFlexBox flex={42} />
      <MyInvitationCode />
      <SpaceFlexBox flex={17} />
      <Text style={textStyles.subText}>혹은</Text>
      <SpaceFlexBox flex={12} />
      <InvitationCodeInput />
      <SpaceFlexBox flex={21} />
      <TextButton text="복구하기" onPress={() => {}} textStyle={textStyles.subText} />
      <SpaceFlexBox flex={38} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLOR_BACKGROUND,
  },
});

export { ConnectionPage };
