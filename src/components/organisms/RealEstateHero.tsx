import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';

export const RealEstateHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_real_estate.hero');
  const tc = getT(dict, 'solutions_real_estate.common');

  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white py-16 lg:h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Heading level={1} className="leading-tight text-white">
                {t('title')} <span className="text-brand-gold block">{t('highlight')}</span>
              </Heading>
              <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-3 text-lg font-semibold">{tc('ctaConsultation')}</Button>
              <Button variant="outline" className="px-8 py-3 text-lg font-semibold">{tc('ctaCall')}</Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="text-center p-4 bg-brand-gray rounded-lg">
                    <div className="font-semibold text-brand-green text-sm">{t(`tiles.${i}.title`)}</div>
                    <div className="text-xs text-gray-600">{t(`tiles.${i}.subtitle`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


