import { APPLE_CLIENT_ID, APPLE_CLIENT_SECRET } from "@env";

async function getAppleToken(code: string) {
  try {
    return await fetch("https://appleid.apple.com/auth/token", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code: code,
        client_id: APPLE_CLIENT_ID,
        client_secret: APPLE_CLIENT_SECRET,
        grant_type: "authorization_code",
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

export { getAppleToken };
