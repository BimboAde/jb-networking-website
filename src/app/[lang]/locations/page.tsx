import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { getDictionary, SupportedLocale } from '../dictionaries';
import { getPageSEO } from '@/lib/seo.config';
import { LocationsHero } from '@/components/organisms/LocationsHero';
import { LocationsMap } from '@/components/organisms/LocationsMap';
import { OfficesGrid } from '@/components/organisms/OfficesGrid';
import { AdditionalLocations } from '@/components/organisms/AdditionalLocations';
import { ServiceAreas } from '@/components/organisms/ServiceAreas';
import { CTASection } from '@/components/organisms/CTASection';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('locations', lang);
  return metadata;
}



export default async function LocationsPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('locations', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      {/* <Breadcrumb items={crumbs} /> */}
      <main>
        <LocationsHero dict={dict} />
        {/* <LocationsMap dict={dict} /> */}
        <OfficesGrid dict={dict} />
        <AdditionalLocations dict={dict} />
        {/* <ServiceAreas dict={dict} /> */}
        <CTASection dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


