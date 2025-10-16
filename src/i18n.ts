import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const initConfig = {
  ns: [],
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  partialBundledLanguages: true,
  react: { useSuspense: true },
};

i18n
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      fetch(`../public/locales/${language}/${namespace}.json`).then((res) =>
        res.json(),
      ),
    ),
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(initConfig);

export default i18n;
