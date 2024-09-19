// import EncryptedStorage from 'react-native-encrypted-storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

async function setUserToken({
  accessToken,
  refreshToken,
}: {
  accessToken: string | null;
  refreshToken: string | null;
}) {
  AsyncStorage.setItem('auth/token', JSON.stringify({ accessToken, refreshToken }));
  // await EncryptedStorage.setItem(
  //   'auth/token',
  //   JSON.stringify({
  //     accessToken,
  //     refreshToken,
  //   })
  // );
}

async function getUserToken(): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> {
  // const token = await EncryptedStorage.getItem('auth/token');
  const token = await AsyncStorage.getItem('auth/token');
  if (token === null) return null;
  const tokenJson = JSON.parse(token);

  if (tokenJson['accessToken'] === null) return null;
  if (tokenJson['refreshToken'] === null) return null;

  return {
    accessToken: tokenJson['accessToken'],
    refreshToken: tokenJson['refreshToken'],
  };
}

export { setUserToken, getUserToken };
