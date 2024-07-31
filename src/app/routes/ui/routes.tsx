import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/src/shared';
import {
  AuthPage,
  ConnectionPage,
  InfoSetupPage,
  OauthWebVewPage,
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
      <RootStack.Screen name="auth/index" component={AuthPage} />
      <RootStack.Screen name="info-setup/index" component={InfoSetupPage} />
      <RootStack.Screen name="oauth/index" component={OauthWebVewPage} />

      <RootStack.Screen name="terms-of-service/index" component={TermsOfServicePage} />

      <RootStack.Screen name="connection/index" component={ConnectionPage} />
    </RootStack.Navigator>
  );
}

export { RootLayout };
