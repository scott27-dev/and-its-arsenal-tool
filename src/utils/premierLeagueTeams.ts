/**
 * Dictionary of Premier League teams (excluding Arsenal) and their most accurate emoji.
 */
export const PREMIER_LEAGUE_TEAMS: Record<string, string> = {
  'Aston Villa': '🦁',
  'Bournemouth': '🍒',
  'Brentford': '🐝',
  'Brighton & Hove Albion': '🕊️',
  'Coventry': '🩵',
  'Chelsea': '🔵',
  'Crystal Palace': '🦅',
  'Everton': '🍬',
  'Fulham': '⚪',
  'Hull': '🐅',
  'Ipswich Town': '🚜',
  'Leicester City': '🦊',
  'Liverpool': '🚩',
  'Manchester City': '🛢️',
  'Manchester United': '👹',
  'Newcastle United': '🐦‍⬛',
  'Nottingham Forest': '🌳',
  'Southampton': '😇',
  'Sunderland': '🐈‍⬛',
  'Tottenham Hotspur': '💩',
  'West Ham United': '⚒️',
  'Wolverhampton Wanderers': '🐺',
};

/**
 * Dictionary of Premier League teams and their home stadiums.
 */
export const PREMIER_LEAGUE_STADIUMS: Record<string, string> = {
  'Aston Villa': 'Villa Park',
  'Bournemouth': 'Vitality Stadium',
  'Brentford': 'Gtech Community Stadium',
  'Brighton & Hove Albion': 'Amex Stadium',
  'Chelsea': 'Stamford Bridge',
  'Coventry': 'Coventry Building Society Arena',
  'Crystal Palace': 'Selhurst Park',
  'Everton': 'Goodison Park',
  'Fulham': 'Craven Cottage',
  'Hull': 'MKM Stadium',
  'Ipswich Town': 'Portman Road',
  'Leicester City': 'King Power Stadium',
  'Liverpool': 'Anfield',
  'Manchester City': 'Etihad Stadium',
  'Manchester United': 'Old Trafford',
  'Newcastle United': "St. James' Park",
  'Nottingham Forest': 'The City Ground',
  'Southampton': "St. Mary's Stadium",
  'Sunderland': 'Stadium of Light',
  'Tottenham Hotspur': 'Tottenham Hotspur Stadium',
  'West Ham United': 'London Stadium',
  'Wolverhampton Wanderers': 'Molineux Stadium',
  'Burnley': 'Turf Moor',
  'Luton Town': 'Kenilworth Road',
  'Sheffield United': 'Bramall Lane',
  'Leeds United': 'Elland Road',
};

/**
 * Normalized alias lookup mapping common variations to each club's emoji.
 */
const TEAM_ALIASES: Record<string, string> = {
  // Aston Villa
  'aston villa': PREMIER_LEAGUE_TEAMS['Aston Villa'] || '🦁',
  'villa': PREMIER_LEAGUE_TEAMS['Aston Villa'] || '🦁',

  // Bournemouth
  'bournemouth': PREMIER_LEAGUE_TEAMS.Bournemouth || '🍒',
  'afc bournemouth': PREMIER_LEAGUE_TEAMS.Bournemouth || '🍒',

  // Brentford
  'brentford': PREMIER_LEAGUE_TEAMS.Brentford || '🐝',

  // Brighton & Hove Albion
  'brighton': PREMIER_LEAGUE_TEAMS['Brighton & Hove Albion'] || '🕊️',
  'brighton & hove albion': PREMIER_LEAGUE_TEAMS['Brighton & Hove Albion'] || '🕊️',
  'brighton and hove albion': PREMIER_LEAGUE_TEAMS['Brighton & Hove Albion'] || '🕊️',

  // Chelsea
  'chelsea': PREMIER_LEAGUE_TEAMS.Chelsea || '🔵',

  // Coventry
  'coventry': PREMIER_LEAGUE_TEAMS.Coventry || '🩵',
  'coventry city': PREMIER_LEAGUE_TEAMS.Coventry || '🩵',

  // Crystal Palace
  'crystal palace': PREMIER_LEAGUE_TEAMS['Crystal Palace'] || '🦅',
  'palace': PREMIER_LEAGUE_TEAMS['Crystal Palace'] || '🦅',

  // Everton
  'everton': PREMIER_LEAGUE_TEAMS.Everton || '🍬',

  // Fulham
  'fulham': PREMIER_LEAGUE_TEAMS.Fulham || '⚪',

  // Hull
  'hull': PREMIER_LEAGUE_TEAMS.Hull || '🐅',
  'hull city': PREMIER_LEAGUE_TEAMS.Hull || '🐅',

  // Ipswich Town
  'ipswich': PREMIER_LEAGUE_TEAMS['Ipswich Town'] || '🚜',
  'ipswich town': PREMIER_LEAGUE_TEAMS['Ipswich Town'] || '🚜',

  // Leicester City
  'leicester': PREMIER_LEAGUE_TEAMS['Leicester City'] || '🦊',
  'leicester city': PREMIER_LEAGUE_TEAMS['Leicester City'] || '🦊',

  // Liverpool
  'liverpool': PREMIER_LEAGUE_TEAMS.Liverpool || '🚩',

  // Manchester City
  'manchester city': PREMIER_LEAGUE_TEAMS['Manchester City'] || '🛢️',
  'man city': PREMIER_LEAGUE_TEAMS['Manchester City'] || '🛢️',
  'mancity': PREMIER_LEAGUE_TEAMS['Manchester City'] || '🛢️',

  // Manchester United
  'manchester united': PREMIER_LEAGUE_TEAMS['Manchester United'] || '👹',
  'man united': PREMIER_LEAGUE_TEAMS['Manchester United'] || '👹',
  'man utd': PREMIER_LEAGUE_TEAMS['Manchester United'] || '👹',
  'manutd': PREMIER_LEAGUE_TEAMS['Manchester United'] || '👹',

  // Newcastle United
  'newcastle': PREMIER_LEAGUE_TEAMS['Newcastle United'] || '🐦‍⬛',
  'newcastle united': PREMIER_LEAGUE_TEAMS['Newcastle United'] || '🐦‍⬛',

  // Nottingham Forest
  'nottingham forest': PREMIER_LEAGUE_TEAMS['Nottingham Forest'] || '🌳',
  'forest': PREMIER_LEAGUE_TEAMS['Nottingham Forest'] || '🌳',

  // Southampton
  'southampton': PREMIER_LEAGUE_TEAMS.Southampton || '😇',

  // Sunderland
  'sunderland': PREMIER_LEAGUE_TEAMS.Sunderland || '🐈‍⬛',

  // Tottenham Hotspur
  'tottenham': PREMIER_LEAGUE_TEAMS['Tottenham Hotspur'] || '💩',
  'tottenham hotspur': PREMIER_LEAGUE_TEAMS['Tottenham Hotspur'] || '💩',
  'spurs': PREMIER_LEAGUE_TEAMS['Tottenham Hotspur'] || '💩',

  // West Ham United
  'west ham': PREMIER_LEAGUE_TEAMS['West Ham United'] || '⚒️',
  'west ham united': PREMIER_LEAGUE_TEAMS['West Ham United'] || '⚒️',

  // Wolverhampton Wanderers
  'wolves': PREMIER_LEAGUE_TEAMS['Wolverhampton Wanderers'] || '🐺',
  'wolverhampton': PREMIER_LEAGUE_TEAMS['Wolverhampton Wanderers'] || '🐺',
  'wolverhampton wanderers': PREMIER_LEAGUE_TEAMS['Wolverhampton Wanderers'] || '🐺',

  // Additional recent Premier League teams
  'burnley': '🍷',
  'luton': '🎩',
  'luton town': '🎩',
  'sheffield united': '⚔️',
  'leeds': '⚪',
  'leeds united': '⚪',
};

/**
 * Normalized alias lookup mapping common variations to each club's stadium.
 */
const STADIUM_ALIASES: Record<string, string> = {
  // Aston Villa
  'aston villa': PREMIER_LEAGUE_STADIUMS['Aston Villa'],
  'villa': PREMIER_LEAGUE_STADIUMS['Aston Villa'],

  // Bournemouth
  'bournemouth': PREMIER_LEAGUE_STADIUMS.Bournemouth,
  'afc bournemouth': PREMIER_LEAGUE_STADIUMS.Bournemouth,

  // Brentford
  'brentford': PREMIER_LEAGUE_STADIUMS.Brentford,

  // Brighton & Hove Albion
  'brighton': PREMIER_LEAGUE_STADIUMS['Brighton & Hove Albion'],
  'brighton & hove albion': PREMIER_LEAGUE_STADIUMS['Brighton & Hove Albion'],
  'brighton and hove albion': PREMIER_LEAGUE_STADIUMS['Brighton & Hove Albion'],

  // Chelsea
  'chelsea': PREMIER_LEAGUE_STADIUMS.Chelsea,

  // Coventry
  'coventry': PREMIER_LEAGUE_STADIUMS.Coventry,
  'coventry city': PREMIER_LEAGUE_STADIUMS.Coventry,

  // Crystal Palace
  'crystal palace': PREMIER_LEAGUE_STADIUMS['Crystal Palace'],
  'palace': PREMIER_LEAGUE_STADIUMS['Crystal Palace'],

  // Everton
  'everton': PREMIER_LEAGUE_STADIUMS.Everton,

  // Fulham
  'fulham': PREMIER_LEAGUE_STADIUMS.Fulham,

  // Hull
  'hull': PREMIER_LEAGUE_STADIUMS.Hull,
  'hull city': PREMIER_LEAGUE_STADIUMS.Hull,

  // Ipswich Town
  'ipswich': PREMIER_LEAGUE_STADIUMS['Ipswich Town'],
  'ipswich town': PREMIER_LEAGUE_STADIUMS['Ipswich Town'],

  // Leicester City
  'leicester': PREMIER_LEAGUE_STADIUMS['Leicester City'],
  'leicester city': PREMIER_LEAGUE_STADIUMS['Leicester City'],

  // Liverpool
  'liverpool': PREMIER_LEAGUE_STADIUMS.Liverpool,

  // Manchester City
  'manchester city': PREMIER_LEAGUE_STADIUMS['Manchester City'],
  'man city': PREMIER_LEAGUE_STADIUMS['Manchester City'],
  'mancity': PREMIER_LEAGUE_STADIUMS['Manchester City'],

  // Manchester United
  'manchester united': PREMIER_LEAGUE_STADIUMS['Manchester United'],
  'man united': PREMIER_LEAGUE_STADIUMS['Manchester United'],
  'man utd': PREMIER_LEAGUE_STADIUMS['Manchester United'],
  'manutd': PREMIER_LEAGUE_STADIUMS['Manchester United'],

  // Newcastle United
  'newcastle': PREMIER_LEAGUE_STADIUMS['Newcastle United'],
  'newcastle united': PREMIER_LEAGUE_STADIUMS['Newcastle United'],

  // Nottingham Forest
  'nottingham forest': PREMIER_LEAGUE_STADIUMS['Nottingham Forest'],
  'forest': PREMIER_LEAGUE_STADIUMS['Nottingham Forest'],

  // Southampton
  'southampton': PREMIER_LEAGUE_STADIUMS.Southampton,

  // Sunderland
  'sunderland': PREMIER_LEAGUE_STADIUMS.Sunderland,

  // Tottenham Hotspur
  'tottenham': PREMIER_LEAGUE_STADIUMS['Tottenham Hotspur'],
  'tottenham hotspur': PREMIER_LEAGUE_STADIUMS['Tottenham Hotspur'],
  'spurs': PREMIER_LEAGUE_STADIUMS['Tottenham Hotspur'],

  // West Ham United
  'west ham': PREMIER_LEAGUE_STADIUMS['West Ham United'],
  'west ham united': PREMIER_LEAGUE_STADIUMS['West Ham United'],

  // Wolverhampton Wanderers
  'wolves': PREMIER_LEAGUE_STADIUMS['Wolverhampton Wanderers'],
  'wolverhampton': PREMIER_LEAGUE_STADIUMS['Wolverhampton Wanderers'],
  'wolverhampton wanderers': PREMIER_LEAGUE_STADIUMS['Wolverhampton Wanderers'],

  // Additional recent Premier League teams
  'burnley': PREMIER_LEAGUE_STADIUMS.Burnley,
  'luton': PREMIER_LEAGUE_STADIUMS['Luton Town'],
  'luton town': PREMIER_LEAGUE_STADIUMS['Luton Town'],
  'sheffield united': PREMIER_LEAGUE_STADIUMS['Sheffield United'],
  'leeds': PREMIER_LEAGUE_STADIUMS['Leeds United'],
  'leeds united': PREMIER_LEAGUE_STADIUMS['Leeds United'],
};

/**
 * Returns the matching emoji for a given team name (case-insensitive, trimmed).
 * Explicitly excludes Arsenal.
 */
export function getPremierLeagueTeamEmoji(teamName: string): string | null {
  if (!teamName || typeof teamName !== 'string') {
    return null;
  }
  const normalized = teamName.trim().toLowerCase();
  if (normalized === 'arsenal' || normalized.includes('arsenal')) {
    return null;
  }
  return TEAM_ALIASES[normalized] || null;
}

/**
 * Returns the matching stadium for a given team name (case-insensitive, trimmed).
 * Explicitly excludes Arsenal.
 */
export function getPremierLeagueTeamStadium(teamName: string): string | null {
  if (!teamName || typeof teamName !== 'string') {
    return null;
  }
  const normalized = teamName.trim().toLowerCase();
  if (normalized === 'arsenal' || normalized.includes('arsenal')) {
    return null;
  }
  return STADIUM_ALIASES[normalized] || null;
}

export const getPremierLeagueStadium = getPremierLeagueTeamStadium;
