import { getPageSEO } from "@/lib/seo.config";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { TaxServiceHero } from "@/components/organisms/TaxServiceHero";
import { TaxServicesGrid } from "@/components/organisms/TaxServicesGrid";
import { TaxProcess } from "@/components/organisms/TaxProcess";
// import { TaxPricing } from '@/components/organisms/TaxPricing';
// import { TaxChecklist } from '@/components/organisms/TaxChecklist';
import { TaxTips } from "@/components/organisms/TaxTips";
// import { TaxTestimonials } from '@/components/organisms/TaxTestimonials';
import { CTASection } from "@/components/organisms/CTASection";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { getDictionary, SupportedLocale } from "../../../dictionaries";
import { FullWidthBanner } from "@/components/organisms/FullWidthBanner";
import { images } from "@/data/images";
import { getImageByLocation } from "@/lib/media";
import { getWebsiteInfoServer } from "@/lib/website-info-server";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO("solutions-tax-accounting", lang);
  return metadata;
}

export default async function TaxAccountingPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO("solutions-tax-accounting", lang);
  const dict = await getDictionary((lang as SupportedLocale) || "en");
  const banner = await getImageByLocation("tax-client-intake", "fullwidth");
  const websiteInfo = await getWebsiteInfoServer();
  const bookLink =
    websiteInfo?.service_booking_links?.find((b) =>
      /personal\s*tax|client\s*intake/i.test(b.service || "")
    )?.url || undefined;
  const phoneNumber = websiteInfo?.main_phone|| null;
  const crumbs = [
    { label: "Home", href: `/${lang}` },
    {
      label: "Solutions for Individuals",
      href: `/${lang}/solutions/individuals`,
    },
    { label: "Personal Tax & Accounting" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, ""),
        }}
      />
      <Header dict={dict} lang={lang} />
      <Breadcrumb items={crumbs} />
      <main>
        <TaxServiceHero dict={dict} bookLink={bookLink} phoneNumber={phoneNumber || undefined} />
        <TaxServicesGrid dict={dict} />
        {banner && (
          <FullWidthBanner
            src={banner?.image_url || images.solutions.taxServices.fullWidthBannerImage.src}
            alt={banner?.image_alt || images.solutions.taxServices.fullWidthBannerImage.alt}
          />
        )}
        <TaxProcess dict={dict} />
        {/* <TaxPricing dict={dict} /> */}
        {/* <TaxChecklist dict={dict} /> */}
        <TaxTips dict={dict} lang={lang} />
        {/* <TaxTestimonials dict={dict} />  */}
        <CTASection dict={dict} lang={lang} bookLink={bookLink} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
