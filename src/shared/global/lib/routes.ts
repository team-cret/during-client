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
  "oauth/KAKAO": undefined;
  "oauth/GOOGLE": undefined;
  "oauth/NAVER": undefined;
  "oauth/APPLE": undefined;
  "terms-of-service/index": undefined;
  "connection/index": undefined;
  "info-setup/index": undefined;
};

type ScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

type NavProp<Screen extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, Screen>;

export type { RootStackParamList, ScreenProps, NavProp };
