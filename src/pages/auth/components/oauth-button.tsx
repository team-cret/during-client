import { Pressable, StyleSheet } from 'react-native';

import { convertHeight } from '@/src/shared';

import AuthIconNaver from '@/src/shared/assets/icons/oauth/naver.svg';
import AuthIconKakao from '@/src/shared/assets/icons/oauth/kakao.svg';
import AuthIconGoogle from '@/src/shared/assets/icons/oauth/google.svg';
import AuthIconApple from '@/src/shared/assets/icons/oauth/apple.svg';

function AuthButtonNAVER({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AuthIconNaver height="100%" />
    </Pressable>
  );
}

function AuthButtonKAKAO({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AuthIconKakao height="100%" />
    </Pressable>
  );
}

function AuthButtonGOOGLE({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AuthIconGoogle height="100%" />
    </Pressable>
  );
}

function AuthButtonAPPLE({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AuthIconApple height="100%" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: convertHeight(51),
    aspectRatio: 1,
  },
});

export { AuthButtonNAVER, AuthButtonKAKAO, AuthButtonGOOGLE, AuthButtonAPPLE };
