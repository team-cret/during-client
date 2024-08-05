/**
 *
 *
 * @param {string} year
 * @param {string} month
 * @param {string} day
 * @returns {boolean}
 * @example
 * isValidDate('2021', '02', '29'); // false
 * isValidDate('2021', '02', '28'); // true
 */
function isValidDate(year: string, month: string, day: string): boolean {
  const date = new Date(`${year}-${month}-${day}`);

  const timestamp = date.getTime();
  if (isNaN(timestamp)) return false;

  return (
    date.getUTCFullYear() === parseInt(year) &&
    date.getUTCMonth() + 1 === parseInt(month) &&
    date.getUTCDate() === parseInt(day)
  );
}

function isValidNickName(nickName: string): boolean {
  return nickName.length > 0;
}

export { isValidDate, isValidNickName };
