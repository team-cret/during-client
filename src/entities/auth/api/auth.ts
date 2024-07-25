import { Platform } from "@/src/shared";
import { DURING_SERVER_URL } from "@env";
import { Alert } from "react-native";

async function trySignInUp({
  accessToken,
  platform,
}: {
  accessToken: string;
  platform: Platform;
}) {
  try {
    return await fetch(`${DURING_SERVER_URL}/api/v0/auth/oauth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        provider: platform.toString(),
      }),
    })
      .then((res) => {
        console.log(res);
        switch (res.status) {
          case 200:
            return res.json();
          case 401:
            throw new Error("unauthorized");
          case 500:
            throw new Error("Internal Server Error");
        }
      })
      .then((res) => {
        Alert.alert("로그인 성공");
        return "";
        // return res.access_token;
      });
  } catch (e) {
    console.error(e);
  }
  return "";
}

export { trySignInUp };
