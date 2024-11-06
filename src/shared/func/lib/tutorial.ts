import AsyncStorage from '@react-native-async-storage/async-storage';

async function setTutorialDone() {
  AsyncStorage.setItem('tutorial/done', 'true');
}

async function getTutorialDone(): Promise<boolean> {
  const done = await AsyncStorage.getItem('tutorial/done');
  return done === 'true';
}

export { setTutorialDone, getTutorialDone };
