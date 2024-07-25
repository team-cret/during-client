import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Platform } from "@/src/shared";

type RootStackParamList = {
  "oauth/index": {
    platform: Platform | null;
    accessToken: string | null;
  };
  "oauth/kakao": undefined;
  "oauth/google": undefined;
  "oauth/naver": undefined;
  "oauth/apple": undefined;
};

type ScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

type NavProp<Screen extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, Screen>;

export type { RootStackParamList, ScreenProps, NavProp };
