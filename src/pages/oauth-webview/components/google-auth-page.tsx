import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import { getGoogleToken, GOOGLE_OAUTH_SCOPE } from '@/src/entities';
import { getParamFromUrl, NavProp } from '@/src/shared';
import { useAuthStore } from '@/src/features';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("redirected")`;

function GoogleOAuth({ navigation }: { navigation: NavProp<'oauth/index'> }) {
  const { setAuth } = useAuthStore();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        userAgent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Mobile Safari/537.36"
        source={{
          uri: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env
            .EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!}&redirect_uri=${process.env
            .EXPO_PUBLIC_REDIRECT_URI!}&response_type=code&scope=${GOOGLE_OAUTH_SCOPE}`,
        }}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        onMessage={async (event) => {
          const code = getParamFromUrl(event.nativeEvent.url, 'code');
          if (code === null) return;

          const token = await getGoogleToken(code);
          setAuth({ accessToken: token });

          navigation.navigate('auth/index');
        }}
      />
    </SafeAreaView>
  );
}

export { GoogleOAuth };
