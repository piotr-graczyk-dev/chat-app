import 'intl-pluralrules';

import { addLocaleToAxiosClient } from '@api/axios';
import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';

import { en, pl } from './locales/';

export const resources = {
  en,
  pl,
} as const;

export const defaultNS = 'common';

const selectedLanguageFromStorage = new MMKV().getString('selectedLanguage');

const lng =
  selectedLanguageFromStorage || getLocales()[0].languageCode || undefined;

export const fallbackLng = 'pl';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng,
    fallbackLng,
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
  });

addLocaleToAxiosClient(lng || fallbackLng);

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
  addLocaleToAxiosClient(language);
};

z.setErrorMap(zodI18nMap);

export default i18n;
export type TranslationType = typeof fallbackLng;
export const translationOb = fallbackLng;
