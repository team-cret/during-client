import { setMemberPushTokenAPI } from '@/src/entities';
import { useCoupleStore, useUserStore } from '@/src/features';
import { COLOR_BACKGROUND, NavProp } from '@/src/shared';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { registerForPushNotificationsAsync } from '../notification-test';
import LongLogoIcon from '@/src/shared/assets/icons/logo/logo-long.svg';

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
      if (id.length === 0) return;

      if (!requiredTermsAgreed) navigation.replace('terms-of-service/index');
      else if (birth === null || name === null) {
        navigation.replace('info-setup/index');
      } else if (role === 'ROLE_COUPLE') {
        getCoupleInfo().then((res) => {
          if (!res) navigation.replace('auth/index');
          else navigation.replace('main/index');
        });
      } else navigation.replace('main/index');
    }, [id])
  );

  return (
    <View style={styles.container}>
      <LongLogoIcon />
    </View>
  );
}

function SplashPageBeforeLoaded() {
  return (
    <View style={styles.container}>
      <LongLogoIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_BACKGROUND,
  },
});

export { SplashPage, SplashPageBeforeLoaded };
