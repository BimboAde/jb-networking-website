import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { getDictionary, SupportedLocale } from '../dictionaries';
import { getT } from '@/lib/i18n-server';
import { Heading } from '@/components/atoms/Heading';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('terms', lang);
  return metadata;
}

export default async function TermsPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('terms', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const t = getT(dict, 'legal.terms');

  const sections = [0,1,2,3,4].map((i) => ({
    title: t(`sections.${i}.title`),
    text: t(`sections.${i}.text`),
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      <main className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading level={1} className="mb-8">{t('title')}</Heading>
          <p className="text-gray-600 mb-8">{t('lastUpdated')}</p>
          <div className="space-y-8">
            {sections.map((s, i) => (
              <section key={i}>
                <Heading level={2} className="mb-2">{s.title}</Heading>
                <p className="text-gray-700 leading-relaxed">{s.text}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


