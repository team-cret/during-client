import { getKakaoToken } from "@/src/entities";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

import { KAKAO_REST_API_KEY, REDIRECT_URI } from "@env";
import {
  getParamFromUrl,
  INJECTED_JAVASCRIPT,
  NavProp,
  Platform,
} from "@/src/shared";

function KakaoAuthPage({ navigation }: { navigation: NavProp<"oauth/KAKAO"> }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`,
        }}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        onMessage={async (event) => {
          const code = getParamFromUrl(event.nativeEvent.url, "code");
          if (code === null) return;
          const token = await getKakaoToken(code);
          navigation.navigate("oauth/index", {
            platform: Platform.KAKAO,
            accessToken: token,
          });
        }}
      />
    </SafeAreaView>
  );
}

export { KakaoAuthPage };
