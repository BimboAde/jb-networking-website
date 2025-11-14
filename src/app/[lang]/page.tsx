import { getPageSEO } from '@/lib/seo.config';
import { Header } from '@/components/organisms/Header';
import { HeroSection } from '@/components/organisms/HeroSection';
import { VideoSection } from '@/components/organisms/VideoSection';
import { ServicesOverview } from '@/components/organisms/ServicesOverview';
import { WhyChooseUsSection } from '@/components/organisms/WhyChooseUsSection';
import { LocationsSection } from '@/components/organisms/LocationsSection';
import { TestimonialsSection } from '@/components/organisms/TestimonialsSection';
import { CTASection } from '@/components/organisms/CTASection';
import { Footer } from '@/components/organisms/Footer';
import { getDictionary, SupportedLocale } from './dictionaries';
// import { YouTubeTeaser } from '@/components/organisms/YouTubeTeaser';
import { getWebsiteInfoServer } from '@/lib/website-info-server';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('home', lang);
  return metadata;
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export default async function HomePage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('home', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');
  const websiteInfo = await getWebsiteInfoServer();
  const generalBooking =
    websiteInfo?.service_booking_links?.find((s) => /general/i.test(s.service))?.url || null;
const phoneNumber = websiteInfo?.main_phone|| null;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, ''),
        }}
      />
      <Header dict={dict} lang={lang} />
      <main>
        <HeroSection dict={dict} lang={lang} bookLink={generalBooking || undefined} phoneNumber={phoneNumber || undefined} />
        <VideoSection dict={dict} />
        {/* <YouTubeTeaser dict={dict} /> */}
        <ServicesOverview dict={dict} lang={lang} />
        <WhyChooseUsSection dict={dict} bookLink={generalBooking || undefined} />
        <LocationsSection dict={dict} consultationHref={generalBooking || `/${lang}/consultation`} />
        <TestimonialsSection dict={dict} />
        <CTASection dict={dict} lang={lang} bookLink={generalBooking || `/${lang}/consultation`} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}

