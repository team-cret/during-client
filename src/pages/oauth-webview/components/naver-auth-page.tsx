import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import { NAVER_CLIENT_ID, REDIRECT_URI } from '@env';
import { getParamFromUrl, NavProp } from '@/src/shared';
import { getNaverToken, NAVER_OAUTH_STATE } from '@/src/entities';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("redirected")`;

function NaverOAuth({ navigation }: { navigation: NavProp<'oauth/index'> }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${NAVER_OAUTH_STATE}`,
        }}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        onMessage={async (event) => {
          const code = getParamFromUrl(event.nativeEvent.url, 'code');
          if (code === null) return;
          const token = await getNaverToken(code);
          navigation.navigate('auth/index', {
            platform: 'NAVER',
            accessToken: token,
          });
        }}
      />
    </SafeAreaView>
  );
}

export { NaverOAuth };
