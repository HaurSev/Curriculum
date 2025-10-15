import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      fetch(`/locales/${language}/${namespace}.json`).then((res) => res.json()),
    ),
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    lng: 'en',
    ns: [],
  });

export default i18n;
