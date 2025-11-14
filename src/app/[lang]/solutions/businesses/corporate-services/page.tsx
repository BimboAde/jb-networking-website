import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { getDictionary, SupportedLocale } from '../../../dictionaries';
import { getT, type Dict } from '@/lib/i18n-server';
import { CorporateHero } from '@/components/organisms/CorporateHero';
import { FormationServicesGrid } from '@/components/organisms/FormationServicesGrid';
import { ComplianceServices } from '@/components/organisms/ComplianceServices';
import { CorporateProcessTimeline } from '@/components/organisms/CorporateProcessTimeline';
import { StateRequirements } from '@/components/organisms/StateRequirements';
import { CorporateFAQ } from '@/components/organisms/CorporateFAQ';
import { CorporateSuccessStories } from '@/components/organisms/CorporateSuccessStories';
import { CTASection } from '@/components/organisms/CTASection';
import { getWebsiteInfoServer } from '@/lib/website-info-server';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('solutions-corporate', lang);
  return metadata;
}

function buildBreadcrumb(dict: Dict, lang: string) {
  const t = getT(dict, 'solutions_corporate.breadcrumb');
  return [
    { label: t('home'), href: `/${lang}` },
    { label: t('business'), href: `/${lang}/solutions/businesses` },
    { label: t('current') },
  ];
}

export default async function CorporateServicesPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('solutions-corporate', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const crumbs = buildBreadcrumb(dict, lang);
  const websiteInfo = await getWebsiteInfoServer();
  const bookLink =
    websiteInfo?.service_booking_links?.find((b) =>
      /corporate\s*services/i.test(b.service || '')
    )?.url || undefined;
  const phoneNumber = websiteInfo?.main_phone|| null;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      <Breadcrumb items={crumbs} />
      <main>
        <CorporateHero dict={dict} bookLink={bookLink} phoneNumber={phoneNumber || undefined} />
        <FormationServicesGrid dict={dict} bookingLink={bookLink} />
        <ComplianceServices dict={dict} bookingLink={bookLink} />
        <CorporateProcessTimeline dict={dict} />
        {/* <StateRequirements dict={dict} /> */}
        {/* <CorporateSuccessStories dict={dict} /> */}
        <CorporateFAQ dict={dict} bookingLink={bookLink} />
        <CTASection dict={dict} lang={lang} bookLink={bookLink} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


