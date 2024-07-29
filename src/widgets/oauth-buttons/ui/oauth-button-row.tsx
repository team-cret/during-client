import { StyleSheet, View } from "react-native";
import { AuthIconButton } from "./oauth-button";
import { DESIGN_WIDTH, Platform, SCREEN_WIDTH } from "@/src/shared";

function OauthButtonRow({
  navigateToOAuth,
}: {
  navigateToOAuth: (platform: Platform) => void;
}) {
  return (
    <View style={styles.container}>
      <AuthIconButton
        platform={Platform.KAKAO}
        onPress={() => {
          navigateToOAuth(Platform.KAKAO);
        }}
      />
      <AuthIconButton
        platform={Platform.NAVER}
        onPress={() => {
          navigateToOAuth(Platform.NAVER);
        }}
      />
      <AuthIconButton
        platform={Platform.APPLE}
        onPress={() => {
          navigateToOAuth(Platform.APPLE);
        }}
      />
      <AuthIconButton
        platform={Platform.GOOGLE}
        onPress={() => {
          navigateToOAuth(Platform.GOOGLE);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: SCREEN_WIDTH * (249 / DESIGN_WIDTH),

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export { OauthButtonRow };
