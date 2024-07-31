const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("redirected")`;

enum Platform {
  NAVER = "NAVER",
  KAKAO = "KAKAO",
  GOOGLE = "GOOGLE",
  APPLE = "APPLE",
}

export { INJECTED_JAVASCRIPT, Platform };
