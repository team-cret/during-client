import { Alert, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

import { APPLE_CLIENT_ID, NAVER_CLIENT_ID, REDIRECT_URI } from "@env";
import { getParamFromUrl, NavProp } from "@/src/shared";
import { getAppleToken, getGoogleToken, getNaverToken } from "@/src/entities";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("redirected")`;

function AppleAuthPage({ navigation }: { navigation: NavProp<"oauth/naver"> }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://appleid.apple.com/auth/authorize?client_id=${APPLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`,
        }}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        onMessage={async (event) => {
          const code = getParamFromUrl(event.nativeEvent.url, "code");
          if (code === null) return;
          const token = await getAppleToken(code);
          navigation.navigate("oauth/index", {
            platform: "apple",
            accessToken: token,
          });
        }}
      />
    </SafeAreaView>
  );
}

export { AppleAuthPage };

//
