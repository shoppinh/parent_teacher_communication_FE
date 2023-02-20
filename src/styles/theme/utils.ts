import { StyleConstants } from 'styles/constants/style';
import { ThemeKeyType } from './slice/types';

/* istanbul ignore next line */
export const isSystemDark = window?.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')?.matches
  : undefined;

export function saveTheme(theme: ThemeKeyType) {
  window.localStorage && localStorage.setItem('selectedTheme', theme);
}

/* istanbul ignore next line */
export function getThemeFromStorage(): ThemeKeyType | null {
  return window.localStorage
    ? (localStorage.getItem('selectedTheme') as ThemeKeyType) || null
    : null;
}

export function pxToRem(value: number) {
  return value / StyleConstants.BASE_FONT_SIZE;
}
