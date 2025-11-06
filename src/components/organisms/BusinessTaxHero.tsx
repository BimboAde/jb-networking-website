import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';

export const BusinessTaxHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_tax.hero');
  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white pt-24 lg:pt-0 min-h-[520px] lg:h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Heading level={1} className="leading-tight text-white">{t('title')} <span className="text-brand-gold">{t('highlight')}</span></Heading>
              <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-3 font-semibold">{t('ctaQuote')}</Button>
              <Button variant="outline" className="px-8 py-3 font-semibold">{t('ctaChecklist')}</Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-brand-green rounded-full mx-auto" />
                <Heading level={3} className="text-brand-green">{t('card.title')}</Heading>
                <p className="text-gray-600 text-sm">{t('card.text')}</p>
                <div className="grid grid-cols-2 gap-3 pt-4">
                  {[0,1,2,3].map((i) => (
                    <div key={i} className="text-center p-3 bg-brand-gray rounded-lg">
                      <div className="text-brand-green text-sm font-semibold">{t(`card.tiles.${i}`)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


