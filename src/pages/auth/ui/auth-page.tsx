import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { NavProp, ScreenProps } from "@/src/shared";
import { useEffect } from "react";

function AuthPage({
  navigation,
  route: { params },
}: {
  navigation: NavProp<"oauth/index">;
  route: ScreenProps<"oauth/index">["route"];
}) {
  useEffect(() => {
    if (params === undefined) return;
    if (params.platform === undefined || params.accessToken === undefined)
      return;
    Alert.alert(params!.platform, params.accessToken);
  }, [params]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate("oauth/kakao");
        }}
      >
        <Text style={styles.text}>kakao</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("oauth/google");
        }}
      >
        <Text style={styles.text}>google</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("oauth/naver");
        }}
      >
        <Text style={styles.text}>naver</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("oauth/apple");
        }}
      >
        <Text style={styles.text}>apple</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 20,
  },
});

export { AuthPage };
