import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';

export const BusinessCreditHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_credit.hero');

  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Heading level={1} className="leading-tight text-white mt-4">
                {t('title')} <span className="text-brand-gold">{t('highlight')}</span>
              </Heading>
              <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-4 text-lg font-semibold">{t('ctaAssess')}</Button>
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold">{t('ctaGuide')}</Button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-2">
              {[0,1,2].map((i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-brand-gold">{t(`stats.${i}.value`)}</div>
                  <div className="text-sm text-green-100">{t(`stats.${i}.label`)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center space-y-6">
              <div className="w-20 h-20 bg-brand-green rounded-full mx-auto" />
              <Heading level={3} className="text-brand-green">{t('card.title')}</Heading>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('card.startLabel')}</span>
                  <span className="font-bold text-red-500">480</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full w-1/3" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('card.targetLabel')}</span>
                  <span className="font-bold text-brand-green">720+</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-brand-green h-3 rounded-full w-4/5" />
                </div>
              </div>
              <div className="bg-brand-gray rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">{t('card.timeline')}</div>
                <div className="text-2xl font-bold text-brand-green">{t('card.timelineValue')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


