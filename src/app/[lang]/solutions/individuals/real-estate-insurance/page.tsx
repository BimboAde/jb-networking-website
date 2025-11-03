import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { getDictionary, SupportedLocale } from '../../../dictionaries';
import { RealEstateHero } from '@/components/organisms/RealEstateHero';
import { DualServicesOverview } from '@/components/organisms/DualServicesOverview';
import { SpecializedServicesGrid } from '@/components/organisms/SpecializedServicesGrid';
import { RealEstateProcess } from '@/components/organisms/RealEstateProcess';
// import { InsuranceComparison } from '@/components/organisms/InsuranceComparison';
// import { RealEstateSuccessStories } from '@/components/organisms/RealEstateSuccessStories';
import { RealEstateFAQ } from '@/components/organisms/RealEstateFAQ';
import { CTASection } from '@/components/organisms/CTASection';
import { getT, type Dict } from '@/lib/i18n-server';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('solutions-real-estate', lang);
  return metadata;
}

function buildBreadcrumb(dict: Dict, lang: string) {
  const t = getT(dict, 'solutions_real_estate.breadcrumb');
  return [
    { label: t('home'), href: `/${lang}` },
    { label: t('individuals'), href: `/${lang}/solutions/individuals` },
    { label: t('current') },
  ];
}

export default async function RealEstateInsurancePage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('solutions-real-estate', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const crumbs = buildBreadcrumb(dict, lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      <Breadcrumb items={crumbs} />
      <main>
        <RealEstateHero dict={dict} />
        <DualServicesOverview dict={dict} />
        <SpecializedServicesGrid dict={dict} />
        <RealEstateProcess dict={dict} />
        {/* <InsuranceComparison dict={dict} /> */}
        {/* <RealEstateSuccessStories dict={dict} /> */}
        <RealEstateFAQ dict={dict} />
        <CTASection dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


