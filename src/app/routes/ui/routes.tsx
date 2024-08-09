import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/src/shared';
import {
  AuthPage,
  ConnectionPage,
  InfoSetupPage,
  MainPage,
  MenuPage,
  NotificationPage,
  OauthWebVewPage,
  ProfilePage,
  SettingPage,
  SplashPage,
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
      <RootStack.Screen name="profile/index" component={ProfilePage} />
      <RootStack.Screen name="setting/index" component={SettingPage} />
      <RootStack.Screen name="info-setup/index" component={InfoSetupPage} />
      <RootStack.Screen name="main/index" component={MainPage} />
      <RootStack.Screen name="splash/index" component={SplashPage} />
      <RootStack.Screen name="auth/index" component={AuthPage} />
      <RootStack.Screen name="oauth/index" component={OauthWebVewPage} />
      <RootStack.Screen name="terms-of-service/index" component={TermsOfServicePage} />
      <RootStack.Screen name="connection/index" component={ConnectionPage} />
      <RootStack.Screen name="menu/index" component={MenuPage} />
      <RootStack.Screen name="notification/index" component={NotificationPage} />
    </RootStack.Navigator>
  );
}

export { RootLayout };
