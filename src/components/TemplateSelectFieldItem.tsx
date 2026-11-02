import { useState } from 'react';

interface TemplateSelectFieldItemProps {
  placeholderKey: string;
  label: string;
  icon: string;
  value: string;
  options: string[];
  onChangeValue: (key: string, value: string) => void;
  placeholderHint?: string;
}

export default function TemplateSelectFieldItem({
  placeholderKey,
  label,
  icon,
  value,
  options,
  onChangeValue,
  placeholderHint = 'Select an option...',
}: TemplateSelectFieldItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option: string) => {
    onChangeValue(placeholderKey, option);
    setIsOpen(false);
  };

  return (
    <div className="field">
      <div className="field-row">
        <div className="label-group">
          <span className="field-icon">{icon}</span>
          <span className="field-label">{label}</span>
        </div>
        <span className="token-badge">{`[${placeholderKey}]`}</span>
      </div>

      <button
        type="button"
        className={`trigger${isOpen ? ' open' : ''}${value ? ' has-value' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span>{value || placeholderHint}</span>
        <span className="chevron">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="options">
          {options.map(option => {
            const isSelected = value === option;
            return (
              <button
                key={option}
                type="button"
                className={`option${isSelected ? ' selected' : ''}`}
                onClick={() => handleSelectOption(option)}
              >
                <span>{option}</span>
                {isSelected && <span className="check">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
