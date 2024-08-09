function logInfo(message: string): void {
  console.log(message);
}

function logError(e: any): void {
  console.log('[ERROR]', e);
}

export { logInfo, logError };
