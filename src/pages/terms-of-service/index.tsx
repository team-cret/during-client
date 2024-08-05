import { StyleSheet, View } from 'react-native';

import { BarButtonGreen, COLOR_BACKGROUND, HeadLineText, SpaceFlexBox } from '@/src/shared';
import { BackCancelAppBar } from '@/src/widgets';
import { TermsOfService } from './components/terms-of-service';
import { useTermsOfServiceInputStore } from '@/src/features';

function TermsOfServicePage() {
  const { ifRequiredAllAgreed } = useTermsOfServiceInputStore();
  return (
    <View style={styles.container}>
      <BackCancelAppBar />
      <SpaceFlexBox flex={34} />
      {/* <div style={flex: 34}></div> */}

      <HeadLineText
        title={`동의 후 듀링의 다양한\n기능을 사용해 보세요.`}
        subTitle={`듀링에 오신 것을 환영합니다.`}
      />
      <SpaceFlexBox flex={77} />
      <TermsOfService />
      <SpaceFlexBox flex={40} />
      <BarButtonGreen
        text="동의하고 계속하기"
        onPress={() => {}}
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
