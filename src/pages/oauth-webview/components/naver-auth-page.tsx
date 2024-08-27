import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import { getParamFromUrl, NavProp } from '@/src/shared';
import { getNaverToken, NAVER_OAUTH_STATE } from '@/src/entities';
import { useAuthStore } from '@/src/features';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("redirected")`;

function NaverOAuth({ navigation }: { navigation: NavProp<'oauth/index'> }) {
  const { setAuth } = useAuthStore();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env
            .EXPO_PUBLIC_NAVER_CLIENT_ID!}&redirect_uri=${process.env
            .EXPO_PUBLIC_REDIRECT_URI!}&response_type=code&state=${NAVER_OAUTH_STATE}`,
        }}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        onMessage={async (event) => {
          const code = getParamFromUrl(event.nativeEvent.url, 'code');
          if (code === null) return;

          const token = await getNaverToken(code);
          setAuth({ accessToken: token });

          navigation.navigate('auth/index');
        }}
      />
    </SafeAreaView>
  );
}

export { NaverOAuth };
