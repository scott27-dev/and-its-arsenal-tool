// @vitest-environment happy-dom
import {
  ARSENAL_FORM_STORAGE_KEY,
  loadStoredArsenalForm,
  saveStoredArsenalForm,
} from '../src/utils/formStorage';

describe('formStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('returns null when no Arsenal form is stored', async () => {
    expect(await loadStoredArsenalForm()).toBeNull();
  });

  test('saves and loads valid 5-emoji Arsenal form', async () => {
    const sampleForm = ['🟩', '🟩', '🟥', '🟧', '🟩'];
    await saveStoredArsenalForm(sampleForm);
    expect(await loadStoredArsenalForm()).toEqual(sampleForm);
  });

  test('rejects corrupted or invalid length data', async () => {
    window.localStorage.setItem(ARSENAL_FORM_STORAGE_KEY, JSON.stringify(['🟩', '🟥']));
    expect(await loadStoredArsenalForm()).toBeNull();

    window.localStorage.setItem(
      ARSENAL_FORM_STORAGE_KEY,
      JSON.stringify(['🟩', '🟥', '⚽', '🟧', '🟩'])
    );
    expect(await loadStoredArsenalForm()).toBeNull();

    window.localStorage.setItem(ARSENAL_FORM_STORAGE_KEY, 'not-valid-json');
    expect(await loadStoredArsenalForm()).toBeNull();
  });

  test('does not save form if array length is not 5', async () => {
    await saveStoredArsenalForm(['🟩', '🟩']);
    expect(window.localStorage.getItem(ARSENAL_FORM_STORAGE_KEY)).toBeNull();
  });
});
