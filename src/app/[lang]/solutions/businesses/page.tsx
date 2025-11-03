import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { getDictionary, SupportedLocale } from '../../dictionaries';
import { BusinessHero } from '@/components/organisms/BusinessHero';
import { BusinessServicesGrid } from '@/components/organisms/BusinessServicesGrid';
import { BusinessProcess } from '@/components/organisms/BusinessProcess';
import { IndustrySpecializations } from '@/components/organisms/IndustrySpecializations';
import { BusinessSuccessStories } from '@/components/organisms/BusinessSuccessStories';
import { BusinessResources } from '@/components/organisms/BusinessResources';
import { CTASection } from '@/components/organisms/CTASection';
import { getT, type Dict } from '@/lib/i18n-server';

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
    { label: t('current') },
  ];
}

export default async function BusinessSolutionsPage({ params }: PageParams) {
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
        <BusinessHero dict={dict} />
        <BusinessServicesGrid dict={dict} />
        <BusinessProcess dict={dict} />
        <IndustrySpecializations dict={dict} />
        <BusinessSuccessStories dict={dict} />
        <BusinessResources dict={dict} />
        <CTASection dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


