// ----------------------------------------------------------------------

export type LanguageValue = 'en' | 'ru' | 'qr' | 'uz';

export const fallbackLng = 'uz';
export const languages = ['ru', 'en', 'qr', 'uz'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages: Record<
  LanguageValue,
  { success: string; error: string; loading: string }
> = {
  en: {
    success: 'Language has been changed!',
    error: 'Error changing language!',
    loading: 'Loading...',
  },
  uz: {
    success: 'Til ozgartirildi',
    error: 'Xatolik yuz berdi',
    loading: 'Yukalmoqda..',
  },
  ru: {
    success: 'Язык изминен',
    error: 'Произашла ошибка',
    loading: 'Загружается...',
  },
  qr: {
    success: 'La langue a été changée!',
    error: 'Erreur lors du changement de langue!',
    loading: 'Chargement...',
  },
};
