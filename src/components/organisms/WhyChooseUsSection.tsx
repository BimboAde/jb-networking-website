import { getT, type Dict } from '@/lib/i18n-server';
import { MotionDiv } from '../atoms/Motion';
import { Shield, Languages, Medal, DollarSign } from 'lucide-react';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { fadeInUp, slideInLeft, slideInRight } from '@/lib/animations';
import Link from 'next/link';

export const WhyChooseUsSection = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'whyChooseUs');

  const features = [
    {
      icon: Shield,
      iconBg: 'bg-brand-green',
      titleKey: 'features.trustedSince2007.title',
      descriptionKey: 'features.trustedSince2007.description',
    },
    {
      icon: Languages,
      iconBg: 'bg-brand-green',
      titleKey: 'features.bilingualServices.title',
      descriptionKey: 'features.bilingualServices.description',
    },
    {
      icon: Medal,
      iconBg: 'bg-brand-gold',
      titleKey: 'features.militaryDiscounts.title',
      descriptionKey: 'features.militaryDiscounts.description',
    },
    {
      icon: DollarSign,
      iconBg: 'bg-brand-navy',
      titleKey: 'features.moneyBackGuarantee.title',
      descriptionKey: 'features.moneyBackGuarantee.description',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <MotionDiv
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <Heading level={2} className="mb-6 text-brand-green">
              {t('title')}
            </Heading>
            <p className="text-xl text-gray-600 mb-8">{t('description')}</p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <MotionDiv
                  key={index}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex items-start space-x-4"
                >
                  <div
                    className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <feature.icon className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-brand-green mb-2">
                      {t(feature.titleKey)}
                    </h4>
                    <p className="text-gray-600">{t(feature.descriptionKey)}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={slideInRight}
            className="space-y-8"
          >
            <div className="bg-brand-gray rounded-2xl p-8">
              <Heading level={3} className="mb-6 text-brand-green">
                {t('commitment.title')}
              </Heading>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-green mb-2">24/7</div>
                  <div className="text-sm text-gray-600">
                    {t('commitment.stats.supportAvailable')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-green mb-2">100%</div>
                  <div className="text-sm text-gray-600">
                    {t('commitment.stats.confidentialService')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-green mb-2">50</div>
                  <div className="text-sm text-gray-600">
                    {t('commitment.stats.stateCoverage')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-green mb-2">50+</div>
                  <div className="text-sm text-gray-600">
                    {t('commitment.stats.solutionsAvailable')}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-brand-green to-brand-light-green rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">{t('cta.title')}</h4>
              <p className="mb-6">{t('cta.description')}</p>
              <Button variant="secondary" className="bg-white text-brand-green hover:bg-gray-50">
              <Link href="/en/consultation"> {t('cta.button')}</Link>
              </Button>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

