import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/src/shared';
import {
  AppleAuthPage,
  AuthPage,
  ConnectionPage,
  GoogleAuthPage,
  InfoSetupPage,
  KakaoAuthPage,
  NaverAuthPage,
  TermsOfServicePage,
} from '@/src/pages';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootLayout() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="info-setup/index" component={InfoSetupPage} />
      <RootStack.Screen name="oauth/index" component={AuthPage} />
      <RootStack.Screen name="oauth/KAKAO" component={KakaoAuthPage} />
      <RootStack.Screen name="oauth/GOOGLE" component={GoogleAuthPage} />
      <RootStack.Screen name="oauth/NAVER" component={NaverAuthPage} />
      <RootStack.Screen name="oauth/APPLE" component={AppleAuthPage} />

      <RootStack.Screen name="terms-of-service/index" component={TermsOfServicePage} />

      <RootStack.Screen name="connection/index" component={ConnectionPage} />
    </RootStack.Navigator>
  );
}

export { RootLayout };
