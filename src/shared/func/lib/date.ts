const defaultDate = new Date('1970-01-01T00:00:00');

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
 * @returns "MM월 DD일" format string
 */
function convertDateToStringMD(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}월 ${day}일`;
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

/**
 *
 * @param date
 * @returns "YYYY년 MM월 DD일" format string
 */
function convertDateToHumanFormat(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
}

function calcDDay(startDate: Date): number {
  const now = new Date();

  const diff = now.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

  return diffDays;
}

function calcDaysBetween(startDate: Date, endDate: Date): number {
  const diff = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24)) + 1;

  return diffDays;
}

function convertISO8601Duration(duration: string): {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const regex =
    /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(\.\d+)?)S)?)?/;
  const [, years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0] =
    duration.match(regex)!.map((value) => (value ? Number(value) : 0));

  return {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  };
}

export {
  defaultDate,
  convertDateToStringHSS,
  convertDateToStringMD,
  convertDateToStringFullDate,
  convertDateToHumanFormat,
  calcDDay,
  calcDaysBetween,
  convertISO8601Duration,
};
