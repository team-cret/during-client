import { StyleSheet, View } from 'react-native';
import { convertWidth } from '@/src/shared';
import {
  AuthButtonAPPLE,
  AuthButtonGOOGLE,
  AuthButtonKAKAO,
  AuthButtonNAVER,
} from './oauth-button';

function ButtonRow({
  navigateToOAuth,
}: {
  navigateToOAuth: (platform: 'NAVER' | 'KAKAO' | 'APPLE' | 'GOOGLE') => void;
}) {
  return (
    <View style={styles.container}>
      <AuthButtonKAKAO
        onPress={() => {
          navigateToOAuth('KAKAO');
        }}
      />
      <AuthButtonNAVER
        onPress={() => {
          navigateToOAuth('NAVER');
        }}
      />
      <AuthButtonAPPLE
        onPress={() => {
          navigateToOAuth('APPLE');
        }}
      />
      <AuthButtonGOOGLE
        onPress={() => {
          navigateToOAuth('GOOGLE');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: convertWidth(249),

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export { ButtonRow };
