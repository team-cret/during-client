import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import { GOOGLE_OAUTH_CLIENT_ID, REDIRECT_URI } from '@env';
import { getGoogleToken, GOOGLE_OAUTH_SCOPE } from '@/src/entities';
import { getParamFromUrl, NavProp } from '@/src/shared';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("redirected")`;

function GoogleOAuth({ navigation }: { navigation: NavProp<'oauth/index'> }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        userAgent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Mobile Safari/537.36"
        source={{
          uri: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${GOOGLE_OAUTH_SCOPE}`,
        }}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        onMessage={async (event) => {
          const code = getParamFromUrl(event.nativeEvent.url, 'code');
          if (code === null) return;

          const token = await getGoogleToken(code);
          navigation.navigate('auth/index', {
            platform: 'GOOGLE',
            accessToken: token,
          });
        }}
      />
    </SafeAreaView>
  );
}

export { GoogleOAuth };
