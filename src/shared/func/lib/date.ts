function convertDateToString(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

export { convertDateToString };
