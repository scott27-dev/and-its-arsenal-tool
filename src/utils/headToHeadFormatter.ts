/**
 * Strips surrounding bold markdown (**) from a string if present.
 */
function unwrapBold(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length >= 4) {
    return trimmed.slice(2, -2).trim();
  }
  return trimmed;
}

/**
 * Wraps a string in bold markdown (**), ensuring it is not double-bolded.
 */
function formatBold(text: string): string {
  const unwrapped = unwrapBold(text);
  return `**${unwrapped}**`;
}

/**
 * Formats a single head-to-head record line.
 * Format: Home Team 0–0 Away Team (Date, Competition)
 *
 * - Automatically bolds the winning team based on the score.
 * - If the match is a draw (e.g. 0-0, 2-2), neither team is bolded.
 * - Preserves the score, dash style (–, -, —), and any parenthetical match details.
 */
export function formatHeadToHeadItem(item: string): string {
  if (!item || typeof item !== 'string') {
    return '';
  }
  const trimmed = item.trim();
  if (!trimmed) {
    return '';
  }

  // Separate any parenthetical details (e.g. "(Sep 13, 2025, Premier League)")
  const parenIndex = trimmed.indexOf('(');
  const mainPart = parenIndex !== -1 ? trimmed.slice(0, parenIndex) : trimmed;
  const detailsPart = parenIndex !== -1 ? trimmed.slice(parenIndex).trim() : '';

  // Match score pattern: digits followed by dash (hyphen, en-dash, em-dash) and digits
  const scoreRegex = /(\d+)\s*([–—-])\s*(\d+)/;
  const match = mainPart.match(scoreRegex);

  if (!match || match.index === undefined) {
    return trimmed;
  }

  const fullScoreStr = match[0];
  const homeScore = parseInt(match[1], 10);
  const awayScore = parseInt(match[3], 10);

  const homeTeamRaw = mainPart.slice(0, match.index).trim();
  const awayTeamRaw = mainPart.slice(match.index + fullScoreStr.length).trim();

  if (!homeTeamRaw || !awayTeamRaw) {
    return trimmed;
  }

  let formattedHomeTeam: string;
  let formattedAwayTeam: string;

  if (homeScore > awayScore) {
    // Home team won
    formattedHomeTeam = formatBold(homeTeamRaw);
    formattedAwayTeam = unwrapBold(awayTeamRaw);
  } else if (awayScore > homeScore) {
    // Away team won
    formattedHomeTeam = unwrapBold(homeTeamRaw);
    formattedAwayTeam = formatBold(awayTeamRaw);
  } else {
    // Draw: no boldness on either team
    formattedHomeTeam = unwrapBold(homeTeamRaw);
    formattedAwayTeam = unwrapBold(awayTeamRaw);
  }

  const scoreLine = `${formattedHomeTeam} ${fullScoreStr} ${formattedAwayTeam}`;

  return detailsPart ? `${scoreLine} ${detailsPart}` : scoreLine;
}
