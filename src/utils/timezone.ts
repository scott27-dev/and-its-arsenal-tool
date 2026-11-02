/**
 * Determines whether a given date falls within British Summer Time (BST).
 * Under the UK Summer Time Act:
 * - BST begins at 01:00 UTC on the last Sunday in March.
 * - BST ends at 01:00 UTC (02:00 BST) on the last Sunday in October.
 * Outside this period, the UK is on Greenwich Mean Time (GMT).
 */
export function isBritishSummerTime(date: Date = new Date()): boolean {
  const year = date.getUTCFullYear();

  // Last Sunday in March
  const march31 = new Date(Date.UTC(year, 2, 31));
  const lastSundayMarch = 31 - march31.getUTCDay();
  const bstStart = new Date(Date.UTC(year, 2, lastSundayMarch, 1, 0, 0));

  // Last Sunday in October
  const october31 = new Date(Date.UTC(year, 9, 31));
  const lastSundayOctober = 31 - october31.getUTCDay();
  const bstEnd = new Date(Date.UTC(year, 9, lastSundayOctober, 1, 0, 0));

  const time = date.getTime();
  return time >= bstStart.getTime() && time < bstEnd.getTime();
}

/**
 * Automatically determines the timezone abbreviation for Arsenal posts.
 * As clarified, the timezone will only ever be 'BST' (British Summer Time) or 'GMT' (Greenwich Mean Time).
 */
export function getDeviceTimezoneAbbreviation(date: Date = new Date()): 'BST' | 'GMT' {
  // 1. Try Intl format specifically for Europe/London with en-GB
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      timeZoneName: 'short',
    }).formatToParts(date);
    const tzName = parts.find(p => p.type === 'timeZoneName')?.value;
    if (tzName === 'BST' || tzName === 'GMT') {
      return tzName;
    }
  } catch {}

  // 2. Check device local timezone offset (UTC+1 is BST, offset in minutes is -60)
  try {
    const offset = date.getTimezoneOffset();
    if (offset === -60) {
      return 'BST';
    }
  } catch {}

  // 3. Fallback to exact legal UK calendar calculation (reliable in Hermes / environments without full ICU)
  return isBritishSummerTime(date) ? 'BST' : 'GMT';
}
