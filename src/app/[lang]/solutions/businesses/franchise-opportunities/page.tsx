import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { getDictionary, SupportedLocale } from '../../../dictionaries';
import { getT, type Dict } from '@/lib/i18n-server';
import { FranchiseHero } from '@/components/organisms/FranchiseHero';
import { FranchiseOverview } from '@/components/organisms/FranchiseOverview';
import { TrainingSupport } from '@/components/organisms/TrainingSupport';
import { FranchiseSuccessStories } from '@/components/organisms/FranchiseSuccessStories';
import { TerritoryRequirements } from '@/components/organisms/TerritoryRequirements';
import { FranchiseFAQ } from '@/components/organisms/FranchiseFAQ';
import { NextStepsFranchiseCTA } from '@/components/organisms/NextStepsFranchiseCTA';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('solutions-franchise', lang);
  return metadata;
}

function buildBreadcrumb(dict: Dict, lang: string) {
  const t = getT(dict, 'solutions_franchise.breadcrumb');
  return [
    { label: t('home'), href: `/${lang}` },
    { label: t('business'), href: `/${lang}/solutions/businesses` },
    { label: t('current') },
  ];
}

export default async function FranchiseOpportunitiesPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('solutions-franchise', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const crumbs = buildBreadcrumb(dict, lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      <Breadcrumb items={crumbs} />
      <main>
        <FranchiseHero dict={dict} />
        <FranchiseOverview dict={dict} />
        <TrainingSupport dict={dict} />
        <FranchiseSuccessStories dict={dict} />
        <TerritoryRequirements dict={dict} />
        <FranchiseFAQ dict={dict} />
        <NextStepsFranchiseCTA dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


