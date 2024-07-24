import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

type RootStackParamList = {
  "oauth/index": {
    platform: string | undefined;
    accessToken: string | undefined;
  };
  "oauth/kakao": undefined;
  "oauth/google": undefined;
  "oauth/naver": undefined;
  "oauth/apple": undefined;
  // Tasks: undefined;
  // Task: { id: number };
  // AddTask: undefined;
};

type ScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

type NavProp<Screen extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, Screen>;

export type { RootStackParamList, ScreenProps, NavProp };
