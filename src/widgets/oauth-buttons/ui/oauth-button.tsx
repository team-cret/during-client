import { Dimensions, Pressable, StyleSheet } from "react-native";

import { DESIGN_HEIGHT, Platform } from "@/src/shared";

import AuthIconNaver from "@/src/shared/assets/icons/oauth/naver.svg";
import AuthIconKakao from "@/src/shared/assets/icons/oauth/kakao.svg";
import AuthIconGoogle from "@/src/shared/assets/icons/oauth/google.svg";
import AuthIconApple from "@/src/shared/assets/icons/oauth/apple.svg";

function AuthIconButton({
  platform,
  onPress,
}: {
  platform: Platform;
  onPress: () => void;
}) {
  const renderAuthIcon = (platform: Platform) => {
    switch (platform) {
      case Platform.NAVER:
        return <AuthIconNaver height="100%" />;
      case Platform.KAKAO:
        return <AuthIconKakao height="100%" />;
      case Platform.GOOGLE:
        return <AuthIconGoogle height="100%" />;
      case Platform.APPLE:
        return <AuthIconApple height="100%" />;
      default:
        return null;
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {renderAuthIcon(platform)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * (51 / DESIGN_HEIGHT),
    aspectRatio: 1,
  },
});

export { AuthIconButton };
