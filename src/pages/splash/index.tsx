import { useUserStore } from '@/src/features';
import { NavProp } from '@/src/shared';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

function SplashPage({ navigation }: { navigation: NavProp<'splash/index'> }) {
  const { id, requiredTermsAgreed, birth, name, getUserInfo } = useUserStore();

  useFocusEffect(() => {
    getUserInfo().then((res) => {
      if (!res) navigation.navigate('auth/index', { platform: null, accessToken: null });
    });
  });

  useEffect(() => {
    if (!requiredTermsAgreed) navigation.navigate('terms-of-service/index');
    else if (!birth || !name) navigation.navigate('info-setup/index');
    else navigation.navigate('main/index');
  }, [id]);

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
}

export { SplashPage };
