import { getT, type Dict } from '@/lib/i18n-server';
import { MotionDiv } from '../atoms/Motion';
import { CalendarPlus, Phone, Languages, Medal } from 'lucide-react';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { fadeInUp } from '@/lib/animations';
import { COMPANY } from '@/data/constants';

export const CTASection = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'cta');

  const features = [
    {
      icon: CalendarPlus,
      titleKey: 'features.freeConsultation.title',
      descriptionKey: 'features.freeConsultation.description',
    },
    {
      icon: Languages,
      titleKey: 'features.personalTouch.title',
      descriptionKey: 'features.personalTouch.description',
    },
    {
      icon: Medal,
      titleKey: 'features.guaranteedResults.title',
      descriptionKey: 'features.guaranteedResults.description',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-brand-green to-brand-light-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <MotionDiv
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <Heading level={2} className="mb-6 text-white">
            {t('title')}
          </Heading>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">{t('description')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <MotionDiv
                key={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey)}</h3>
                <p className="text-green-100">{t(feature.descriptionKey)}</p>
              </MotionDiv>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="secondary"
              className="px-8 py-4 text-lg font-semibold"
              icon={<CalendarPlus className="w-5 h-5" />}
            >
              {t('buttons.bookConsultation')}
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 text-lg font-semibold"
              icon={<Phone className="w-5 h-5" />}
            >
              {`Call ${COMPANY.contact.phone}`}
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-green-100">
              <Languages className="inline mr-2 w-5 h-5" />
              {t('badges.hablamosEspanol')} |{' '}
              <Medal className="inline ml-4 mr-2 w-5 h-5" />
              {t('badges.militaryDiscounts')}
            </p>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

