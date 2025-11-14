import 'server-only';

const dictionaries = {
  en: () => import('../../messages/en.json').then((m) => m.default),
  es: () => import('../../messages/es.json').then((m) => m.default),
};

export type SupportedLocale = 'en' | 'es';

export const getDictionary = async (locale: SupportedLocale | string) => {
  const safeLocale: SupportedLocale = locale === 'es' ? 'es' : 'en';
  return dictionaries[safeLocale]();
};

