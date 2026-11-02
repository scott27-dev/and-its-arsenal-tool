export const ARSENAL_FORM_STORAGE_KEY = '@and_its_arsenal_blogger_arsenal_form';

const VALID_EMOJIS = new Set(['🟧', '🟥', '🟩']);

/**
 * Loads the saved Arsenal form emojis from persistent localStorage.
 * Returns the array of 5 emojis if stored and valid, otherwise null.
 * (Kept async to preserve the original API.)
 */
export async function loadStoredArsenalForm(): Promise<string[] | null> {
  try {
    const raw = window.localStorage.getItem(ARSENAL_FORM_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (
      Array.isArray(parsed) &&
      parsed.length === 5 &&
      parsed.every(emoji => VALID_EMOJIS.has(emoji))
    ) {
      return parsed;
    }
    return null;
  } catch (error) {
    console.warn('Failed to load stored Arsenal form:', error);
    return null;
  }
}

/**
 * Persists the Arsenal form emojis to localStorage.
 */
export async function saveStoredArsenalForm(emojis: string[]): Promise<void> {
  try {
    if (Array.isArray(emojis) && emojis.length === 5) {
      window.localStorage.setItem(ARSENAL_FORM_STORAGE_KEY, JSON.stringify(emojis));
    }
  } catch (error) {
    console.warn('Failed to save Arsenal form:', error);
  }
}
