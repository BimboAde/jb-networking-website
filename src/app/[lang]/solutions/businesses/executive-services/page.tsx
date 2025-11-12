import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { getDictionary, SupportedLocale } from '../../../dictionaries';
import { getPageSEO } from '@/lib/seo.config';
import { CTASection } from '@/components/organisms/CTASection';
import { ExecutiveHero } from '@/components/organisms/ExecutiveHero';
import { ExecutiveServicesGrid } from '@/components/organisms/ExecutiveServicesGrid';
import { ExecutiveProcess } from '@/components/organisms/ExecutiveProcess';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { getT, type Dict } from '@/lib/i18n-server';
import { VideoSection } from '@/components/organisms/VideoSection';
import { jotformUrls } from '@/data/images';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('solutions-business', lang);
  return metadata;
}

function buildBreadcrumb(dict: Dict, lang: string) {
  const t = getT(dict, 'solutions_business.breadcrumb');
  return [
    { label: t('home'), href: `/${lang}` },
    { label: 'Solutions for Businesses', href: `/${lang}/solutions/businesses` },
    { label: 'Executive Services' },
  ];
}

export default async function ExecutiveServicesPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('solutions-business', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const crumbs = buildBreadcrumb(dict, lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      <Breadcrumb items={crumbs} />
      <main>
        <ExecutiveHero dict={dict} />
        <ExecutiveServicesGrid dict={dict} />
        <VideoSection dict={dict} />
        <ExecutiveProcess dict={dict} />
        <CTASection dict={dict} lang={lang} bookLink={jotformUrls.businessExecutiveServicesJotformUrl} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


