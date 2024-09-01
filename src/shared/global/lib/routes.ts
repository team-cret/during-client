import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  'splash/index': undefined;
  'auth/index': undefined;
  'oauth/index': undefined;
  'terms-of-service/index': undefined;
  'connection/index': undefined;
  'info-setup/index': undefined;
  'main/index': undefined;
  'menu/index': undefined;
  'setting/index': undefined;
  'profile/index': undefined;
  'notification/index': undefined;
  'decorate-room/index': undefined;
  'decorate-avatar/index': undefined;
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
