import { setMemberPushTokenAPI } from '@/src/entities';
import { useCoupleStore, useUserStore } from '@/src/features';
import { NavProp } from '@/src/shared';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { registerForPushNotificationsAsync } from '../notification-test';

function SplashPage() {
  const { requiredTermsAgreed, birth, name, getUserInfo, role, id } = useUserStore();
  const { getCoupleInfo } = useCoupleStore();
  const navigation = useNavigation<NavProp<'splash/index'>>();

  useFocusEffect(
    useCallback(() => {
      registerForPushNotificationsAsync().then((pushToken) => {
        if (pushToken) setMemberPushTokenAPI({ pushToken });
      });
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      getUserInfo().then((res) => {
        if (!res) navigation.replace('auth/index');
      });
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (!requiredTermsAgreed) navigation.replace('terms-of-service/index');
      else if (birth === null || name === null) navigation.replace('info-setup/index');
      else if (role === 'ROLE_COUPLE') {
        getCoupleInfo().then((res) => {
          if (!res) navigation.replace('auth/index');
          else navigation.replace('main/index');
        });
      } else navigation.replace('main/index');
    }, [id])
  );

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
}

function SplashPageBeforeLoaded() {
  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
}

export { SplashPage, SplashPageBeforeLoaded };
