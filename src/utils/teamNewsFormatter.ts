/**
 * Formats a team news list item by bolding the player name.
 * Splits by the first instance of either '(' or ':' (in case there is no bracketed information)
 * and bolds the preceding player name.
 *
 * E.g.
 * - "Bukayo Saka (hamstring): Faces late fitness test" -> "**Bukayo Saka** (hamstring): Faces late fitness test"
 * - "Martin Odegaard: Ruled out with ankle injury" -> "**Martin Odegaard**: Ruled out with ankle injury"
 */
export function formatTeamNewsItem(item: string): string {
  if (!item || typeof item !== 'string') {
    return '';
  }
  const trimmed = item.trim();
  if (!trimmed) {
    return '';
  }

  // Find first occurrence of either '(' or ':'
  const parenIndex = trimmed.indexOf('(');
  const colonIndex = trimmed.indexOf(':');

  let splitIndex = -1;
  if (parenIndex !== -1 && colonIndex !== -1) {
    splitIndex = Math.min(parenIndex, colonIndex);
  } else if (parenIndex !== -1) {
    splitIndex = parenIndex;
  } else if (colonIndex !== -1) {
    splitIndex = colonIndex;
  }

  // If no delimiter is found or it's at index 0, return the trimmed item
  if (splitIndex <= 0) {
    return trimmed;
  }

  const before = trimmed.slice(0, splitIndex).trim();
  const remainder = trimmed.slice(splitIndex).trimEnd();

  if (!before) {
    return trimmed;
  }

  // If already bolded, preserve without duplicating bold markers
  if (before.startsWith('**') && before.endsWith('**')) {
    if (remainder.startsWith(':')) {
      return `${before}${remainder}`;
    }
    return `${before} ${remainder.trimStart()}`;
  }

  // For colon delimiter without brackets, format directly as **Player Name**: Rest
  if (remainder.startsWith(':')) {
    return `**${before}**${remainder}`;
  }

  // For open parenthesis delimiter, ensure a single space between bold name and (
  return `**${before}** ${remainder.trimStart()}`;
}
