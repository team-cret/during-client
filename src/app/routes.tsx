import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/src/shared";
import {
  AppleAuthPage,
  AuthPage,
  GoogleAuthPage,
  KakaoAuthPage,
  NaverAuthPage,
  TermsOfServicePage,
} from "@/src/pages";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="oauth/index"
        component={AuthPage}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="oauth/KAKAO"
        component={KakaoAuthPage}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="oauth/GOOGLE"
        component={GoogleAuthPage}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="oauth/NAVER"
        component={NaverAuthPage}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="oauth/APPLE"
        component={AppleAuthPage}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="info-setup/terms-of-service"
        component={TermsOfServicePage}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
}
