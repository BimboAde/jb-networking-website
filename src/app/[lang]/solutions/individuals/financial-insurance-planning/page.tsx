import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { getDictionary, SupportedLocale } from '../../../dictionaries';
import { FinancialHero } from '@/components/organisms/FinancialHero';
import { InvestmentServicesGrid } from '@/components/organisms/InvestmentServicesGrid';
import { InvestmentPhilosophy } from '@/components/organisms/InvestmentPhilosophy';
import { OurProcess } from '@/components/organisms/OurProcess';
import { PerformanceDashboard } from '@/components/organisms/PerformanceDashboard';
import { RetirementCalculator } from '@/components/organisms/RetirementCalculator';
import { InvestmentOptions } from '@/components/organisms/InvestmentOptions';
import { CTASection } from '@/components/organisms/CTASection';
import { getT, type Dict } from '@/lib/i18n-server';
import { FullWidthBanner } from '@/components/organisms/FullWidthBanner';
import { images, jotformUrls } from '@/data/images';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('solutions-financial', lang);
  return metadata;
}

function buildBreadcrumb(dict: Dict, lang: string) {
  const t = getT(dict, 'solutions_financial.breadcrumb');
  return [
    { label: t('home'), href: `/${lang}` },
    { label: t('individuals'), href: `/${lang}/solutions/individuals` },
    { label: t('current') },
  ];
}

export default async function FinancialPlanningPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('solutions-financial', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const crumbs = buildBreadcrumb(dict, lang);
  const tCalc = getT(dict, 'solutions_financial.calculator');
  const calculatorStrings = {
    title: tCalc('title'),
    description: tCalc('description'),
    inputsTitle: tCalc('inputsTitle'),
    resultsTitle: tCalc('resultsTitle'),
    currentAge: tCalc('currentAge'),
    retirementAge: tCalc('retirementAge'),
    currentSavings: tCalc('currentSavings'),
    monthlyContribution: tCalc('monthlyContribution'),
    annualReturn: tCalc('annualReturn'),
    projectedSavings: tCalc('projectedSavings'),
    yearsToRetirement: tCalc('yearsToRetirement'),
    totalContributions: tCalc('totalContributions'),
    monthlyIncomeTitle: tCalc('monthlyIncomeTitle'),
    withdrawalRule: tCalc('withdrawalRule'),
    breakdownTitle: tCalc('breakdownTitle'),
    principal: tCalc('principal'),
    growth: tCalc('growth'),
    ctaSchedule: tCalc('ctaSchedule'),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      <Breadcrumb items={crumbs} />
      <main>
        <FinancialHero dict={dict} />
        <InvestmentServicesGrid dict={dict} />
        <FullWidthBanner
          src={images.solutions.financialPlanning.fullWidthBannerImage.src}
          alt={images.solutions.financialPlanning.fullWidthBannerImage.alt}
        />
        <InvestmentPhilosophy dict={dict} />
        <OurProcess dict={dict} />
        {/* <PerformanceDashboard dict={dict} /> */}
        {/* <RetirementCalculator strings={calculatorStrings} /> */}
        {/* <InvestmentOptions dict={dict} /> */}
        <CTASection dict={dict} lang={lang} bookLink={jotformUrls.financialPlanningJotformUrl} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


