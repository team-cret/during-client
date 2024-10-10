import {
  COLOR_BACKGROUND,
  convertHeight,
  HeadLineText,
  NavProp,
  TextButton,
  textStyles,
  VerticalSizedBox,
} from '@/src/shared';
import { BackCancelAppBar } from '@/src/widgets';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { MyInvitationCode } from './components/my-code';
import { InvitationCodeInput } from './components/code-input';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native';

function ConnectionPage() {
  const navigation = useNavigation<NavProp<'connection/index'>>();
  return (
    <KeyboardAvoidingView
      // style={styles.bodyContainer}
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={convertHeight(50)}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <BackCancelAppBar
              onBackPressed={() => {
                navigation.pop();
              }}
              onCancelPressed={() => {
                navigation.pop();
              }}
            />
            <VerticalSizedBox height={convertHeight(34)} />
            <HeadLineText
              title={`듀링에 연인을 초대하고\n행복한 대화를 나눠요.`}
              subTitle={`나의 초대코드로 초대 또는 연인 초대코드\n입력으로 연결을 완료할 수 있습니다.`}
            />
            <VerticalSizedBox height={convertHeight(42)} />
            <MyInvitationCode />
            <VerticalSizedBox height={convertHeight(17)} />
            <Text style={textStyles.subText}>혹은</Text>
            <VerticalSizedBox height={convertHeight(12)} />
            <InvitationCodeInput />
            <VerticalSizedBox height={convertHeight(21)} />
            <TextButton
              text="복구하기"
              onPress={() => {}}
              textStyle={[textStyles.subText, { opacity: 0 }]}
            />
            <VerticalSizedBox height={convertHeight(40)} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    justifyContent: 'flex-end',
    height: '100%',
  },

  innerContainer: {
    alignItems: 'center',
  },
});

export { ConnectionPage };
