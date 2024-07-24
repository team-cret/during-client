import { KAKAO_REST_API_KEY, REDIRECT_URI } from "@env";

async function getKakaoToken(code: string) {
  try {
    return await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: code,
      }).toString(),
    })
      .then((res) => {
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
        return res.access_token;
      });
  } catch (e) {
    console.error(e);
  }
  return "";
}

export { getKakaoToken };
