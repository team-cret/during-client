import { useCoupleStore, useUserStore } from '@/src/features';
import { NavProp } from '@/src/shared';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';

function SplashPage() {
  const { requiredTermsAgreed, birth, name, getUserInfo, role, id } = useUserStore();
  const { getCoupleInfo } = useCoupleStore();
  const navigation = useNavigation<NavProp<'splash/index'>>();

  useFocusEffect(
    useCallback(() => {
      getUserInfo().then((res) => {
        if (!res) navigation.navigate('auth/index');
      });
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (!requiredTermsAgreed) navigation.navigate('terms-of-service/index');
      else if (birth === null || name === null) navigation.navigate('info-setup/index');
      else if (role === 'ROLE_COUPLE') {
        getCoupleInfo().then((res) => {
          if (!res) navigation.navigate('auth/index');
          else navigation.navigate('main/index');
        });
      } else navigation.navigate('main/index');
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
