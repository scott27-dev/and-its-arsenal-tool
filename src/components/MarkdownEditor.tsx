import { useEffect, useMemo, useRef, useState } from 'react';
import EditorHeader, { EditorMode } from './EditorHeader';
import MarkdownPreview, { stripPlaceholderVariables } from './MarkdownPreview';
import TemplateFieldsPanel, { FieldDefinition } from './TemplateFieldsPanel';
import preMatchTemplate from '../../templates/PreMatch.md?raw';
import {
  loadStoredArsenalForm,
  saveStoredArsenalForm,
} from '../utils/formStorage';
import {
  getPremierLeagueTeamEmoji,
  getPremierLeagueTeamStadium,
} from '../utils/premierLeagueTeams';
import { formatHeadToHeadItem } from '../utils/headToHeadFormatter';
import { formatTeamNewsItem } from '../utils/teamNewsFormatter';
import { getDeviceTimezoneAbbreviation } from '../utils/timezone';

const RAMBLINGS_MARKER = '✍🏼 **Pre-Match Ramblings**';

const FORM_CYCLE = ['🟧', '🟥', '🟩'] as const;

const INITIAL_FORM_STATE = ['🟧', '🟧', '🟧', '🟧', '🟧'];

const KNOWN_FIELD_METADATA: Record<
  string,
  { label: string; icon: string; multiline?: boolean; hint?: string; options?: string[] }
> = {
  DATE: {
    label: 'Fixture Date',
    icon: '📅',
    hint: 'Select fixture date...',
  },
  COMPETITION: {
    label: 'Competition',
    icon: '🏆',
    options: [
      'Premier League',
      'FA Cup',
      'EFL Cup',
      'UEFA Champions League',
      'Club Friendlies',
    ],
    hint: 'Select competition...',
  },
  '24HR TIME': { label: 'Kick Off Time', icon: '🕟', hint: 'e.g. 16:30' },
  TIMEZONE: { label: 'Timezone', icon: '🌍', hint: 'e.g. BST / GMT' },
  VENUE: { label: 'Venue', icon: '🏟️', hint: 'e.g. Emirates Stadium' },
  BROADCASTER: {
    label: 'UK Broadcaster',
    icon: '📺',
    options: [
      'Sky Sports',
      'TNT Sports',
      'Amazon Prime Video',
      'BBC',
      'ITV',
      'Arsenal.com',
      'N/A',
    ],
    hint: 'Select broadcaster...',
  },
  REFEREE: { label: 'Referee', icon: '🙎🏻‍♂️', hint: 'e.g. Michael Oliver' },
  VAR: { label: 'VAR Official', icon: '📹', hint: 'e.g. Stuart Attwell' },
  'LIST ARSENAL TEAM NEWS': {
    label: 'Arsenal Team News',
    icon: '🔴',
    multiline: true,
    hint: 'One per line, e.g. Bukayo Saka (hamstring): Faces late fitness test',
  },
  'ARSENAL FORM': {
    label: 'Arsenal Form',
    icon: '⚽',
  },
  'OPP TEAM EMOJI': { label: 'Opponent Emoji', icon: '🎨', hint: 'e.g. 🔵, ⚪, 🦅' },
  'OPP TEAM': { label: 'Opponent Team', icon: '⚔️', hint: 'e.g. Manchester City' },
  'LIST OPP TEAM NEWS': {
    label: 'Opponent Team News',
    icon: '📋',
    multiline: true,
    hint: 'One per line, e.g. Cole Palmer (knock): Expected to start',
  },
  'OPP TEAM FORM': {
    label: 'Opponent Form',
    icon: '⚽',
  },
  'HEAD TO HEAD': {
    label: 'Head-to-Head',
    icon: '⚔️',
    multiline: true,
    hint: 'e.g. Home Team 0–0 Away Team (Sep 13, 2025, Premier League)',
  },
  'LIST MATCH FACTS': {
    label: 'Match Facts',
    icon: '📖',
    multiline: true,
    hint: 'One per line, e.g. Arsenal are unbeaten in 10 home games',
  },
  'PRE MATCH RAMBLINGS': {
    label: 'Pre-Match Ramblings',
    icon: '✍🏼',
    multiline: true,
    hint: 'Enter pre-match ramblings...',
  },
};

function formatLabelFromKey(key: string): string {
  const cleaned = key.startsWith('LIST ') ? key.slice(5) : key;
  return cleaned
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateMarkdown(
  baseTemplate: string,
  values: Record<string, string>,
  listValues: Record<string, string[]>,
  formValues: Record<string, string[]>,
  ramblings: string,
  isHome: boolean = true
): string {
  let result = baseTemplate;

  // 0. Handle Home/Away team matchup in title
  const oppTeam = values['OPP TEAM']?.trim() || '[OPP TEAM]';
  const titleMatchup = isHome
    ? `Arsenal vs ${oppTeam}`
    : `${oppTeam} vs Arsenal`;

  result = result.replace('[HOME] vs [OPP TEAM]', titleMatchup);
  result = result.replace('[OPP TEAM] vs [HOME]', titleMatchup);
  result = result.split('[HOME]').join(isHome ? 'Arsenal' : oppTeam);

  // 1. Replace regular text placeholders
  for (const [key, val] of Object.entries(values)) {
    const placeholder = `[${key}]`;
    if (val && val.trim().length > 0) {
      if (
        key === 'HEAD TO HEAD' ||
        key.includes('TEAM NEWS') ||
        key === 'LIST MATCH FACTS'
      ) {
        const format =
          key === 'HEAD TO HEAD'
            ? formatHeadToHeadItem
            : key === 'LIST MATCH FACTS'
            ? (item: string) => item
            : formatTeamNewsItem;
        const formattedList = val
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .map(line => {
            const cleaned = line.replace(/^[-*•]\s*/, '').trim();
            return `-   ${format(cleaned)}`;
          })
          .join('\n');
        result = result.split(placeholder).join(formattedList);
      } else {
        result = result.split(placeholder).join(val.trim());
      }
    }
  }

  // 2. Replace LIST placeholders with markdown bullet list items
  for (const [key, items] of Object.entries(listValues)) {
    const placeholder = `[${key}]`;
    const validItems = (items || []).filter(it => it && it.trim().length > 0);
    if (validItems.length > 0) {
      const isTeamNews = key.includes('TEAM NEWS');
      const markdownList = validItems
        .map(it => {
          const formatted = isTeamNews ? formatTeamNewsItem(it) : it.trim();
          return `-   ${formatted}`;
        })
        .join('\n');
      result = result.split(placeholder).join(markdownList);
    }
  }

  // 3. Replace FORM placeholders with 5 emojis
  for (const [key, emojis] of Object.entries(formValues)) {
    const placeholder = `[${key}]`;
    const formString = (emojis && emojis.length === 5 ? emojis : INITIAL_FORM_STATE).join('');
    result = result.split(placeholder).join(formString);
  }

  // 4. Preserve user ramblings if present
  if (ramblings && ramblings.trim().length > 0) {
    if (result.includes('[PRE MATCH RAMBLINGS]')) {
      result = result.split('[PRE MATCH RAMBLINGS]').join(ramblings.trim());
    } else if (result.includes(RAMBLINGS_MARKER) && !result.includes(ramblings.trim())) {
      const parts = result.split(RAMBLINGS_MARKER);
      result = `${parts[0]}${RAMBLINGS_MARKER}\n\n${ramblings.trim()}`;
    }
  }

  return result;
}

export default function MarkdownEditor() {
  const [title, setTitle] = useState('Pre-Match Report');
  const [isHome, setIsHome] = useState(true);
  const initialFieldValues = useMemo(
    () => ({
      TIMEZONE: getDeviceTimezoneAbbreviation(),
      VENUE: 'Emirates Stadium',
    }),
    []
  );
  const [fieldValues, setFieldValues] =
    useState<Record<string, string>>(initialFieldValues);
  const [listFieldValues, setListFieldValues] = useState<Record<string, string[]>>({});
  const [customRamblings, setCustomRamblings] = useState('');
  const [mode, setMode] = useState<EditorMode>('preview');
  const [showFields, setShowFields] = useState(true);

  // Extract all unique [CAPITAL_TEXT] placeholders from the template
  const fieldDefinitions: FieldDefinition[] = useMemo(() => {
    const rawMatches = preMatchTemplate.match(/\[[A-Z0-9_\s]+\]/g);
    if (!rawMatches) {
      return [];
    }
    const uniqueKeys = Array.from(new Set(rawMatches.map(m => m.slice(1, -1))));

    return uniqueKeys.map(key => {
      const isList =
        key.startsWith('LIST') &&
        !key.includes('TEAM NEWS') &&
        key !== 'LIST MATCH FACTS';
      const isForm = key.includes('FORM');
      const isDate = key === 'DATE';
      const meta = KNOWN_FIELD_METADATA[key];
      return {
        key,
        label: meta?.label || formatLabelFromKey(key),
        icon: meta?.icon || (isForm ? '⚽' : isList ? '📋' : isDate ? '📅' : '✏️'),
        isList,
        isForm,
        isDate,
        options: meta?.options,
        multiline: meta?.multiline || false,
        hint: meta?.hint || `Enter ${key.toLowerCase()}...`,
      };
    });
  }, []);

  // Initialize form fields with 5 amber squares each
  const initialFormValues = useMemo(() => {
    const initial: Record<string, string[]> = {};
    fieldDefinitions.forEach(field => {
      if (field.isForm) {
        initial[field.key] = [...INITIAL_FORM_STATE];
      }
    });
    return initial;
  }, [fieldDefinitions]);

  const [formFieldValues, setFormFieldValues] =
    useState<Record<string, string[]>>(initialFormValues);

  // Compute live markdown content from template + regular values + list values + form values + ramblings
  const [content, setContent] = useState(() =>
    generateMarkdown(
      preMatchTemplate,
      initialFieldValues,
      {},
      initialFormValues,
      '',
      true
    )
  );

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  const valuesRef = useRef({
    fieldValues,
    listFieldValues,
    formFieldValues,
    customRamblings,
    isHome,
  });
  valuesRef.current = {
    fieldValues,
    listFieldValues,
    formFieldValues,
    customRamblings,
    isHome,
  };

  // Load persisted Arsenal form on mount
  useEffect(() => {
    let isMounted = true;
    loadStoredArsenalForm().then(savedForm => {
      if (isMounted && savedForm && savedForm.length === 5) {
        const updated = { ...valuesRef.current.formFieldValues, 'ARSENAL FORM': savedForm };
        setFormFieldValues(updated);
        setContent(
          generateMarkdown(
            preMatchTemplate,
            valuesRef.current.fieldValues,
            valuesRef.current.listFieldValues,
            updated,
            valuesRef.current.customRamblings,
            valuesRef.current.isHome
          )
        );
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Handler for Home / Away fixture location toggle
  const handleToggleHomeAway = (newIsHome: boolean) => {
    const updated = { ...fieldValues };
    if (!newIsHome) {
      // Away fixture: auto-populate opponent team's stadium if known
      const stadium = getPremierLeagueTeamStadium(updated['OPP TEAM'] || '');
      if (stadium) {
        updated.VENUE = stadium;
      }
    } else {
      // Home fixture: Arsenal's home ground
      updated.VENUE = 'Emirates Stadium';
    }
    setIsHome(newIsHome);
    setFieldValues(updated);
    setContent(
      generateMarkdown(
        preMatchTemplate,
        updated,
        listFieldValues,
        formFieldValues,
        customRamblings,
        newIsHome
      )
    );
  };

  // Handler for regular text fields
  const handleFieldValueChange = (key: string, value: string) => {
    const updated = { ...fieldValues, [key]: value };

    // Auto-populate opponent emoji and away venue when a matching Premier League team is entered
    if (key === 'OPP TEAM') {
      const teamEmoji = getPremierLeagueTeamEmoji(value);
      if (teamEmoji) {
        updated['OPP TEAM EMOJI'] = teamEmoji;
      }

      // For away games, auto-populate the stadium for the opponent team
      if (!isHome) {
        const stadium = getPremierLeagueTeamStadium(value);
        if (stadium) {
          updated.VENUE = stadium;
        }
      }
    }

    if (key === 'PRE MATCH RAMBLINGS') {
      setCustomRamblings(value);
    }

    setFieldValues(updated);
    setContent(
      generateMarkdown(
        preMatchTemplate,
        updated,
        listFieldValues,
        formFieldValues,
        key === 'PRE MATCH RAMBLINGS' ? value : customRamblings,
        isHome
      )
    );
  };

  // Handler for list item change
  const handleListChangeItem = (key: string, index: number, value: string) => {
    const currentList = listFieldValues[key] || [''];
    const updatedList = [...currentList];
    updatedList[index] = value;
    const updated = { ...listFieldValues, [key]: updatedList };
    setListFieldValues(updated);
    setContent(
      generateMarkdown(
        preMatchTemplate,
        fieldValues,
        updated,
        formFieldValues,
        customRamblings,
        isHome
      )
    );
  };

  // Handler for adding a new list item
  const handleListAddItem = (key: string) => {
    setListFieldValues(prev => {
      const currentList = prev[key] || [''];
      return { ...prev, [key]: [...currentList, ''] };
    });
  };

  // Handler for removing a list item
  const handleListRemoveItem = (key: string, index: number) => {
    const currentList = listFieldValues[key] || [''];
    const updatedList = currentList.filter((_, idx) => idx !== index);
    const finalItems = updatedList.length === 0 ? [''] : updatedList;
    const updated = { ...listFieldValues, [key]: finalItems };
    setListFieldValues(updated);
    setContent(
      generateMarkdown(
        preMatchTemplate,
        fieldValues,
        updated,
        formFieldValues,
        customRamblings,
        isHome
      )
    );
  };

  // Handler for cycling an emoji in the 5-item form row (amber -> red -> green -> amber)
  const handleCycleFormEmoji = (key: string, index: number) => {
    const currentEmojis = formFieldValues[key] || [...INITIAL_FORM_STATE];
    const currentEmoji = currentEmojis[index] || '🟧';
    const currentCycleIndex = FORM_CYCLE.indexOf(currentEmoji as (typeof FORM_CYCLE)[number]);
    const nextEmoji = FORM_CYCLE[(currentCycleIndex + 1) % FORM_CYCLE.length];

    const updatedEmojis = [...currentEmojis];
    updatedEmojis[index] = nextEmoji;
    const updated = { ...formFieldValues, [key]: updatedEmojis };

    // Persist Arsenal form across sessions
    if (key === 'ARSENAL FORM') {
      saveStoredArsenalForm(updatedEmojis);
    }

    setFormFieldValues(updated);
    setContent(
      generateMarkdown(
        preMatchTemplate,
        fieldValues,
        listFieldValues,
        updated,
        customRamblings,
        isHome
      )
    );
  };

  const handleResetFields = () => {
    const resetFields = {
      TIMEZONE: getDeviceTimezoneAbbreviation(),
      VENUE: 'Emirates Stadium',
    };
    setIsHome(true);
    setFieldValues(resetFields);
    setListFieldValues({});
    setFormFieldValues(initialFormValues);
    setCustomRamblings('');
    saveStoredArsenalForm(initialFormValues['ARSENAL FORM'] || INITIAL_FORM_STATE);
    setContent(
      generateMarkdown(
        preMatchTemplate,
        resetFields,
        {},
        initialFormValues,
        '',
        true
      )
    );
  };

  const handleContentChange = (text: string) => {
    setContent(text);
    if (text.includes(RAMBLINGS_MARKER)) {
      const parts = text.split(RAMBLINGS_MARKER);
      const ramblingsText = parts[1]?.trim() || '';
      setCustomRamblings(ramblingsText);
      setFieldValues(prev => ({
        ...prev,
        'PRE MATCH RAMBLINGS': ramblingsText,
      }));
    }
  };

  const handleCopyMarkdown = () => {
    const textToCopy = stripPlaceholderVariables(content);
    navigator.clipboard.writeText(textToCopy).catch(error => {
      console.warn('Failed to copy markdown:', error);
    });
  };

  return (
    <div className="editor">
      <EditorHeader
        title={title}
        onTitleChange={setTitle}
        wordCount={wordCount}
        charCount={charCount}
        mode={mode}
        onModeChange={setMode}
        showFields={showFields}
        onToggleFields={() => setShowFields(prev => !prev)}
        onCopy={handleCopyMarkdown}
      />

      <div className="panes">
        {showFields && (
          <TemplateFieldsPanel
            fields={fieldDefinitions}
            values={fieldValues}
            listValues={listFieldValues}
            formValues={formFieldValues}
            isHome={isHome}
            onToggleHomeAway={handleToggleHomeAway}
            onChangeValue={handleFieldValueChange}
            onListChangeItem={handleListChangeItem}
            onListAddItem={handleListAddItem}
            onListRemoveItem={handleListRemoveItem}
            onCycleFormEmoji={handleCycleFormEmoji}
            onResetAll={handleResetFields}
          />
        )}

        {(mode === 'split' || mode === 'edit') && (
          <div className={`edit-pane${mode === 'split' ? ' split' : ''}`}>
            <textarea
              className="md-textarea"
              value={content}
              onChange={e => handleContentChange(e.target.value)}
              placeholder="Type your markdown here..."
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>
        )}

        {(mode === 'split' || mode === 'preview') && (
          <MarkdownPreview content={content} />
        )}
      </div>
    </div>
  );
}
