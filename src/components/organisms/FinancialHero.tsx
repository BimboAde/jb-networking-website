import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';

export const FinancialHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_financial.hero');

  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white pt-24 lg:pt-0 min-h-[520px] lg:h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-brand-gold">
              <span className="text-lg font-semibold">{t('badge')}</span>
            </div>
            <Heading level={1} className="leading-tight text-white">
              {t('title')} <span className="text-brand-gold">{t('highlight')}</span>
            </Heading>
            <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-4 text-lg font-semibold">{t('ctaAnalysis')}</Button>
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold">{t('ctaAdvisor')}</Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center space-y-4">
              <div className="w-20 h-20 bg-brand-green rounded-full mx-auto" />
              <Heading level={3} className="text-brand-green">{t('cardTitle')}</Heading>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-brand-gray rounded-lg">
                  <div className="text-2xl font-bold text-brand-green">{t('cardStat0.value')}</div>
                  <div className="text-sm text-gray-600">{t('cardStat0.label')}</div>
                </div>
                <div className="p-4 bg-brand-gray rounded-lg">
                  <div className="text-2xl font-bold text-brand-green">{t('cardStat1.value')}</div>
                  <div className="text-sm text-gray-600">{t('cardStat1.label')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


