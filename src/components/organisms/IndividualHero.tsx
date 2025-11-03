import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';

export const IndividualHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_individual.hero');
  const tc = getT(dict, 'solutions_individual.common');

  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Heading level={1} className="leading-tight">
                {t('title')} <span className="text-brand-gold block">{t('highlight')}</span>
              </Heading>
              <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-3 font-semibold">{tc('ctaConsultation')}</Button>
              <Button variant="outline" className="px-8 py-3 font-semibold">{tc('ctaCall')}</Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center" />
                <Heading level={3}>{t('cardTitle')}</Heading>
                <p className="text-green-100">{t('cardDescription')}</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                    <div className="text-2xl font-bold text-brand-gold mb-1">{t('stats.0.value')}</div>
                    <div className="text-sm text-green-100">{t('stats.0.label')}</div>
                  </div>
                  <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                    <div className="text-2xl font-bold text-brand-gold mb-1">{t('stats.1.value')}</div>
                    <div className="text-sm text-green-100">{t('stats.1.label')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


