import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import { getParamFromUrl, NavProp } from '@/src/shared';
import { useAuthStore } from '@/src/features';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("redirected")`;

function AppleOAuth({ navigation }: { navigation: NavProp<'oauth/index'> }) {
  const { setAuth } = useAuthStore();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://appleid.apple.com/auth/authorize?client_id=${process.env
            .EXPO_PUBLIC_APPLE_CLIENT_ID!}&redirect_uri=${process.env
            .EXPO_PUBLIC_REDIRECT_URI!}&response_type=code`,
        }}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        onMessage={async (event) => {
          const code = getParamFromUrl(event.nativeEvent.url, 'code');
          if (code === null) return;
          setAuth({ accessToken: code });
          navigation.navigate('auth/index');
        }}
      />
    </SafeAreaView>
  );
}

export { AppleOAuth };
