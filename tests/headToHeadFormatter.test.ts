import { formatHeadToHeadItem } from '../src/utils/headToHeadFormatter';

describe('headToHeadFormatter', () => {
  it('bolds the home team when the home team wins', () => {
    const input = 'Arsenal 2–1 Chelsea (Sep 13, 2025, Premier League)';
    const output = formatHeadToHeadItem(input);
    expect(output).toBe('**Arsenal** 2–1 Chelsea (Sep 13, 2025, Premier League)');
  });

  it('bolds the away team when the away team wins', () => {
    const input = 'Arsenal 0–2 Manchester City (Sep 13, 2025, Premier League)';
    const output = formatHeadToHeadItem(input);
    expect(output).toBe('Arsenal 0–2 **Manchester City** (Sep 13, 2025, Premier League)');
  });

  it('applies no boldness when the match is a draw (0-0)', () => {
    const input = 'Home Team 0–0 Away Team (Sep 13, 2025, Premier League)';
    const output = formatHeadToHeadItem(input);
    expect(output).toBe('Home Team 0–0 Away Team (Sep 13, 2025, Premier League)');
  });

  it('applies no boldness when the match is a score draw (2 - 2)', () => {
    const input = 'Chelsea 2 - 2 Arsenal (Oct 2023)';
    const output = formatHeadToHeadItem(input);
    expect(output).toBe('Chelsea 2 - 2 Arsenal (Oct 2023)');
  });

  it('handles hyphen separated scores without parentheses', () => {
    const input = 'Arsenal 3 - 1 Chelsea';
    const output = formatHeadToHeadItem(input);
    expect(output).toBe('**Arsenal** 3 - 1 Chelsea');
  });

  it('handles multi-word team names accurately', () => {
    const input = 'Brighton & Hove Albion 1 - 3 Wolverhampton Wanderers (Aug 2024)';
    const output = formatHeadToHeadItem(input);
    expect(output).toBe('Brighton & Hove Albion 1 - 3 **Wolverhampton Wanderers** (Aug 2024)');
  });

  it('does not duplicate bold markdown if team is already bolded', () => {
    const input = '**Arsenal** 2–0 Tottenham Hotspur (Jan 15, 2025)';
    const output = formatHeadToHeadItem(input);
    expect(output).toBe('**Arsenal** 2–0 Tottenham Hotspur (Jan 15, 2025)');
  });

  it('removes boldness if a previously bolded team played in a draw', () => {
    const input = '**Arsenal** 1–1 Chelsea (Dec 2024)';
    const output = formatHeadToHeadItem(input);
    expect(output).toBe('Arsenal 1–1 Chelsea (Dec 2024)');
  });

  it('preserves text without score pattern as is', () => {
    const input = 'Recent League Cup meetings';
    expect(formatHeadToHeadItem(input)).toBe('Recent League Cup meetings');
  });

  it('handles empty or whitespace strings', () => {
    expect(formatHeadToHeadItem('')).toBe('');
    expect(formatHeadToHeadItem('   ')).toBe('');
  });
});
