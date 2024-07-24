import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

import { NAVER_CLIENT_ID, REDIRECT_URI } from "@env";
import { getParamFromUrl, INJECTED_JAVASCRIPT, NavProp } from "@/src/shared";
import { getNaverToken, NAVER_OAUTH_STATE } from "@/src/entities";

function NaverAuthPage({ navigation }: { navigation: NavProp<"oauth/naver"> }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${NAVER_OAUTH_STATE}`,
        }}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        onMessage={async (event) => {
          const code = getParamFromUrl(event.nativeEvent.url, "code");
          if (code === null) return;
          const token = await getNaverToken(code);
          navigation.navigate("oauth/index", {
            platform: "naver",
            accessToken: token,
          });
        }}
      />
    </SafeAreaView>
  );
}

export { NaverAuthPage };
