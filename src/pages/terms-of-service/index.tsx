import { StyleSheet, View } from 'react-native';

import {
  BarButtonGreen,
  COLOR_BACKGROUND,
  HeadLineText,
  NavProp,
  SpaceFlexBox,
  termsOptional,
  termsRequired,
} from '@/src/shared';
import { BackCancelAppBar } from '@/src/widgets';
import { TermsOfService } from './components/terms-of-service';
import { useTermsOfServiceInputStore, useUserStore } from '@/src/features';
import { useNavigation } from 'expo-router';

function TermsOfServicePage() {
  const { ifRequiredAllAgreed, ifOptionalAgreed, ifRequiredAgreed } = useTermsOfServiceInputStore();
  const { updateUserInfo } = useUserStore();

  const navigation = useNavigation<NavProp<'terms-of-service/index'>>();
  return (
    <View style={styles.container}>
      <BackCancelAppBar
        onCancelPressed={() => {
          navigation.navigate('auth/index', { platform: null, accessToken: null });
        }}
      />
      <SpaceFlexBox flex={34} />

      <HeadLineText
        title={`동의 후 듀링의 다양한\n기능을 사용해 보세요.`}
        subTitle={`듀링에 오신 것을 환영합니다.`}
      />
      <SpaceFlexBox flex={77} />
      <TermsOfService />
      <SpaceFlexBox flex={40} />
      <BarButtonGreen
        text="동의하고 계속하기"
        onPress={() => {
          updateUserInfo({
            ifRequiredAgreed,
            ifOptionalAgreed,
          }).then((res) => {
            if (res) navigation.navigate('info-setup/index');
          });
        }}
        ifDisabled={!ifRequiredAllAgreed}
      />
      <SpaceFlexBox flex={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR_BACKGROUND,
  },
});

export { TermsOfServicePage };
