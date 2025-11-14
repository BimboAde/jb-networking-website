import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ComplianceCard } from '../molecules/ComplianceCard';
import { FaFileAlt, FaBook, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import { images } from '@/data/images';

export const ComplianceServices = ({ dict, bookingLink }: { dict: Dict, bookingLink: string | undefined }) => {
  const t = getT(dict, 'solutions_corporate.compliance');
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Heading level={3} className="text-brand-green mb-6">{t('left.title')}</Heading>
            <p className="text-lg text-gray-600 mb-8">{t('left.text')}</p>
            <div className="space-y-6">
              {[0,1,2].map((i) => {
                const Icon = [FaFileAlt, FaBook, FaSearch][i] || FaFileAlt;
                return (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-green rounded-lg flex-shrink-0 text-white flex items-center justify-center">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-brand-green mb-2">{t(`left.items.${i}.title`)}</h4>
                      <p className="text-gray-600">{t(`left.items.${i}.text`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={images.solutions.corporate.fullWidthBannerImage.src}
                alt={images.solutions.corporate.fullWidthBannerImage.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ComplianceCard dict={dict} titleKey={'solutions_corporate.compliance.tiles.0.title'} textKey={'solutions_corporate.compliance.tiles.0.text'} price={t('tiles.0.price')} period={t('tiles.0.period')} ctaKey={'common.contactUs'} bookingLink={bookingLink} />
          <ComplianceCard dict={dict} titleKey={'solutions_corporate.compliance.tiles.1.title'} textKey={'solutions_corporate.compliance.tiles.1.text'} price={t('tiles.1.price')} period={t('tiles.1.period')} ctaKey={'common.contactUs'} bookingLink={bookingLink} />
          <ComplianceCard dict={dict} titleKey={'solutions_corporate.compliance.tiles.2.title'} textKey={'solutions_corporate.compliance.tiles.2.text'} price={t('tiles.2.price')} period={t('tiles.2.period')} ctaKey={'common.contactUs'} bookingLink={bookingLink} />
          <ComplianceCard dict={dict} titleKey={'solutions_corporate.compliance.tiles.3.title'} textKey={'solutions_corporate.compliance.tiles.3.text'} price={t('tiles.3.price')} period={t('tiles.3.period')} ctaKey={'common.contactUs'} bookingLink={bookingLink} />
        </div>
      </div>
    </section>
  );
};


