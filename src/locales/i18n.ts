import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translationsJson } from "./config";
import { DEFAULT_LOCALE } from 'utils/localization/config';

// import en from './en/translation.json';
// import vi from './vi/translation.json';
// import { convertLanguageJsonToObject } from './translations';

// export const translationsJson = {
//   en: {
//     translation: en,
//   },
//   vi: {
//     translation: vi,
//   },
// };

export const detectionOption = {
  // order: ['querystring', 'localStorage '],
  lookupQuerystring: 'hl',
}

// Create the 'translations' object to provide full intellisense support for the static json files.
// convertLanguageJsonToObject(en);
// convertLanguageJsonToObject(vi);

export const i18n = i18next
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    detection: detectionOption,
    resources: translationsJson,
    fallbackLng: [ DEFAULT_LOCALE ],
    debug:
      process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // lng: localStorage.getItem("i18nextLng") ? `${localStorage.getItem("i18nextLng")}` : DEFAULT_LOCALE
  });