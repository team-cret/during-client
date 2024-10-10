import { NavProp, ScreenProps } from '@/src/shared';
import { AppleOAuth } from './components/apple-auth-page';
import { GoogleOAuth } from './components/google-auth-page';
import { KakaoOAuth } from './components/kakao-auth-page';
import { NaverOAuth } from './components/naver-auth-page';
import { View } from 'react-native';
import { useNavigation } from 'expo-router';
import { useAuthStore } from '@/src/features';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

function OauthWebVewPage() {
  const navigation = useNavigation<NavProp<'oauth/index'>>();
  const { platform } = useAuthStore();

  useFocusEffect(
    useCallback(() => {
      if (platform === null) navigation.navigate('auth/index');
    }, [platform])
  );

  if (platform === null) {
    return <View />;
  } else {
    return {
      NAVER: <NaverOAuth navigation={navigation} />,
      KAKAO: <KakaoOAuth navigation={navigation} />,
      APPLE: <AppleOAuth navigation={navigation} />,
      GOOGLE: <GoogleOAuth navigation={navigation} />,
    }[platform];
  }
}

export { OauthWebVewPage };
