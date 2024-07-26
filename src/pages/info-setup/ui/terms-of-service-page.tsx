import { StyleSheet, View } from "react-native";

import { BarButtonGreen, HeadLineText, SpaceFlexBox } from "@/src/shared";
import { InfoSetupAppBar, TermsOfService } from "@/src/widgets";

function TermsOfServicePage() {
  return (
    <View style={styles.container}>
      <InfoSetupAppBar />
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
        onPress={() => {}}
        ifDisabled={false}
      />
      <SpaceFlexBox flex={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  barButtonContainer: {
    backgroundColor: "tomato",
    width: "100%",
    height: "5.17%",
  },
});

export { TermsOfServicePage };
