/**
 *
 * @param date
 * @returns "H:SS" format string
 */
function convertDateToStringHSS(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = String(hours);
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

/**
 *
 * @param date
 * @returns "YYYY-MM-DD HH:MM:SS" format string
 */
function convertDateToStringFullDate(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function calcDDay(startDate: Date): number {
  const now = new Date();

  const diff = now.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

  return diffDays;
}

export { convertDateToStringHSS, convertDateToStringFullDate, calcDDay };
