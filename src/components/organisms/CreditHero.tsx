import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';

export const CreditHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_credit.hero');
  const tc = getT(dict, 'solutions_credit.common');

  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {/* <div className="flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-brand-gold rounded-lg" />
              <div className="bg-brand-gold text-white px-4 py-2 rounded-full text-sm font-bold">{t('badge')}</div>
            </div> */}
            <Heading level={1} className="leading-tight mt-4">
              {t('title')} <span className="text-brand-gold block">{t('highlight')}</span>
            </Heading>
            <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-4 text-lg font-semibold">{tc('ctaAnalysis')}</Button>
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold">{tc('ctaCall')}</Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center space-y-4">
              <div className="w-20 h-20 bg-brand-green rounded-full mx-auto" />
              <Heading level={3} className="text-brand-green">{t('card.title')}</Heading>
              <p className="text-gray-600">{t('card.subtitle')}</p>
              <div className="bg-brand-gray rounded-lg p-6 mt-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-green">{t('card.stat0.value')}</div>
                  <div className="text-sm text-gray-600">{t('card.stat0.label')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-green">{t('card.stat1.value')}</div>
                  <div className="text-sm text-gray-600">{t('card.stat1.label')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


