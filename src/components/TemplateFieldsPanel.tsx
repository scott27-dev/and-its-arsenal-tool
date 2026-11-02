import TemplateFieldItem from './TemplateFieldItem';
import TemplateListFieldItem from './TemplateListFieldItem';
import TemplateFormFieldItem from './TemplateFormFieldItem';
import TemplateSelectFieldItem from './TemplateSelectFieldItem';
import TemplateDateFieldItem from './TemplateDateFieldItem';
import TemplateHomeAwaySwitchItem from './TemplateHomeAwaySwitchItem';

export interface FieldDefinition {
  key: string;
  label: string;
  icon: string;
  isList?: boolean;
  isForm?: boolean;
  isDate?: boolean;
  options?: string[];
  multiline?: boolean;
  hint?: string;
}

interface TemplateFieldsPanelProps {
  fields: FieldDefinition[];
  values: Record<string, string>;
  listValues: Record<string, string[]>;
  formValues: Record<string, string[]>;
  isHome?: boolean;
  onToggleHomeAway?: (isHome: boolean) => void;
  onChangeValue: (key: string, value: string) => void;
  onListChangeItem: (key: string, index: number, value: string) => void;
  onListAddItem: (key: string) => void;
  onListRemoveItem: (key: string, index: number) => void;
  onCycleFormEmoji: (key: string, index: number) => void;
  onResetAll: () => void;
}

export default function TemplateFieldsPanel({
  fields,
  values,
  listValues,
  formValues,
  isHome = true,
  onToggleHomeAway,
  onChangeValue,
  onListChangeItem,
  onListAddItem,
  onListRemoveItem,
  onCycleFormEmoji,
  onResetAll,
}: TemplateFieldsPanelProps) {
  const visibleFields = fields.filter(f => f.key !== 'HOME');

  const filledCount = visibleFields.filter(f => {
    if (f.isForm) {
      return formValues[f.key] && formValues[f.key].length === 5;
    }
    if (f.isList) {
      return (
        listValues[f.key] &&
        listValues[f.key].some(item => item && item.trim().length > 0)
      );
    }
    return values[f.key] && values[f.key].trim().length > 0;
  }).length;

  return (
    <aside className="panel">
      <div className="panel-header">
        <div className="panel-title-group">
          <h2 className="panel-title">Template Fields</h2>
          <span className="progress-badge">
            {filledCount}/{visibleFields.length}
          </span>
        </div>
        <button
          type="button"
          className="btn reset-btn"
          onClick={onResetAll}
          data-testid="reset-all-button"
        >
          Reset
        </button>
      </div>

      <div className="panel-scroll">
        <TemplateHomeAwaySwitchItem
          isHome={isHome}
          opponentTeam={values['OPP TEAM'] || ''}
          onToggle={onToggleHomeAway || (() => {})}
        />

        {visibleFields.map(field => {
          if (field.isDate || field.key === 'DATE') {
            return (
              <TemplateDateFieldItem
                key={field.key}
                placeholderKey={field.key}
                label={field.label}
                icon={field.icon}
                value={values[field.key] || ''}
                onChangeValue={onChangeValue}
              />
            );
          }

          if (field.isForm) {
            return (
              <TemplateFormFieldItem
                key={field.key}
                placeholderKey={field.key}
                label={field.label}
                icon={field.icon}
                emojis={formValues[field.key] || ['🟧', '🟧', '🟧', '🟧', '🟧']}
                onCycleEmoji={onCycleFormEmoji}
              />
            );
          }

          if (field.isList) {
            return (
              <TemplateListFieldItem
                key={field.key}
                placeholderKey={field.key}
                label={field.label}
                icon={field.icon}
                items={listValues[field.key] || ['']}
                onItemChange={onListChangeItem}
                onAddItem={onListAddItem}
                onRemoveItem={onListRemoveItem}
                placeholderHint={field.hint}
              />
            );
          }

          if (field.options && field.options.length > 0) {
            return (
              <TemplateSelectFieldItem
                key={field.key}
                placeholderKey={field.key}
                label={field.label}
                icon={field.icon}
                value={values[field.key] || ''}
                options={field.options}
                onChangeValue={onChangeValue}
                placeholderHint={field.hint}
              />
            );
          }

          return (
            <TemplateFieldItem
              key={field.key}
              placeholderKey={field.key}
              label={field.label}
              icon={field.icon}
              value={values[field.key] || ''}
              onChangeValue={onChangeValue}
              multiline={field.multiline}
              placeholderHint={field.hint}
            />
          );
        })}
      </div>
    </aside>
  );
}
