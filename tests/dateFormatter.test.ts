import {
  formatDateToOrdinal,
  getOrdinalSuffix,
  parseFormattedOrdinalDate,
} from '../src/utils/dateFormatter';

describe('dateFormatter', () => {
  describe('getOrdinalSuffix', () => {
    it('returns st for 1, 21, 31', () => {
      expect(getOrdinalSuffix(1)).toBe('1st');
      expect(getOrdinalSuffix(21)).toBe('21st');
      expect(getOrdinalSuffix(31)).toBe('31st');
    });

    it('returns nd for 2, 22', () => {
      expect(getOrdinalSuffix(2)).toBe('2nd');
      expect(getOrdinalSuffix(22)).toBe('22nd');
    });

    it('returns rd for 3, 23', () => {
      expect(getOrdinalSuffix(3)).toBe('3rd');
      expect(getOrdinalSuffix(23)).toBe('23rd');
    });

    it('returns th for 4-20, 24-30', () => {
      expect(getOrdinalSuffix(4)).toBe('4th');
      expect(getOrdinalSuffix(11)).toBe('11th');
      expect(getOrdinalSuffix(12)).toBe('12th');
      expect(getOrdinalSuffix(13)).toBe('13th');
      expect(getOrdinalSuffix(16)).toBe('16th');
      expect(getOrdinalSuffix(20)).toBe('20th');
      expect(getOrdinalSuffix(30)).toBe('30th');
    });
  });

  describe('formatDateToOrdinal', () => {
    it('formats dates in "16th October 2026" style', () => {
      const date = new Date(2026, 9, 16); // month is 0-indexed: 9 = October
      expect(formatDateToOrdinal(date)).toBe('16th October 2026');
    });

    it('formats first day of month', () => {
      const date = new Date(2025, 0, 1);
      expect(formatDateToOrdinal(date)).toBe('1st January 2025');
    });

    it('formats second day of month', () => {
      const date = new Date(2025, 1, 2);
      expect(formatDateToOrdinal(date)).toBe('2nd February 2025');
    });

    it('formats third day of month', () => {
      const date = new Date(2025, 2, 3);
      expect(formatDateToOrdinal(date)).toBe('3rd March 2025');
    });
  });

  describe('parseFormattedOrdinalDate', () => {
    it('parses valid ordinal date string', () => {
      const parsed = parseFormattedOrdinalDate('16th October 2026');
      expect(parsed).not.toBeNull();
      expect(parsed?.getFullYear()).toBe(2026);
      expect(parsed?.getMonth()).toBe(9);
      expect(parsed?.getDate()).toBe(16);
    });

    it('parses dates without ordinal suffix', () => {
      const parsed = parseFormattedOrdinalDate('16 October 2026');
      expect(parsed).not.toBeNull();
      expect(parsed?.getFullYear()).toBe(2026);
      expect(parsed?.getMonth()).toBe(9);
      expect(parsed?.getDate()).toBe(16);
    });

    it('returns null for empty or invalid strings', () => {
      expect(parseFormattedOrdinalDate('')).toBeNull();
      expect(parseFormattedOrdinalDate('invalid date')).toBeNull();
      expect(parseFormattedOrdinalDate('99th InvalidMonth 2026')).toBeNull();
    });
  });
});
