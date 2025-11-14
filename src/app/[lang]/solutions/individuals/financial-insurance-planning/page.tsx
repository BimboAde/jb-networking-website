import { getPageSEO } from "@/lib/seo.config";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { getDictionary, SupportedLocale } from "../../../dictionaries";
import { FinancialHero } from "@/components/organisms/FinancialHero";
import { InvestmentServicesGrid } from "@/components/organisms/InvestmentServicesGrid";
import { InvestmentPhilosophy } from "@/components/organisms/InvestmentPhilosophy";
import { OurProcess } from "@/components/organisms/OurProcess";
// import { PerformanceDashboard } from '@/components/organisms/PerformanceDashboard';
// import { RetirementCalculator } from '@/components/organisms/RetirementCalculator';
// import { InvestmentOptions } from '@/components/organisms/InvestmentOptions';
import { CTASection } from "@/components/organisms/CTASection";
import { getT, type Dict } from "@/lib/i18n-server";
import { FullWidthBanner } from "@/components/organisms/FullWidthBanner";
import { images } from "@/data/images";
import { getImageByLocation } from "@/lib/media";
import { getWebsiteInfoServer } from "@/lib/website-info-server";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO("solutions-financial", lang);
  return metadata;
}

function buildBreadcrumb(dict: Dict, lang: string) {
  const t = getT(dict, "solutions_financial.breadcrumb");
  return [
    { label: t("home"), href: `/${lang}` },
    { label: t("individuals"), href: `/${lang}/solutions/individuals` },
    { label: t("current") },
  ];
}

export default async function FinancialPlanningPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO("solutions-financial", lang);
  const dict = await getDictionary((lang as SupportedLocale) || "en");
  const crumbs = buildBreadcrumb(dict, lang);
  const banner = await getImageByLocation(
    "financial-insurance-planning",
    "fullwidth"
  );
  const websiteInfo = await getWebsiteInfoServer();
  const bookLink =
    websiteInfo?.service_booking_links?.find((b) =>
      /financial\s*planning/i.test(b.service || "")
    )?.url || undefined;
  const insuranceLink =
    websiteInfo?.service_booking_links?.find((b) =>
      /^insurance\s*services$/i.test(b.service || "")
    )?.url || undefined;
  const phoneNumber = websiteInfo?.main_phone || null;
  const tIns = getT(dict, "solutions_financial.insurance_partner");

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
        <FinancialHero
          dict={dict}
          bookLink={bookLink}
          phoneNumber={phoneNumber || undefined}
        />
        <InvestmentServicesGrid dict={dict} />
        <FullWidthBanner
          src={
            banner?.image_url ||
            images.solutions.financialPlanning.fullWidthBannerImage.src
          }
          alt={
            banner?.image_alt ||
            images.solutions.financialPlanning.fullWidthBannerImage.alt
          }
        />
        <InvestmentPhilosophy dict={dict} />

        {/* Insurance Services */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Heading level={2} className="mb-4 text-brand-green">
                {tIns("title")}
              </Heading>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {tIns("description")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-brand-green mb-4">
                  {tIns("servicesTitle")}
                </h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <li key={i}>{tIns(`servicesList.${i}`)}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-green mb-4">
                  {tIns("planningTitle")}
                </h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  {[0, 1].map((i) => (
                    <li key={i}>{tIns(`planningList.${i}`)}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-brand-navy rounded-xl mt-6 p-6 text-white text-center flex flex-col items-center justify-center">
              {/* <h4 className="text-lg font-bold mb-3">{t("involved.title")}</h4>
          <p className="text-blue-100 mb-4">{t("involved.text")}</p> */}
              <Button
                variant="secondary"
                className="bg-white text-brand-green px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                href={insuranceLink || `/${lang}/consultation`}
              >
                {tIns("cta")}
              </Button>
            </div>
          </div>
        </section>

        <OurProcess dict={dict} />
        {/* <PerformanceDashboard dict={dict} /> */}
        {/* <RetirementCalculator strings={calculatorStrings} /> */}
        {/* <InvestmentOptions dict={dict} /> */}
        <CTASection dict={dict} lang={lang} bookLink={bookLink} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
