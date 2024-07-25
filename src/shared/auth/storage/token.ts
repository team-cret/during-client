import EncryptedStorage from "react-native-encrypted-storage";

async function setUserToken({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  try {
    await EncryptedStorage.setItem(
      "auth/token",
      JSON.stringify({
        accessToken,
        refreshToken,
      })
    );
  } catch (error) {
    console.error(error);
  }
}

async function getUserAccessToken(): Promise<string | null> {
  try {
    const token = await EncryptedStorage.getItem("auth/token");
    if (token === null) return null;
    const tokenJson = JSON.parse(token);

    if (tokenJson["accessToken"] === null) return null;

    return tokenJson["accessToken"];
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getUserRefreshToken(): Promise<string | null> {
  try {
    const token = await EncryptedStorage.getItem("auth/token");
    if (token === null) return null;
    const tokenJson = JSON.parse(token);

    if (tokenJson["refreshToken"] === null) return null;

    return tokenJson["refreshToken"];
  } catch (error) {
    console.error(error);
    return null;
  }
}
