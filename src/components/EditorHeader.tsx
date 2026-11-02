import { useState } from 'react';

export type EditorMode = 'split' | 'edit' | 'preview';

interface EditorHeaderProps {
  title: string;
  onTitleChange: (text: string) => void;
  wordCount: number;
  charCount: number;
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
  showFields?: boolean;
  onToggleFields?: () => void;
  onCopy?: () => void;
}

const MODES: { value: EditorMode; label: string }[] = [
  { value: 'split', label: 'Split' },
  { value: 'edit', label: 'Edit' },
  { value: 'preview', label: 'Preview' },
];

export default function EditorHeader({
  title,
  onTitleChange,
  wordCount,
  charCount,
  mode,
  onModeChange,
  showFields = true,
  onToggleFields,
  onCopy,
}: EditorHeaderProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        {onToggleFields && (
          <button
            type="button"
            className={`btn fields-toggle${showFields ? ' active' : ''}`}
            onClick={onToggleFields}
          >
            {showFields ? '📋 Hide Fields' : '📋 Show Fields'}
          </button>
        )}
        <input
          className="title-input"
          placeholder="Article Title..."
          value={title}
          onChange={e => onTitleChange(e.target.value)}
        />
      </div>

      <div className="header-right">
        <span className="stat">
          {wordCount} words • {charCount} chars
        </span>
        <div className="mode-group">
          {MODES.map(m => (
            <button
              key={m.value}
              type="button"
              className={`mode-btn${mode === m.value ? ' selected' : ''}`}
              onClick={() => onModeChange(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {onCopy && (
          <button
            type="button"
            className={`btn copy-btn${isCopied ? ' copied' : ''}`}
            onClick={handleCopy}
            aria-label="Copy markdown to clipboard"
          >
            {isCopied ? '✓ Copied!' : '📋 Copy Markdown'}
          </button>
        )}
      </div>
    </header>
  );
}
