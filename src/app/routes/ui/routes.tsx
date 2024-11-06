import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/src/shared';
import {
  AIChatPage,
  AuthPage,
  ConnectionPage,
  CreateReportPage,
  DecorateAvatarPage,
  DecorateRoomPage,
  InfoSetupPage,
  MainPage,
  MenuPage,
  NotificationPage,
  OauthWebVewPage,
  ProfilePage,
  ReportDetailPage,
  SettingPage,
  SplashPage,
  TermsOfServicePage,
  TutorialPage,
} from '@/src/pages';
import { ReportPage } from '@/src/pages/report-page';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootLayout() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="splash/index" component={SplashPage} />
      <RootStack.Screen name="auth/index" component={AuthPage} />
      <RootStack.Screen name="oauth/index" component={OauthWebVewPage} />
      <RootStack.Screen name="terms-of-service/index" component={TermsOfServicePage} />
      <RootStack.Screen name="info-setup/index" component={InfoSetupPage} />
      <RootStack.Screen name="connection/index" component={ConnectionPage} />
      <RootStack.Screen name="main/index" component={MainPage} />
      <RootStack.Screen name="menu/index" component={MenuPage} />
      <RootStack.Screen name="profile/index" component={ProfilePage} />
      <RootStack.Screen name="setting/index" component={SettingPage} />
      <RootStack.Screen name="notification/index" component={NotificationPage} />
      <RootStack.Screen name="decorate-avatar/index" component={DecorateAvatarPage} />
      <RootStack.Screen name="decorate-room/index" component={DecorateRoomPage} />
      <RootStack.Screen name="ai-chat/index" component={AIChatPage} />
      <RootStack.Screen name="report/index" component={ReportPage} />
      <RootStack.Screen name="report/create" component={CreateReportPage} />
      <RootStack.Screen name="report/detail" component={ReportDetailPage} />
      <RootStack.Screen name="tutorial/index" component={TutorialPage} />
    </RootStack.Navigator>
  );
}

export { RootLayout };
