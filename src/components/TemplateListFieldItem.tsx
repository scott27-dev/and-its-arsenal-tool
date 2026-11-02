interface TemplateListFieldItemProps {
  placeholderKey: string;
  label: string;
  icon: string;
  items: string[];
  onItemChange: (key: string, index: number, value: string) => void;
  onAddItem: (key: string) => void;
  onRemoveItem: (key: string, index: number) => void;
  placeholderHint?: string;
}

export default function TemplateListFieldItem({
  placeholderKey,
  label,
  icon,
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
  placeholderHint,
}: TemplateListFieldItemProps) {
  // Ensure there is always at least one item displayed
  const displayItems = items.length === 0 ? [''] : items;

  return (
    <div className="field tall">
      <div className="field-row" style={{ marginBottom: 8 }}>
        <div className="label-group">
          <span className="field-icon">{icon}</span>
          <span className="field-label">{label}</span>
        </div>
        <span className="token-badge sky">[{placeholderKey}]</span>
      </div>

      {displayItems.map((item, index) => (
        <div className="item-row" key={index}>
          <span className="bullet">•</span>
          <input
            className="input"
            type="text"
            value={item}
            onChange={e => onItemChange(placeholderKey, index, e.target.value)}
            placeholder={placeholderHint || `Item #${index + 1}...`}
            autoCorrect="off"
            spellCheck={false}
          />
          {displayItems.length > 1 && (
            <button
              type="button"
              className="remove-btn"
              onClick={() => onRemoveItem(placeholderKey, index)}
              aria-label="Remove item"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button type="button" className="add-btn" onClick={() => onAddItem(placeholderKey)}>
        + Add Item
      </button>
    </div>
  );
}
