import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';

import {
  COLOR_BACKGROUND,
  convertHeight,
  convertWidth,
  HeadLineText,
  NavProp,
  ScreenProps,
  SpaceFlexBox,
} from '@/src/shared';
import { trySignInUpAPI } from '@/src/entities';
import { useNavigation } from 'expo-router';

function AuthPage({ route: { params } }: { route: ScreenProps<'auth/index'>['route'] }) {
  const navigation = useNavigation<NavProp<'auth/index'>>();

  useEffect(() => {
    if (params === undefined) return;
    if (params.platform === null || params.accessToken === null) return;

    trySignInUpAPI({
      accessToken: params.accessToken,
      platform: params.platform,
    }).then((res) => {
      if (!res) return;
      navigation.navigate('splash/index');
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
      <View style={styles.buttonsContainer}>
        <Pressable onPress={() => navigateToOAuth('KAKAO')}>
          <Image
            source={require('@/src/shared/assets/icons/oauth/kakao.png')}
            style={styles.button}
          />
        </Pressable>
        <Pressable onPress={() => navigateToOAuth('NAVER')}>
          <Image
            source={require('@/src/shared/assets/icons/oauth/naver.png')}
            style={styles.button}
          />
        </Pressable>
        <Pressable onPress={() => navigateToOAuth('APPLE')}>
          <Image
            source={require('@/src/shared/assets/icons/oauth/apple.png')}
            style={styles.button}
          />
        </Pressable>
        <Pressable onPress={() => navigateToOAuth('GOOGLE')}>
          <Image
            source={require('@/src/shared/assets/icons/oauth/google.png')}
            style={styles.button}
          />
        </Pressable>
      </View>
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

  buttonsContainer: {
    width: convertWidth(249),

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    height: convertHeight(51),
    aspectRatio: 1,
  },
});

export { AuthPage };
