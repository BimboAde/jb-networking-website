import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { getDictionary, SupportedLocale } from '../../../dictionaries';
import { getT, type Dict } from '@/lib/i18n-server';
import { BusinessCreditHero } from '@/components/organisms/BusinessCreditHero';
import { BusinessCreditServices } from '@/components/organisms/BusinessCreditServices';
import { BusinessCreditProcess } from '@/components/organisms/BusinessCreditProcess';
import { BusinessCreditBenefits } from '@/components/organisms/BusinessCreditBenefits';
// import { BusinessCreditSuccessStories } from '@/components/organisms/BusinessCreditSuccessStories';
import { BusinessCreditFAQ } from '@/components/organisms/BusinessCreditFAQ';
import { BusinessCreditPricing } from '@/components/organisms/BusinessCreditPricing';
import { CTASection } from '@/components/organisms/CTASection';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('solutions-business-credit', lang);
  return metadata;
}

function buildBreadcrumb(dict: Dict, lang: string) {
  const t = getT(dict, 'solutions_business_credit.breadcrumb');
  return [
    { label: t('home'), href: `/${lang}` },
    { label: t('business'), href: `/${lang}/solutions/businesses` },
    { label: t('current') },
  ];
}

export default async function BusinessCreditBuildingPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('solutions-business-credit', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const crumbs = buildBreadcrumb(dict, lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      <Breadcrumb items={crumbs} />
      <main>
        <BusinessCreditHero dict={dict} />
        <BusinessCreditServices dict={dict} />
        <BusinessCreditProcess dict={dict} />
        <BusinessCreditBenefits dict={dict} />
        {/* <BusinessCreditSuccessStories dict={dict} /> */}
        <BusinessCreditFAQ dict={dict} />
        <BusinessCreditPricing dict={dict} />
        <CTASection dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


