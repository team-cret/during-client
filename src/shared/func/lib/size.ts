import { Dimensions, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function useStatusbarHeight() {
  switch (Platform.OS) {
    case 'android':
      return StatusBar.currentHeight ?? 0;
    case 'ios':
      return useSafeAreaInsets().top;
    default:
      return 0;
  }
}

function useNavigationBarHeight() {
  switch (Platform.OS) {
    case 'android':
      return (
        Dimensions.get('screen').height - Dimensions.get('window').height - useStatusbarHeight()
      );
    case 'ios':
      return useSafeAreaInsets().bottom;
    default:
      return 0;
  }
}

export { useStatusbarHeight, useNavigationBarHeight };
