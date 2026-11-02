import {
  PREMIER_LEAGUE_TEAMS,
  PREMIER_LEAGUE_STADIUMS,
  getPremierLeagueTeamEmoji,
  getPremierLeagueTeamStadium,
} from '../src/utils/premierLeagueTeams';

describe('premierLeagueTeams', () => {
  test('contains Premier League teams and excludes Arsenal', () => {
    expect(PREMIER_LEAGUE_TEAMS.Arsenal).toBeUndefined();
    expect(Object.keys(PREMIER_LEAGUE_TEAMS)).not.toContain('Arsenal');
    expect(Object.keys(PREMIER_LEAGUE_TEAMS).length).toBeGreaterThanOrEqual(19);

    // Verify all teams have an assigned emoji
    for (const [team, emoji] of Object.entries(PREMIER_LEAGUE_TEAMS)) {
      expect(typeof team).toBe('string');
      expect(typeof emoji).toBe('string');
      expect(emoji.length).toBeGreaterThan(0);
    }
  });

  test('contains stadiums for each team in PREMIER_LEAGUE_TEAMS', () => {
    expect(PREMIER_LEAGUE_STADIUMS.Arsenal).toBeUndefined();
    expect(Object.keys(PREMIER_LEAGUE_STADIUMS)).not.toContain('Arsenal');

    for (const team of Object.keys(PREMIER_LEAGUE_TEAMS)) {
      const stadium = PREMIER_LEAGUE_STADIUMS[team];
      expect(stadium).toBeDefined();
      expect(typeof stadium).toBe('string');
      expect(stadium.length).toBeGreaterThan(0);
    }
  });

  test('returns null for Arsenal', () => {
    expect(getPremierLeagueTeamEmoji('Arsenal')).toBeNull();
    expect(getPremierLeagueTeamEmoji('arsenal')).toBeNull();
    expect(getPremierLeagueTeamEmoji(' Arsenal ')).toBeNull();

    expect(getPremierLeagueTeamStadium('Arsenal')).toBeNull();
    expect(getPremierLeagueTeamStadium('arsenal')).toBeNull();
    expect(getPremierLeagueTeamStadium(' Arsenal ')).toBeNull();
  });

  test('returns correct emoji for canonical team names', () => {
    expect(getPremierLeagueTeamEmoji('Chelsea')).toBe(PREMIER_LEAGUE_TEAMS.Chelsea);
    expect(getPremierLeagueTeamEmoji('Tottenham Hotspur')).toBe(PREMIER_LEAGUE_TEAMS['Tottenham Hotspur']);
    expect(getPremierLeagueTeamEmoji('Manchester City')).toBe(PREMIER_LEAGUE_TEAMS['Manchester City']);
    expect(getPremierLeagueTeamEmoji('Manchester United')).toBe(PREMIER_LEAGUE_TEAMS['Manchester United']);
    expect(getPremierLeagueTeamEmoji('Aston Villa')).toBe(PREMIER_LEAGUE_TEAMS['Aston Villa']);
    expect(getPremierLeagueTeamEmoji('Crystal Palace')).toBe(PREMIER_LEAGUE_TEAMS['Crystal Palace']);
    expect(getPremierLeagueTeamEmoji('Brentford')).toBe(PREMIER_LEAGUE_TEAMS.Brentford);
    expect(getPremierLeagueTeamEmoji('West Ham United')).toBe(PREMIER_LEAGUE_TEAMS['West Ham United']);
    expect(getPremierLeagueTeamEmoji('Wolverhampton Wanderers')).toBe(PREMIER_LEAGUE_TEAMS['Wolverhampton Wanderers']);
    expect(getPremierLeagueTeamEmoji('Bournemouth')).toBe(PREMIER_LEAGUE_TEAMS.Bournemouth);
    expect(getPremierLeagueTeamEmoji('Everton')).toBe(PREMIER_LEAGUE_TEAMS.Everton);
    expect(getPremierLeagueTeamEmoji('Fulham')).toBe(PREMIER_LEAGUE_TEAMS.Fulham);
    expect(getPremierLeagueTeamEmoji('Leicester City')).toBe(PREMIER_LEAGUE_TEAMS['Leicester City']);
    expect(getPremierLeagueTeamEmoji('Liverpool')).toBe(PREMIER_LEAGUE_TEAMS.Liverpool);
    expect(getPremierLeagueTeamEmoji('Newcastle United')).toBe(PREMIER_LEAGUE_TEAMS['Newcastle United']);
    expect(getPremierLeagueTeamEmoji('Nottingham Forest')).toBe(PREMIER_LEAGUE_TEAMS['Nottingham Forest']);
    expect(getPremierLeagueTeamEmoji('Southampton')).toBe(PREMIER_LEAGUE_TEAMS.Southampton);
    expect(getPremierLeagueTeamEmoji('Ipswich Town')).toBe(PREMIER_LEAGUE_TEAMS['Ipswich Town']);
  });

  test('returns correct stadium for canonical team names', () => {
    expect(getPremierLeagueTeamStadium('Chelsea')).toBe('Stamford Bridge');
    expect(getPremierLeagueTeamStadium('Tottenham Hotspur')).toBe('Tottenham Hotspur Stadium');
    expect(getPremierLeagueTeamStadium('Manchester City')).toBe('Etihad Stadium');
    expect(getPremierLeagueTeamStadium('Manchester United')).toBe('Old Trafford');
    expect(getPremierLeagueTeamStadium('Aston Villa')).toBe('Villa Park');
    expect(getPremierLeagueTeamStadium('Crystal Palace')).toBe('Selhurst Park');
    expect(getPremierLeagueTeamStadium('Brentford')).toBe('Gtech Community Stadium');
    expect(getPremierLeagueTeamStadium('West Ham United')).toBe('London Stadium');
    expect(getPremierLeagueTeamStadium('Wolverhampton Wanderers')).toBe('Molineux Stadium');
    expect(getPremierLeagueTeamStadium('Bournemouth')).toBe('Vitality Stadium');
    expect(getPremierLeagueTeamStadium('Everton')).toBe('Goodison Park');
    expect(getPremierLeagueTeamStadium('Fulham')).toBe('Craven Cottage');
    expect(getPremierLeagueTeamStadium('Leicester City')).toBe('King Power Stadium');
    expect(getPremierLeagueTeamStadium('Liverpool')).toBe('Anfield');
    expect(getPremierLeagueTeamStadium('Newcastle United')).toBe("St. James' Park");
    expect(getPremierLeagueTeamStadium('Nottingham Forest')).toBe('The City Ground');
    expect(getPremierLeagueTeamStadium('Southampton')).toBe("St. Mary's Stadium");
    expect(getPremierLeagueTeamStadium('Ipswich Town')).toBe('Portman Road');
    expect(getPremierLeagueTeamStadium('Coventry')).toBe('Coventry Building Society Arena');
    expect(getPremierLeagueTeamStadium('Hull')).toBe('MKM Stadium');
    expect(getPremierLeagueTeamStadium('Sunderland')).toBe('Stadium of Light');
  });

  test('supports common nicknames and aliases with case-insensitivity for stadium lookup', () => {
    expect(getPremierLeagueTeamStadium('spurs')).toBe('Tottenham Hotspur Stadium');
    expect(getPremierLeagueTeamStadium('SPURS')).toBe('Tottenham Hotspur Stadium');
    expect(getPremierLeagueTeamStadium('  Man City  ')).toBe('Etihad Stadium');
    expect(getPremierLeagueTeamStadium('man utd')).toBe('Old Trafford');
    expect(getPremierLeagueTeamStadium('Wolves')).toBe('Molineux Stadium');
    expect(getPremierLeagueTeamStadium('Brighton')).toBe('Amex Stadium');
    expect(getPremierLeagueTeamStadium('West Ham')).toBe('London Stadium');
    expect(getPremierLeagueTeamStadium('Villa')).toBe('Villa Park');
    expect(getPremierLeagueTeamStadium('Palace')).toBe('Selhurst Park');
    expect(getPremierLeagueTeamStadium('Forest')).toBe('The City Ground');
    expect(getPremierLeagueTeamStadium('Newcastle')).toBe("St. James' Park");
    expect(getPremierLeagueTeamStadium('Leeds')).toBe('Elland Road');
  });

  test('supports common nicknames and aliases with case-insensitivity for emoji lookup', () => {
    expect(getPremierLeagueTeamEmoji('spurs')).toBe(PREMIER_LEAGUE_TEAMS['Tottenham Hotspur']);
    expect(getPremierLeagueTeamEmoji('SPURS')).toBe(PREMIER_LEAGUE_TEAMS['Tottenham Hotspur']);
    expect(getPremierLeagueTeamEmoji('  Man City  ')).toBe(PREMIER_LEAGUE_TEAMS['Manchester City']);
    expect(getPremierLeagueTeamEmoji('man utd')).toBe(PREMIER_LEAGUE_TEAMS['Manchester United']);
    expect(getPremierLeagueTeamEmoji('Wolves')).toBe(PREMIER_LEAGUE_TEAMS['Wolverhampton Wanderers']);
    expect(getPremierLeagueTeamEmoji('Brighton')).toBe(PREMIER_LEAGUE_TEAMS['Brighton & Hove Albion']);
    expect(getPremierLeagueTeamEmoji('West Ham')).toBe(PREMIER_LEAGUE_TEAMS['West Ham United']);
    expect(getPremierLeagueTeamEmoji('Villa')).toBe(PREMIER_LEAGUE_TEAMS['Aston Villa']);
    expect(getPremierLeagueTeamEmoji('Palace')).toBe(PREMIER_LEAGUE_TEAMS['Crystal Palace']);
  });

  test('returns null for unknown teams or empty input', () => {
    expect(getPremierLeagueTeamEmoji('')).toBeNull();
    expect(getPremierLeagueTeamEmoji('Real Madrid')).toBeNull();
    expect(getPremierLeagueTeamEmoji('Unknown FC')).toBeNull();

    expect(getPremierLeagueTeamStadium('')).toBeNull();
    expect(getPremierLeagueTeamStadium('Real Madrid')).toBeNull();
    expect(getPremierLeagueTeamStadium('Unknown FC')).toBeNull();
  });
});
