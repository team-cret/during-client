import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";

import {
  HeadLineText,
  NavProp,
  Platform,
  ScreenProps,
  SpaceFlexBox,
} from "@/src/shared";
import { trySignInUp } from "@/src/entities";
import { OauthButtonRow } from "@/src/widgets";

function AuthPage({
  navigation,
  route: { params },
}: {
  navigation: NavProp<"oauth/index">;
  route: ScreenProps<"oauth/index">["route"];
}) {
  useEffect(() => {
    if (params === undefined) return;
    if (params.platform === null || params.accessToken === null) return;

    trySignInUp({
      accessToken: params.accessToken,
      platform: params.platform,
    });
  }, [params]);

  function navigateToOAuth(platform: Platform) {
    navigation.navigate(`oauth/${platform}`);
  }

  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={12.31} />
      <HeadLineText
        title={`사용자 인증을\n완료해 주세요.`}
        subTitle={`듀링에 오신 것을 환영합니다.`}
      />
      <SpaceFlexBox flex={51.23} />
      <OauthButtonRow navigateToOAuth={navigateToOAuth} />
      <SpaceFlexBox flex={5.42} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
});

export { AuthPage };
