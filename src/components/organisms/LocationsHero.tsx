import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const LocationsHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'locations_page.hero');
  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white pt-24 lg:pt-0 pb-12 lg:pb-16 min-h-[420px] lg:h-[400px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <Heading level={1} className="mb-6 text-white">{t('title')} <span className="text-brand-gold">{t('highlight')}</span></Heading>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">{t('description')}</p>
          <div className="flex justify-center space-x-8 text-center">
            {[0,1,2].map((i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-brand-gold">{t(`stats.${i}.value`)}</div>
                <div className="text-sm text-green-100">{t(`stats.${i}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


