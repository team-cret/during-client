import { RootLayout } from './routes/index';
import { useFonts } from 'expo-font';
import { SplashPage, SplashPageBeforeLoaded } from '@/src/pages';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Pretendard-Black': require('@/src/shared/assets/font/Pretendard-Black.otf'),
    'Pretendard-Bold': require('@/src/shared/assets/font/Pretendard-Bold.otf'),
    'Pretendard-ExtraBold': require('@/src/shared/assets/font/Pretendard-ExtraBold.otf'),
    'Pretendard-Light': require('@/src/shared/assets/font/Pretendard-Light.otf'),
    'Pretendard-Medium': require('@/src/shared/assets/font/Pretendard-Medium.otf'),
    'Pretendard-Regular': require('@/src/shared/assets/font/Pretendard-Regular.otf'),
    'Pretendard-SemiBold': require('@/src/shared/assets/font/Pretendard-SemiBold.otf'),
    'Pretendard-Thin': require('@/src/shared/assets/font/Pretendard-Thin.otf'),
  });

  if (!fontsLoaded) return <SplashPageBeforeLoaded />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayout />
    </GestureHandlerRootView>
  );
}
