const getParamFromUrl = (url: string, param: string): string | null => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(param);
};

export { getParamFromUrl };
