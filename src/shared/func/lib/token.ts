// import EncryptedStorage from 'react-native-encrypted-storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

async function setUserToken({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  try {
    AsyncStorage.setItem('auth/token', JSON.stringify({ accessToken, refreshToken }));
    // await EncryptedStorage.setItem(
    //   'auth/token',
    //   JSON.stringify({
    //     accessToken,
    //     refreshToken,
    //   })
    // );
  } catch (error) {
    console.error(error);
  }
}

async function getUserToken() {
  try {
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
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { setUserToken, getUserToken };
