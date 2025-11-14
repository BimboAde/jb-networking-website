import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { FaPhone } from 'react-icons/fa';
import Image from 'next/image';
import { images } from '@/data/images';
import { getImageByLocation } from '@/lib/media';

export const ExecutiveHero = async ({ dict, bookLink, phoneNumber }: { dict: Dict; bookLink: string | undefined; phoneNumber?: string }) => {
  const t = getT(dict, 'solutions_executive.hero');
  const hero = await getImageByLocation('executive-services', 'hero');
  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white pt-24 lg:pt-0 pb-12 lg:pb-16 min-h-[520px] lg:h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Heading level={1} className="leading-tight text-white mt-12">
              {t('title')} 
              {/* <span className="text-brand-gold">{t('highlight')}</span> */}
            </Heading>
            <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                className="px-8 py-3 font-semibold"
                href={bookLink || ''}
              >
                {t("ctaStart")}
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 font-semibold"
                href={`tel:${phoneNumber}`}
              >
                <FaPhone className="mr-2" />
                {t("ctaGuide")}
              </Button>
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={hero?.image_url || images.solutions.corporate.heroImage.src}
              alt={hero?.image_alt || 'Executive Services Hero'}
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


