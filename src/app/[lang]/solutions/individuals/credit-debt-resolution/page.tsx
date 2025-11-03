import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { CreditHero } from '@/components/organisms/CreditHero';
import { GuaranteeDetails } from '@/components/organisms/GuaranteeDetails';
import { CreditServicesGrid } from '@/components/organisms/CreditServicesGrid';
import { CreditProcess } from '@/components/organisms/CreditProcess';
import { CreditPricing } from '@/components/organisms/CreditPricing';
import { CreditSuccessStories } from '@/components/organisms/CreditSuccessStories';
import { CreditFAQ } from '@/components/organisms/CreditFAQ';
import { CTASection } from '@/components/organisms/CTASection';
import { getDictionary, SupportedLocale } from '../../../dictionaries';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('solutions-credit-debt', lang);
  return metadata;
}

export default async function CreditDebtPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('solutions-credit-debt', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const crumbs = [
    { label: 'Home', href: `/${lang}` },
    { label: 'Solutions for Individuals', href: `/${lang}/solutions/individuals` },
    { label: 'Credit & Debt Resolution' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      <Breadcrumb items={crumbs} />
      <main>
        <CreditHero dict={dict} />
        <GuaranteeDetails dict={dict} />
        <CreditServicesGrid dict={dict} />
        <CreditProcess dict={dict} />
        {/* <CreditPricing dict={dict} /> */}
        {/* <CreditSuccessStories dict={dict} /> */}
        <CreditFAQ dict={dict} />
        <CTASection dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


