import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { IndividualHero } from '@/components/organisms/IndividualHero';
import { ServicePillars } from '@/components/organisms/ServicePillars';
import { OurProcess } from '@/components/organisms/OurProcess';
import { IndividualGuarantees } from '@/components/organisms/IndividualGuarantees';
// import { SuccessStories } from '@/components/organisms/SuccessStories';
import { PricingPackages } from '@/components/organisms/PricingPackages';
import { getDictionary, SupportedLocale } from '../../dictionaries';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('solutions-individual', lang);
  return metadata;
}

export default async function IndividualsPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('solutions-individual', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }}
      />
      <Header dict={dict} lang={lang} />
      <main>
        <IndividualHero dict={dict} />
        <ServicePillars dict={dict} />
        <OurProcess dict={dict} />
        <IndividualGuarantees dict={dict} />
        {/* <SuccessStories dict={dict} /> */}
        <PricingPackages dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


