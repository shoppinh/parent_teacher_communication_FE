import { SESSION_STORAGE_KEY } from 'utils/constants';

export const loadSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveSessionStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(SESSION_STORAGE_KEY, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
