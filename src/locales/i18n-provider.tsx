'use client';

import i18next from 'i18next';
import { useMemo } from 'react';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';

import { getStorage } from 'src/hooks/use-local-storage';

import { CONFIG } from 'src/config-global';

import { i18nOptions } from './config-locales';

import type { LanguageValue } from './config-locales';

// ----------------------------------------------------------------------

const lng = getStorage('i18nextLng');

const init = CONFIG.isStaticExport
  ? { ...i18nOptions(lng), detection: { caches: ['localStorage'] } }
  : { ...i18nOptions(lng), detection: { caches: ['localStorage'] } };
// console.log(lng);

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)))
  .init(init);

// ----------------------------------------------------------------------

type Props = {
  lang?: LanguageValue | undefined;
  children: React.ReactNode;
};

export function I18nProvider({ lang, children }: Props) {
  useMemo(() => {
    if (lang) {
      i18next.changeLanguage(lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Provider i18n={i18next}>{children}</Provider>;
}
