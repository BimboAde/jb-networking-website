import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { getDictionary, SupportedLocale } from '../dictionaries';
import { getT } from '@/lib/i18n-server';
import { Heading } from '@/components/atoms/Heading';
import { CookieConsent } from '@/components/organisms/CookieConsent';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('cookies', lang);
  return metadata;
}

export default async function CookiesPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('cookies', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const t = getT(dict, 'legal.cookies');

  const categories = ['essential','functional','analytics','marketing'] as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      <main className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading level={1} className="mb-8">{t('title')}</Heading>
          <p className="text-gray-700 mb-8">{t('intro')}</p>
          <div className="space-y-8">
            {categories.map((c) => (
              <section key={c}>
                <Heading level={2} className="mb-2">{t(`${c}.title`)}</Heading>
                <p className="text-gray-700 leading-relaxed">{t(`${c}.text`)}</p>
              </section>
            ))}
          </div>
          <div className="mt-10">
            <CookieConsent dict={dict} inlineManageOnly />
          </div>
        </div>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


