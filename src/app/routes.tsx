import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/src/shared";
import {
  AppleAuthPage,
  AuthPage,
  GoogleAuthPage,
  KakaoAuthPage,
  NaverAuthPage,
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
        name="oauth/kakao"
        component={KakaoAuthPage}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="oauth/google"
        component={GoogleAuthPage}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="oauth/naver"
        component={NaverAuthPage}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="oauth/apple"
        component={AppleAuthPage}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
}
