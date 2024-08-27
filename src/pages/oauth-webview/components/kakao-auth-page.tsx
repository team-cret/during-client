import { getKakaoToken } from '@/src/entities';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import { getParamFromUrl, NavProp } from '@/src/shared';
import { useAuthStore } from '@/src/features';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("redirected")`;

function KakaoOAuth({ navigation }: { navigation: NavProp<'oauth/index'> }) {
  const { setAuth } = useAuthStore();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env
            .EXPO_PUBLIC_KAKAO_REST_API_KEY!}&redirect_uri=${process.env
            .EXPO_PUBLIC_REDIRECT_URI!}&response_type=code`,
        }}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        onMessage={async (event) => {
          const code = getParamFromUrl(event.nativeEvent.url, 'code');
          if (code === null) return;

          const token = await getKakaoToken(code);
          setAuth({ accessToken: token });

          navigation.navigate('auth/index');
        }}
      />
    </SafeAreaView>
  );
}

export { KakaoOAuth };
