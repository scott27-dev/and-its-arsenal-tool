import { formatTeamNewsItem } from '../src/utils/teamNewsFormatter';

describe('teamNewsFormatter', () => {
  it('bolds the player name when bracketed injury information and colon are present', () => {
    const input = 'Bukayo Saka (hamstring): Faces a late fitness test';
    const output = formatTeamNewsItem(input);
    expect(output).toBe('**Bukayo Saka** (hamstring): Faces a late fitness test');
  });

  it('bolds the player name when colon is present without bracketed information', () => {
    const input = 'Martin Odegaard: Ruled out with ankle injury';
    const output = formatTeamNewsItem(input);
    expect(output).toBe('**Martin Odegaard**: Ruled out with ankle injury');
  });

  it('bolds the player name when bracketed information is present without colon', () => {
    const input = 'Gabriel Jesus (groin)';
    const output = formatTeamNewsItem(input);
    expect(output).toBe('**Gabriel Jesus** (groin)');
  });

  it('handles spaces before opening parenthesis cleanly', () => {
    const input = 'Declan Rice   (illness): Back in contention';
    const output = formatTeamNewsItem(input);
    expect(output).toBe('**Declan Rice** (illness): Back in contention');
  });

  it('handles spaces before colon cleanly', () => {
    const input = 'Kai Havertz  : Available for selection';
    const output = formatTeamNewsItem(input);
    expect(output).toBe('**Kai Havertz**: Available for selection');
  });

  it('does not double bold if player name is already wrapped in bold markdown', () => {
    const input1 = '**Bukayo Saka** (hamstring): Faces a late fitness test';
    expect(formatTeamNewsItem(input1)).toBe('**Bukayo Saka** (hamstring): Faces a late fitness test');

    const input2 = '**Martin Odegaard**: Ruled out';
    expect(formatTeamNewsItem(input2)).toBe('**Martin Odegaard**: Ruled out');
  });

  it('returns plain string if neither parenthesis nor colon is found', () => {
    const input = 'No fresh injury concerns from the weekend';
    expect(formatTeamNewsItem(input)).toBe('No fresh injury concerns from the weekend');
  });

  it('returns string as is if delimiter is at index 0', () => {
    const input = '(knee): More information';
    expect(formatTeamNewsItem(input)).toBe('(knee): More information');
  });

  it('handles empty or whitespace strings', () => {
    expect(formatTeamNewsItem('')).toBe('');
    expect(formatTeamNewsItem('   ')).toBe('');
  });
});
