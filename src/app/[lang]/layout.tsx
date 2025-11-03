import { notFound } from 'next/navigation';
import { AnimationProvider } from '@/providers/AnimationProvider';
import { getDictionary, SupportedLocale } from './dictionaries';
import { getT } from '@/lib/i18n-server';
import { YouTubeTeaserSticky } from '@/components/organisms/YouTubeTeaserSticky';
import { CookieConsent } from '@/components/organisms/CookieConsent';

type LayoutParams = { children: React.ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export default async function LocaleLayout({ children, params }: LayoutParams) {
  const { lang } = await params;

  if (!['en', 'es'].includes(lang as string)) {
    notFound();
  }

  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const t = getT(dict, 'youtube_teaser');
  const tc = getT(dict, 'cookie_consent');
  const teaserStrings = {
    title: t('title'),
    description: t('description'),
    buttonLabel: t('buttonLabel'),
  };
  const consentDict = { cookie_consent: {
    title: tc('title'),
    message: tc('message'),
    policyLabel: tc('policyLabel'),
    buttons: {
      acceptAll: tc('buttons.acceptAll'),
      reject: tc('buttons.reject'),
      manage: tc('buttons.manage'),
      save: tc('buttons.save'),
    },
    categories: {
      essential: { title: tc('categories.essential.title'), text: tc('categories.essential.text') },
      functional: { title: tc('categories.functional.title'), text: tc('categories.functional.text') },
      analytics: { title: tc('categories.analytics.title'), text: tc('categories.analytics.text') },
      marketing: { title: tc('categories.marketing.title'), text: tc('categories.marketing.text') },
    },
  }} as unknown as Record<string, unknown>;

  return (
    <AnimationProvider>
      {children}
      {/* Sticky YouTube teaser for all pages */}
      <YouTubeTeaserSticky strings={teaserStrings} />
      {/* Global cookie consent banner */}
      <CookieConsent dict={consentDict} policyHref={`/${lang}/cookies`} />
    </AnimationProvider>
  );
}

