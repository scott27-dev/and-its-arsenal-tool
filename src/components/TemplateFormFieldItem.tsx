interface TemplateFormFieldItemProps {
  placeholderKey: string;
  label: string;
  icon: string;
  emojis: string[];
  onCycleEmoji: (key: string, index: number) => void;
}

export default function TemplateFormFieldItem({
  placeholderKey,
  label,
  icon,
  emojis,
  onCycleEmoji,
}: TemplateFormFieldItemProps) {
  // Ensure we always have exactly 5 emojis
  const displayEmojis =
    emojis && emojis.length === 5 ? emojis : ['🟧', '🟧', '🟧', '🟧', '🟧'];

  return (
    <div className="field tall">
      <div className="field-row" style={{ marginBottom: 10 }}>
        <div className="label-group">
          <span className="field-icon">{icon}</span>
          <span className="field-label">{label}</span>
        </div>
        <span className="token-badge amber">[{placeholderKey}]</span>
      </div>

      <div className="emojis-row">
        {displayEmojis.map((emoji, index) => (
          <button
            key={index}
            type="button"
            className="emoji-btn"
            onClick={() => onCycleEmoji(placeholderKey, index)}
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className="helper">Click to cycle: 🟧 Amber ➔ 🟥 Red ➔ 🟩 Green</div>
    </div>
  );
}
