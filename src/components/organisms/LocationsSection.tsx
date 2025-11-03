import { getT, type Dict } from '@/lib/i18n-server';
import { MotionDiv } from '../atoms/Motion';
// import { Map } from 'lucide-react';
import { Heading } from '../atoms/Heading';
import { LocationCard } from '../molecules/LocationCard';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export const LocationsSection = ({ dict, consultationHref }: { dict: Dict; consultationHref?: string }) => {
  const t = getT(dict, 'locations');
  const tCommon = getT(dict, 'common');

  const locations = [
    {
      title: t('georgia.title'),
      area: t('georgia.area'),
      address: t('georgia.address'),
      phone: t('georgia.phone'),
      email: t('georgia.email'),
    },
    {
      title: t('alabama.title'),
      area: t('alabama.area'),
      address: t('alabama.address'),
      phone: t('alabama.phone'),
      email: t('alabama.email'),
    },
    {
      title: t('texas.title'),
      area: t('texas.area'),
      address: t('texas.address'),
      phone: t('texas.phone'),
      email: t('texas.email'),
    },
  ];

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <Heading level={2} className="mb-4">
            {t('title')}
          </Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </MotionDiv>

        <MotionDiv
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {locations.map((location, index) => (
            <MotionDiv key={index} variants={fadeInUp}>
              <LocationCard
                {...location}
                getDirectionsLabel={tCommon('getDirections')}
                requestMeetingLabel={tCommon('requestMeeting')}
                requestMeetingHref={consultationHref}
              />
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* <MotionDiv
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <Heading level={3} className="mb-4 text-brand-green">
              {t('map.title')}
            </Heading>
            <p className="text-gray-600">{t('map.description')}</p>
          </div>

          <div className="bg-brand-gray h-96 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Map className="text-brand-green w-16 h-16 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-brand-green mb-2">
                {t('map.placeholder')}
              </h4>
              <p className="text-gray-600">{t('map.placeholderDescription')}</p>
            </div>
          </div>
        </MotionDiv> */}
      </div>
    </section>
  );
};

