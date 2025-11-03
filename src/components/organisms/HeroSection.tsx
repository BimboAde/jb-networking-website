import { getT, type Dict } from '@/lib/i18n-server';
import { MotionDiv } from '../atoms/Motion';
import { CalendarCheck, Phone } from 'lucide-react';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import Image from 'next/image';
import { images } from '@/data/images';

export const HeroSection = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'hero');
  const tCommon = getT(dict, 'common');

  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <MotionDiv
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-8"
          >
            <MotionDiv variants={fadeInUp} className="space-y-4">
              <Heading level={1} className="leading-tight">
                {t('title')} <span className="text-brand-gold">{t('titleHighlight')}</span>
              </Heading>
              <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            </MotionDiv>

            <MotionDiv
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="secondary"
                className="px-8 py-4 text-lg font-semibold"
                icon={<CalendarCheck className="w-5 h-5" />}
              >
                {tCommon('scheduleFreeConsultation')}
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 text-lg font-semibold"
                icon={<Phone className="w-5 h-5" />}
              >
                {tCommon('callNow')}
              </Button>
            </MotionDiv>

       
          </MotionDiv>

          <MotionDiv
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-0 shadow-2xl overflow-hidden">
              <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
                <Image
                  src={images.trustCardImageUrl || '/jblogo.png'}
                  alt={t('trustExpertise.title')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

