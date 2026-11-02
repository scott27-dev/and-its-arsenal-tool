export function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Formats a JavaScript Date object into a readable ordinal format,
 * e.g. 16th October 2026.
 */
export function formatDateToOrdinal(date: Date): string {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${getOrdinalSuffix(day)} ${month} ${year}`;
}

export function parseFormattedOrdinalDate(dateStr: string): Date | null {
  if (!dateStr || !dateStr.trim()) return null;
  // Match patterns like "16th October 2026", "1st Jan 2025", "23 October 2026"
  const match = dateStr.trim().match(/^(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const monthName = match[2].toLowerCase();
  const year = parseInt(match[3], 10);

  const monthIndex = MONTH_NAMES.findIndex(
    m => m.toLowerCase() === monthName || m.toLowerCase().startsWith(monthName)
  );
  if (monthIndex === -1 || day < 1 || day > 31) return null;

  return new Date(year, monthIndex, day);
}
