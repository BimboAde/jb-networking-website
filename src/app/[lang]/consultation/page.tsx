import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { getDictionary, SupportedLocale } from '../dictionaries';
import { getT } from '@/lib/i18n-server';
import { ConsultationHero } from '@/components/organisms/ConsultationHero';
import { ConsultationBenefits } from '@/components/organisms/ConsultationBenefits';
import { ConsultationForm } from '@/components/organisms/ConsultationForm';
import { ConsultationSidebar } from '@/components/organisms/ConsultationSidebar';
import { ConsultationOfficeLocations } from '@/components/organisms/ConsultationOfficeLocations';
import { ConsultationServicesPreview } from '@/components/organisms/ConsultationServicesPreview';
// import { TestimonialsSection } from '@/components/organisms/TestimonialsSection';
import { CTASection } from '@/components/organisms/CTASection';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('consultation', lang);
  return metadata;
}

export default async function ConsultationPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('consultation', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const t = getT(dict, 'consultation.form');

  const formStrings = {
    title: t('title'),
    description: t('description'),
    firstName: t('firstName'),
    lastName: t('lastName'),
    email: t('email'),
    phone: t('phone'),
    preferredLocation: t('preferredLocation'),
    preferredLanguage: t('preferredLanguage'),
    servicesOfInterest: t('servicesOfInterest'),
    preferredDate: t('preferredDate'),
    preferredTime: t('preferredTime'),
    about: t('about'),
    military: t('military'),
    marketingConsent: t('marketingConsent'),
    freeConsent: t('freeConsent'),
    submit: t('submit'),
    success: t('success'),
    requiredError: t('requiredError'),
    serverError: t('serverError'),
  };

  const options = {
    locations: [0, 1, 2, 3].map((i) => t(`locations.${i}`)),
    languages: [0, 1, 2].map((i) => t(`languages.${i}`)),
    timeSlots: [0, 1, 2, 3, 4].map((i) => t(`timeSlots.${i}`)),
    services: [0, 1, 2, 3, 4, 5].map((i) => t(`services.${i}`)),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }}
      />
      <Header dict={dict} lang={lang} />
      <main>
        <ConsultationHero dict={dict} />
        <ConsultationBenefits dict={dict} />
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <ConsultationForm strings={formStrings} options={options} />
              <ConsultationSidebar dict={dict} />
            </div>
          </div>
        </section>
        <ConsultationOfficeLocations dict={dict} />
        <ConsultationServicesPreview dict={dict} />
        {/* <TestimonialsSection dict={dict} /> */}
        <CTASection dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


