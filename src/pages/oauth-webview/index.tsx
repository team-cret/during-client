import { NavProp, ScreenProps } from '@/src/shared';
import { AppleOAuth } from './components/apple-auth-page';
import { GoogleOAuth } from './components/google-auth-page';
import { KakaoOAuth } from './components/kakao-auth-page';
import { NaverOAuth } from './components/naver-auth-page';
import { View } from 'react-native';

function OauthWebVewPage({
  navigation,
  route: { params },
}: {
  navigation: NavProp<'oauth/index'>;
  route: ScreenProps<'oauth/index'>['route'];
}) {
  return {
    NAVER: <NaverOAuth navigation={navigation} />,
    KAKAO: <KakaoOAuth navigation={navigation} />,
    APPLE: <AppleOAuth navigation={navigation} />,
    GOOGLE: <GoogleOAuth navigation={navigation} />,
  }[params.platform];
}

export { OauthWebVewPage };
