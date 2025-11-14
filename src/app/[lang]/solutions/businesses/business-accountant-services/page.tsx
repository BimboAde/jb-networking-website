import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { getDictionary, SupportedLocale } from '../../../dictionaries';
import { getT, type Dict } from '@/lib/i18n-server';
import { BusinessTaxHero } from '@/components/organisms/BusinessTaxHero';
import { BusinessServiceOverview } from '@/components/organisms/BusinessServiceOverview';
import { BusinessDetailedServices } from '@/components/organisms/BusinessDetailedServices';
// import { BusinessPricingPlans } from '@/components/organisms/BusinessPricingPlans';
import { IndustryExpertise } from '@/components/organisms/IndustryExpertise';
// import { BusinessProcessTimeline } from '@/components/organisms/BusinessProcessTimeline';
import { BusinessTaxFAQ } from '@/components/organisms/BusinessTaxFAQ';
import { CTASection } from '@/components/organisms/CTASection';
import { getWebsiteInfoServer } from '@/lib/website-info-server';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('solutions-business-tax', lang);
  return metadata;
}

function buildBreadcrumb(dict: Dict, lang: string) {
  const t = getT(dict, 'solutions_business_tax.breadcrumb');
  return [
    { label: t('home'), href: `/${lang}` },
    { label: t('business'), href: `/${lang}/solutions/businesses` },
    { label: t('current') },
  ];
}

export default async function BusinessTaxPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('solutions-business-tax', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const crumbs = buildBreadcrumb(dict, lang);
  const websiteInfo = await getWebsiteInfoServer();
  const bookLink =
    websiteInfo?.service_booking_links?.find((b) =>
      /business\s*accounting|business\s*tax/i.test(b.service || '')
    )?.url || undefined;
  const phoneNumber = websiteInfo?.main_phone|| null;
  // const ctaT = getT(dict, 'solutions_business_tax.cta');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      <Breadcrumb items={crumbs} />
      <main>
        <BusinessTaxHero dict={dict} bookLink={bookLink} phoneNumber={phoneNumber || undefined} />
        <BusinessServiceOverview dict={dict} />
        <BusinessDetailedServices dict={dict} />
        {/* <BusinessPricingPlans dict={dict} /> */}
        <IndustryExpertise dict={dict} />
        {/* <BusinessProcessTimeline dict={dict} /> */}
        <BusinessTaxFAQ dict={dict} />
        <CTASection dict={dict} lang={lang} bookLink={bookLink} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


