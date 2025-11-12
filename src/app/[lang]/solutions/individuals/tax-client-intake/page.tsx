import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { TaxServiceHero } from '@/components/organisms/TaxServiceHero';
import { TaxServicesGrid } from '@/components/organisms/TaxServicesGrid';
import { TaxProcess } from '@/components/organisms/TaxProcess';
// import { TaxPricing } from '@/components/organisms/TaxPricing';
// import { TaxChecklist } from '@/components/organisms/TaxChecklist';
import { TaxTips } from '@/components/organisms/TaxTips';
// import { TaxTestimonials } from '@/components/organisms/TaxTestimonials';
import { CTASection } from '@/components/organisms/CTASection';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { getDictionary, SupportedLocale } from '../../../dictionaries';
import { FullWidthBanner } from '@/components/organisms/FullWidthBanner';
import { images, jotformUrls } from '@/data/images';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('solutions-tax-accounting', lang);
  return metadata;
}

export default async function TaxAccountingPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('solutions-tax-accounting', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');

  const crumbs = [
    { label: 'Home', href: `/${lang}` },
    { label: 'Solutions for Individuals', href: `/${lang}/solutions/individuals` },
    { label: 'Personal Tax & Accounting' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }}
      />
      <Header dict={dict} lang={lang} />
      <Breadcrumb items={crumbs} />
      <main>
        <TaxServiceHero dict={dict} />
        <TaxServicesGrid dict={dict} />
        <FullWidthBanner
          src={images.solutions.taxServices.fullWidthBannerImage.src}
          alt={images.solutions.taxServices.fullWidthBannerImage.alt}
        />
        <TaxProcess dict={dict} />
        {/* <TaxPricing dict={dict} /> */}
        {/* <TaxChecklist dict={dict} /> */}
          <TaxTips dict={dict} lang={lang} />
          {/* <TaxTestimonials dict={dict} />  */}
        <CTASection dict={dict} lang={lang} bookLink={jotformUrls.individualTaxJotformUrl} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


