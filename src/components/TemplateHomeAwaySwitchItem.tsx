interface TemplateHomeAwaySwitchItemProps {
  isHome: boolean;
  opponentTeam?: string;
  onToggle: (isHome: boolean) => void;
}

export default function TemplateHomeAwaySwitchItem({
  isHome,
  opponentTeam = '',
  onToggle,
}: TemplateHomeAwaySwitchItemProps) {
  const opp = opponentTeam.trim() || '[OPP TEAM]';

  return (
    <div className="field">
      <div className="field-row" style={{ marginBottom: 8 }}>
        <div className="label-group">
          <span className="field-icon">{isHome ? '🏠' : '✈️'}</span>
          <span className="field-label">Fixture Location (Title Order)</span>
        </div>
        <span className="token-badge">[HOME / AWAY]</span>
      </div>

      <div className="switch">
        <button
          type="button"
          className={`segment home${isHome ? ' active' : ''}`}
          onClick={() => onToggle(true)}
          data-testid="switch-home"
        >
          🏠 Home (Arsenal first)
        </button>
        <button
          type="button"
          className={`segment away${!isHome ? ' active' : ''}`}
          onClick={() => onToggle(false)}
          data-testid="switch-away"
        >
          ✈️ Away (Arsenal second)
        </button>
      </div>

      <div className="order-preview">
        Title team order:{' '}
        {isHome ? (
          <>
            <span className="team arsenal">Arsenal</span> vs{' '}
            <span className="team">{opp}</span>
          </>
        ) : (
          <>
            <span className="team">{opp}</span> vs{' '}
            <span className="team arsenal">Arsenal</span>
          </>
        )}
      </div>
    </div>
  );
}
