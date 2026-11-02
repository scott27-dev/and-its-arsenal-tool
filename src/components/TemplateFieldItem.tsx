interface TemplateFieldItemProps {
  placeholderKey: string;
  label: string;
  icon: string;
  value: string;
  onChangeValue: (key: string, value: string) => void;
  multiline?: boolean;
  placeholderHint?: string;
}

export default function TemplateFieldItem({
  placeholderKey,
  label,
  icon,
  value,
  onChangeValue,
  multiline = false,
  placeholderHint,
}: TemplateFieldItemProps) {
  const common = {
    className: 'input',
    'data-testid': `template-field-${placeholderKey}`,
    value,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => onChangeValue(placeholderKey, e.target.value),
    placeholder: placeholderHint || `Enter ${label.toLowerCase()}...`,
    autoCorrect: 'off',
    spellCheck: false,
  };

  return (
    <div className="field">
      <div className="field-row">
        <div className="label-group">
          <span className="field-icon">{icon}</span>
          <span className="field-label">{label}</span>
        </div>
        <span className="token-badge">[{placeholderKey}]</span>
      </div>
      {multiline ? (
        <textarea {...common} rows={4} />
      ) : (
        <input {...common} type="text" />
      )}
    </div>
  );
}
