import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import Link from 'next/link';
import Image from 'next/image';
import { images } from '@/data/images';
import { getImageByLocation } from '@/lib/media';

export const RealEstateHero = async ({ dict, bookLink, phoneNumber }: { dict: Dict; bookLink: string | undefined; phoneNumber?: string }) => {
  const t = getT(dict, 'solutions_real_estate.hero');
  const tc = getT(dict, 'solutions_real_estate.common');
  const hero = await getImageByLocation('real-estate-mortgage', 'hero');

  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white pt-12 lg:pt-8 pb-16 lg:pb-0 lg:h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Heading level={1} className="leading-tight text-white">
                {t('title')} 
                {/* <span className="text-brand-gold block">{t('highlight')}</span> */}
              </Heading>
              <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-3 text-lg font-semibold"> <Link href={bookLink || ''} target="_blank">{tc('ctaConsultation')}</Link></Button>
              {/* <Button variant="outline" className="px-8 py-3 text-lg font-semibold" href={`tel:${COMPANY.contact.phone}`}>{tc('ctaCall')}</Button> */}
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={hero?.image_url || images.solutions.realEstate.heroImage.src}
              alt={hero?.image_alt || images.solutions.realEstate.heroImage.alt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};


