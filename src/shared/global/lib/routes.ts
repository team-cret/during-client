import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  'splash/index': undefined;
  'auth/index': {
    platform: 'NAVER' | 'KAKAO' | 'APPLE' | 'GOOGLE' | null;
    accessToken: string | null;
  };
  'oauth/index': {
    platform: 'NAVER' | 'KAKAO' | 'APPLE' | 'GOOGLE';
  };
  'terms-of-service/index': undefined;
  'connection/index': undefined;
  'info-setup/index': undefined;
  'main/index': undefined;
  'menu/index': undefined;
  'setting/index': undefined;
  'profile/index': undefined;
  'notification/index': undefined;
};

type ScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

type NavProp<Screen extends keyof RootStackParamList> = NativeStackNavigationProp<
  RootStackParamList,
  Screen
>;

export type { RootStackParamList, ScreenProps, NavProp };
