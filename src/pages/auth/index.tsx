import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';

import { COLOR_BACKGROUND, HeadLineText, NavProp, ScreenProps, SpaceFlexBox } from '@/src/shared';
import { trySignInUp } from '@/src/entities';
import { ButtonRow } from './components/button-row';

function AuthPage({
  navigation,
  route: { params },
}: {
  navigation: NavProp<'auth/index'>;
  route: ScreenProps<'auth/index'>['route'];
}) {
  useEffect(() => {
    if (params === undefined) return;
    if (params.platform === null || params.accessToken === null) return;

    trySignInUp({
      accessToken: params.accessToken,
      platform: params.platform,
    }).then((res) => {
      console.log(res);
    });
  }, [params]);

  function navigateToOAuth(platform: 'NAVER' | 'KAKAO' | 'APPLE' | 'GOOGLE') {
    navigation.navigate(`oauth/index`, { platform });
  }

  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={12.31} />
      <HeadLineText
        title={`사용자 인증을\n완료해 주세요.`}
        subTitle={`듀링에 오신 것을 환영합니다.`}
      />
      <SpaceFlexBox flex={51.23} />
      <ButtonRow navigateToOAuth={navigateToOAuth} />
      <SpaceFlexBox flex={5.42} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: COLOR_BACKGROUND,
  },
});

export { AuthPage };
