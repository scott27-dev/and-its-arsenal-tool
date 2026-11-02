import {
  getDeviceTimezoneAbbreviation,
  isBritishSummerTime,
} from '../src/utils/timezone';

describe('timezone utility (BST / GMT only)', () => {
  it('returns BST at the moment (mid-October)', () => {
    // Current date is 2026-10-16
    const oct16 = new Date(2026, 9, 16);
    expect(getDeviceTimezoneAbbreviation(oct16)).toBe('BST');
  });

  it('only ever returns BST or GMT', () => {
    const current = getDeviceTimezoneAbbreviation();
    expect(['BST', 'GMT']).toContain(current);
  });

  describe('British Summer Time (BST)', () => {
    it('returns BST in summer months (July)', () => {
      const summerDate = new Date(Date.UTC(2026, 6, 15));
      expect(getDeviceTimezoneAbbreviation(summerDate)).toBe('BST');
      expect(isBritishSummerTime(summerDate)).toBe(true);
    });

    it('returns BST in early autumn before last Sunday in October', () => {
      // 2026 last Sunday of October is October 25
      const oct24 = new Date(Date.UTC(2026, 9, 24, 15, 0));
      expect(getDeviceTimezoneAbbreviation(oct24)).toBe('BST');
      expect(isBritishSummerTime(oct24)).toBe(true);
    });

    it('returns BST on the last Sunday in March after 01:00 UTC', () => {
      // 2026 last Sunday of March is March 29
      const transitionAfter = new Date(Date.UTC(2026, 2, 29, 1, 30));
      expect(getDeviceTimezoneAbbreviation(transitionAfter)).toBe('BST');
      expect(isBritishSummerTime(transitionAfter)).toBe(true);
    });
  });

  describe('Greenwich Mean Time (GMT)', () => {
    it('returns GMT in winter months (January)', () => {
      const winterDate = new Date(Date.UTC(2026, 0, 15));
      expect(getDeviceTimezoneAbbreviation(winterDate)).toBe('GMT');
      expect(isBritishSummerTime(winterDate)).toBe(false);
    });

    it('returns GMT in November and December', () => {
      const novDate = new Date(Date.UTC(2026, 10, 15));
      const decDate = new Date(Date.UTC(2026, 11, 25));
      expect(getDeviceTimezoneAbbreviation(novDate)).toBe('GMT');
      expect(getDeviceTimezoneAbbreviation(decDate)).toBe('GMT');
    });

    it('returns GMT on the last Sunday in March before 01:00 UTC', () => {
      // 2026 last Sunday of March is March 29
      const transitionBefore = new Date(Date.UTC(2026, 2, 29, 0, 30));
      expect(getDeviceTimezoneAbbreviation(transitionBefore)).toBe('GMT');
      expect(isBritishSummerTime(transitionBefore)).toBe(false);
    });

    it('returns GMT on the last Sunday in October after 01:00 UTC', () => {
      // 2026 last Sunday of October is October 25
      const transitionAfter = new Date(Date.UTC(2026, 9, 25, 1, 30));
      expect(getDeviceTimezoneAbbreviation(transitionAfter)).toBe('GMT');
      expect(isBritishSummerTime(transitionAfter)).toBe(false);
    });
  });
});
