import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { getDictionary, SupportedLocale } from '../dictionaries';
import { getPageSEO } from '@/lib/seo.config';
import { AboutHero } from '@/components/organisms/AboutHero';
import { CompanyHistory } from '@/components/organisms/CompanyHistory';
// import { AboutTimeline } from '@/components/organisms/AboutTimeline';
import { MissionValues } from '@/components/organisms/MissionValues';
import { LeadershipTeam } from '@/components/organisms/LeadershipTeam';
import { CertificationsPartners } from '@/components/organisms/CertificationsPartners';
import { CommunityImpact } from '@/components/organisms/CommunityImpact';
import { AboutPersonalCTA } from '@/components/organisms/AboutPersonalCTA';

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { lang } = await params;
  const { metadata } = getPageSEO('about', lang);
  return metadata;
}

export default async function AboutPage({ params }: PageParams) {
  const { lang } = await params;
  const { jsonLd } = getPageSEO('about', lang);
  const dict = await getDictionary((lang as SupportedLocale) || 'en');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/<script[^>]*>|<\/script>/g, '') }} />
      <Header dict={dict} lang={lang} />
      <main>
        <AboutHero dict={dict} />
        <CompanyHistory dict={dict} />
        {/* <AboutTimeline dict={dict} /> */}
        <MissionValues dict={dict} />
        <LeadershipTeam dict={dict} />
        <CertificationsPartners dict={dict} />
        <CommunityImpact dict={dict} />
        <AboutPersonalCTA dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}


